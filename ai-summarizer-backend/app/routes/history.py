from fastapi import APIRouter, Depends, HTTPException, status, Query, Header
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas, database
from ..utils.jwt_handler import verify_token

router = APIRouter(prefix="/history", tags=["History"])

# -----------------------------
# DB Dependency
# -----------------------------
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# -----------------------------
# ROUTE: /history/{user_id}
# -----------------------------
@router.get("/{user_id}", response_model=List[schemas.HistoryResponse])
def get_user_history(
    user_id: int,
    local_kw: Optional[str] = Query(None, description="Keyword to filter history"),
    token: Optional[str] = Query(None, description="JWT token (for Swagger testing)"),
    authorization: Optional[str] = Header(None, description="Bearer token (for Postman use)"),
    db: Session = Depends(get_db)
):
    """
    ✅ Get user's summary history
    - Authenticate via either:
        1. Header: Authorization: Bearer <token>
        2. Query param: ?token=<token>
    - Optional filter: local_kw
    """

    # 1️⃣ Extract token from header or query
    jwt_token = None
    if authorization and authorization.startswith("Bearer "):
        jwt_token = authorization.split(" ")[1]
    elif token:
        jwt_token = token
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token missing. Pass via Authorization header or ?token= query param"
        )

    # 2️⃣ Verify token
    token_data = verify_token(jwt_token)
    if not token_data or "user_id" not in token_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token"
        )

    token_user_id = token_data["user_id"]

    # 3️⃣ Check if user is requesting their own data
    if token_user_id != user_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access denied: You can only view your own history"
        )

    # 4️⃣ Query the history
    query = db.query(models.History).filter(models.History.user_id == user_id)
    if local_kw:
        query = query.filter(models.History.text.ilike(f"%{local_kw}%"))

    history_entries = query.order_by(models.History.created_at.desc()).all()

    if not history_entries:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="No history found for this user"
        )

    return history_entries
