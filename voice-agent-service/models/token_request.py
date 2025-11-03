"""
Token Request/Response Models
"""
from pydantic import BaseModel
from typing import Optional


class TokenRequest(BaseModel):
    """Request model for token creation."""
    model: Optional[str] = None


class TokenResponse(BaseModel):
    """Response model for token creation."""
    success: bool
    token: str
    expireTime: str
    newSessionExpireTime: str
    message: Optional[str] = None


class ErrorResponse(BaseModel):
    """Error response model."""
    error: str
    message: str

