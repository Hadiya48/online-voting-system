# force_update_status.py
from app import create_app, db
from app.models import Election

app = create_app()

with app.app_context():
    print("Force updating election statuses...")
    print("=" * 50)
    
    # Directly update each election by ID
    # Election 1: Student Council -> active
    election1 = Election.query.get(1)
    if election1:
        election1.status = 'active'
        print(f"Election 1: {election1.title[:30]}... → active")
    
    # Election 2: Department Head -> upcoming
    election2 = Election.query.get(2)
    if election2:
        election2.status = 'upcoming'
        print(f"Election 2: {election2.title[:30]}... → upcoming")
    
    # Election 3: Budget -> completed (already completed)
    election3 = Election.query.get(3)
    if election3:
        election3.status = 'completed'
        print(f"Election 3: {election3.title[:30]}... → completed")
    
    # Election 4: Sports -> active
    election4 = Election.query.get(4)
    if election4:
        election4.status = 'active'
        print(f"Election 4: {election4.title[:30]}... → active")
    
    # Commit the changes
    db.session.commit()
    print("=" * 50)
    print("✅ Changes committed to database!")
    
    # Verify the changes
    print("\nVerifying updated statuses:")
    for e in Election.query.all():
        print(f"  ID {e.id}: {e.title[:30]}... - {e.status}")