# init_db.py
from app import create_app, db
from app.models import User

print("Creating database tables...")
app = create_app()

with app.app_context():
    # Create all tables
    db.create_all()
    print("Tables created successfully!")
    
    # Create admin user if not exists
    admin = User.query.filter_by(voter_id='ADMIN001').first()
    if not admin:
        admin = User(
            voter_id='ADMIN001',
            full_name='System Administrator',
            email='admin@voting.com',
            role='admin'
        )
        admin.set_password('Admin@123')
        db.session.add(admin)
        print("Admin user created")
    
    # Create voter user if not exists
    voter = User.query.filter_by(voter_id='VOTER123456').first()
    if not voter:
        voter = User(
            voter_id='VOTER123456',
            full_name='John Doe',
            email='john@example.com',
            role='voter'
        )
        voter.set_password('Test@1234')
        db.session.add(voter)
        print("Voter user created")
    
    db.session.commit()
    
    # Show users
    users = User.query.all()
    print(f"\nTotal users: {len(users)}")
    for user in users:
        print(f"  - {user.voter_id} ({user.role})")