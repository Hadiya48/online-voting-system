# debug_database.py
from app import create_app, db
from app.models import Election
from sqlalchemy import text

app = create_app()

with app.app_context():
    print("=" * 60)
    print("DIRECT DATABASE CHECK")
    print("=" * 60)
    
    # Method 1: Using SQL directly (bypasses models)
    result = db.session.execute(text("SELECT id, title, status FROM elections"))
    print("\n1. RAW SQL QUERY RESULT:")
    for row in result:
        print(f"   ID: {row.id}, Title: {row.title[:30]}, Status: {row.status}")
    
    # Method 2: Using models
    print("\n2. USING MODELS:")
    for e in Election.query.all():
        print(f"   ID: {e.id}, Title: {e.title[:30]}, Status: {e.status}")
    
    # Method 3: Try to force update with SQL
    print("\n3. FORCING UPDATE WITH SQL...")
    db.session.execute(text("UPDATE elections SET status = 'active' WHERE id = 1"))
    db.session.execute(text("UPDATE elections SET status = 'upcoming' WHERE id = 2"))
    db.session.execute(text("UPDATE elections SET status = 'completed' WHERE id = 3"))
    db.session.execute(text("UPDATE elections SET status = 'active' WHERE id = 4"))
    db.session.commit()
    print("   Update executed!")
    
    # Check again
    result = db.session.execute(text("SELECT id, status FROM elections"))
    print("\n4. AFTER SQL UPDATE:")
    for row in result:
        print(f"   ID: {row.id}, Status: {row.status}")