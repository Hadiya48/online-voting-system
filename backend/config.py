import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class Config:
    # Secret keys
    SECRET_KEY = os.environ.get('SECRET_KEY', 'dev-secret-key-change-in-production')
    JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'jwt-secret-key-change-in-production')
    
    # Database
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL', 'sqlite:///voting.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # JWT Settings
    JWT_ACCESS_TOKEN_EXPIRES = 86400  # 24 hours

# For testing - print when loaded
print("Config.py loaded successfully")
print(f"SECRET_KEY: {Config.SECRET_KEY}")