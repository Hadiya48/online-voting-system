print("Testing imports...")

try:
    from flask import Flask
    print("✓ Flask imported")
except ImportError as e:
    print(f"✗ Flask import failed: {e}")

try:
    from config import Config
    print("✓ Config imported")
except ImportError as e:
    print(f"✗ Config import failed: {e}")

try:
    from app import create_app
    print("✓ create_app imported")
except ImportError as e:
    print(f"✗ create_app import failed: {e}")

print("\nTest complete")