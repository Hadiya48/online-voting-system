# test_config.py
print("Testing config.py...")

try:
    from config import Config
    print("✓ Config imported successfully")
    print(f"  SECRET_KEY: {Config.SECRET_KEY}")
    print(f"  JWT_SECRET_KEY: {Config.JWT_SECRET_KEY}")
    print(f"  DATABASE_URI: {Config.SQLALCHEMY_DATABASE_URI}")
except Exception as e:
    print(f"✗ Error: {e}")