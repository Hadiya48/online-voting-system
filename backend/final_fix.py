# final_fix.py
from app import create_app, db
from app.models import Election
from sqlalchemy import text

app = create_app()
with app.app_context():
    # Force update with raw SQL
    db.session.execute(text("UPDATE elections SET status = 'active' WHERE id = 1"))
    db.session.execute(text("UPDATE elections SET status = 'upcoming' WHERE id = 2"))
    db.session.execute(text("UPDATE elections SET status = 'completed' WHERE id = 3"))
    db.session.execute(text("UPDATE elections SET status = 'active' WHERE id = 4"))
    db.session.commit()
    print("✅ Statuses updated!")
    
    # Verify
    result = db.session.execute(text("SELECT id, status FROM elections"))
    for row in result:
        print(f"ID {row.id}: {row.status}")