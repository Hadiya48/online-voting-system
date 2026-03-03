import sys
import os

print("Current directory:", os.getcwd())
print("Files in current directory:", os.listdir('.'))

try:
    import config
    print("✓ config module found")
    print("Config attributes:", [attr for attr in dir(config) if not attr.startswith('_')])
except ImportError as e:
    print(f"✗ config import failed: {e}")

try:
    from app import create_app
    print("✓ create_app imported successfully")
except ImportError as e:
    print(f"✗ create_app import failed: {e}")