from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from .. import schemas, database, models
import google.generativeai as genai
import os
from dotenv import load_dotenv
from ..utils.jwt_handler import verify_token  # To verify JWT from header


load_dotenv()
genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

router = APIRouter(
    prefix="/predict",
    tags=["Prediction"]
)


def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/", status_code=status.HTTP_200_OK)
def generate_summary(
    request: schemas.SummaryRequest,
    db: Session = Depends(get_db),
    token_data: dict = Depends(verify_token)  # Extracts and validates JWT token
):
    """
    Generate a summary for the given text using Google Gemini.
    Optionally store history in DB for authenticated users.
    """

    try:
        # 1. Load the Gemini model
        model = genai.GenerativeModel("gemini-2.0-flash")

        # 2. Create summarization prompt
        prompt = f"Summarize the following text clearly and concisely:\n\n{request.text}"

        # 3. Generate response
        response = model.generate_content(prompt)
        summary = response.text.strip()

        # 4. Save to history (only if valid user)
        user_id = token_data.get("user_id") if token_data else None
        if user_id:
            new_entry = models.History(
                text=request.text,
                summary=summary,
                user_id=user_id
            )
            db.add(new_entry)
            db.commit()
            db.refresh(new_entry)

        # 5. Return response
        return {
            "summary": summary,
            "user_id": user_id,
            "message": "Summary generated successfully"
        }

    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Error generating summary: {str(e)}"
        )
