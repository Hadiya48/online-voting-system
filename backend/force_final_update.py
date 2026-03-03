# force_final_update.py
from app import create_app, db
from app.models import Election

app = create_app()

with app.app_context():
    print("Updating election statuses directly in database...")
    
    # Manual updates for each election
    elections_to_update = {
        1: 'active',   # Student Council
        2: 'upcoming', # Department Head
        3: 'completed',# Budget Committee
        4: 'active'    # Sports Secretary
    }
    
    for election_id, new_status in elections_to_update.items():
        election = db.session.get(Election, election_id)
        if election:
            old_status = election.status
            election.status = new_status
            print(f"Election {election_id}: {old_status} -> {new_status}")
    
    # Commit the changes
    db.session.commit()
    print("\n✅ Changes committed to database!")
    
    # Verify the update
    print("\nVerifying current statuses:")
    for election in Election.query.all():
        print(f"ID {election.id}: {election.title[:30]}... - {election.status}")