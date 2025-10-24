from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, func
from sqlalchemy.orm import relationship
from .database import Base  # Make sure Base is imported from your database.py

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)

    # This creates the relationship on the User side
    histories = relationship("History", back_populates="owner")

# --- ADD THIS CLASS ---
# This defines the 'history' table in your database
class History(Base):
    __tablename__ = "history"

    id = Column(Integer, primary_key=True, index=True)
    text = Column(String)
    summary = Column(String)
    # This sets a default timestamp when a record is created
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # This is the foreign key linking to the 'users' table
    user_id = Column(Integer, ForeignKey("users.id"))

    # This creates the relationship on the History side
    owner = relationship("User", back_populates="histories")
