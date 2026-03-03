import sys
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_bcrypt import Bcrypt
from flask_cors import CORS

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

# Import Config
try:
    from config import Config
    print("✓ Config imported in app/__init__.py")
except ImportError as e:
    print(f"✗ Config import error: {e}")
    raise

db = SQLAlchemy()
jwt = JWTManager()
bcrypt = Bcrypt()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)
    
    # Initialize extensions
    db.init_app(app)
    jwt.init_app(app)
    bcrypt.init_app(app)
    CORS(app, origins=["http://localhost:5173"], supports_credentials=True)
    
    # Register blueprints
    from app.routes.auth import auth_bp
    from app.routes.elections import elections_bp
    from app.routes.votes import votes_bp
    from app.routes.results import results_bp
    from app.routes.admin import admin_bp
    
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(elections_bp, url_prefix='/api/elections')
    app.register_blueprint(votes_bp, url_prefix='/api/vote')
    app.register_blueprint(results_bp, url_prefix='/api/results')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')
    
    return app