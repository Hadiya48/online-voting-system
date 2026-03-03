# update_status.py
from app import create_app, db
from app.models import Election
from datetime import datetime

app = create_app()

with app.app_context():
    # Use current date to determine status
    # For testing, you can use a specific date during the elections
    # Change this to test different periods:
    now = datetime(2024, 3, 8)  # March 8, 2024 - during active elections
    
    print(f"Using reference date: {now}")
    print("-" * 50)
    
    # Update statuses based on dates
    for election in Election.query.all():
        old_status = election.status
        
        if election.start_date <= now <= election.end_date:
            election.status = 'active'
        elif now < election.start_date:
            election.status = 'upcoming'
        else:
            election.status = 'completed'
        
        print(f"Election {election.id}: {election.title[:30]}...")
        print(f"  Start: {election.start_date.date()}, End: {election.end_date.date()}")
        print(f"  Status: {old_status} → {election.status}")
        print()
    
    db.session.commit()
    print("✅ All election statuses updated successfully!")
    
    # Verify
    active = Election.query.filter_by(status='active').count()
    upcoming = Election.query.filter_by(status='upcoming').count()
    completed = Election.query.filter_by(status='completed').count()
    print(f"\nSummary: Active: {active}, Upcoming: {upcoming}, Completed: {completed}")