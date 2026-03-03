# add_elections.py
from app import create_app, db
from app.models import Election, Candidate
from datetime import datetime, timedelta

app = create_app()

with app.app_context():
    print("Adding sample elections...")
    
    # Clear existing elections (optional - comment out if you want to keep existing)
    # Election.query.delete()
    # Candidate.query.delete()
    
    # Election 1: Student Council (Active)
    election1 = Election(
        id=1,
        title='Student Council Election 2024',
        description='Vote for your student representatives for the academic year 2024-2025',
        organization='Student Affairs Office',
        start_date=datetime(2024, 3, 1, 9, 0, 0),
        end_date=datetime(2024, 3, 15, 18, 0, 0),
        status='active'
    )
    db.session.add(election1)
    db.session.flush()
    
    # Candidates for Election 1
    candidates1 = [
        Candidate(
            election_id=election1.id,
            name='Alice Johnson',
            party='Student Voice',
            year='3rd Year',
            department='Computer Science',
            manifesto='Improve student facilities, more tech events, better internship opportunities',
            image='👩‍🎓',
            color='from-blue-500 to-cyan-500'
        ),
        Candidate(
            election_id=election1.id,
            name='Bob Smith',
            party='Campus United',
            year='4th Year',
            department='Business Administration',
            manifesto='Enhance campus life, student discounts, better cafeteria options',
            image='👨‍🎓',
            color='from-purple-500 to-pink-500'
        ),
        Candidate(
            election_id=election1.id,
            name='Carol Martinez',
            party='Future First',
            year='3rd Year',
            department='Electrical Engineering',
            manifesto='Focus on academic resources, lab upgrades, research opportunities',
            image='👩‍🔬',
            color='from-green-500 to-emerald-500'
        ),
        Candidate(
            election_id=election1.id,
            name='David Kim',
            party='Unity Alliance',
            year='4th Year',
            department='Mechanical Engineering',
            manifesto='Bridge gap between students and faculty, more workshops, career guidance',
            image='👨‍🔧',
            color='from-orange-500 to-red-500'
        )
    ]
    for candidate in candidates1:
        db.session.add(candidate)
    
    # Election 2: Department Head (Upcoming)
    election2 = Election(
        id=2,
        title='Department Head Election',
        description='Elect the head of Computer Science department',
        organization='Academic Affairs',
        start_date=datetime(2024, 3, 20, 9, 0, 0),
        end_date=datetime(2024, 3, 25, 18, 0, 0),
        status='upcoming'
    )
    db.session.add(election2)
    db.session.flush()
    
    # Candidates for Election 2
    candidates2 = [
        Candidate(
            election_id=election2.id,
            name='Dr. Sarah Wilson',
            party='Academic Excellence',
            year='Faculty',
            department='Computer Science',
            manifesto='Modernize curriculum, increase research funding',
            image='👩‍🏫',
            color='from-blue-500 to-indigo-500'
        ),
        Candidate(
            election_id=election2.id,
            name='Dr. James Chen',
            party='Innovation First',
            year='Faculty',
            department='Computer Science',
            manifesto='Industry partnerships, startup incubator',
            image='👨‍🏫',
            color='from-purple-500 to-pink-500'
        )
    ]
    for candidate in candidates2:
        db.session.add(candidate)
    
    # Election 3: Budget Committee (Completed)
    election3 = Election(
        id=3,
        title='Budget Approval Committee',
        description='Vote for members of the budget approval committee',
        organization='Finance Department',
        start_date=datetime(2024, 2, 1, 9, 0, 0),
        end_date=datetime(2024, 2, 15, 18, 0, 0),
        status='completed'
    )
    db.session.add(election3)
    db.session.flush()
    
    # Candidates for Election 3
    candidates3 = [
        Candidate(
            election_id=election3.id,
            name='Elena Rodriguez',
            party='Fiscal Responsibility',
            year='4th Year',
            department='Finance',
            manifesto='Transparent budgeting, student fund allocation',
            image='👩‍💼',
            color='from-purple-500 to-indigo-500'
        ),
        Candidate(
            election_id=election3.id,
            name='Thomas Wright',
            party='Budget Reform',
            year='3rd Year',
            department='Economics',
            manifesto='Reduce fees, increase student services',
            image='👨‍💼',
            color='from-blue-500 to-cyan-500'
        ),
        Candidate(
            election_id=election3.id,
            name='Patricia Lee',
            party='Transparency First',
            year='4th Year',
            department='Accounting',
            manifesto='Public budget reviews, student oversight',
            image='👩‍⚖️',
            color='from-green-500 to-teal-500'
        )
    ]
    for candidate in candidates3:
        db.session.add(candidate)
    
    # Election 4: Sports Secretary (Active)
    election4 = Election(
        id=4,
        title='Sports Secretary Election',
        description='Choose the next sports secretary',
        organization='Sports Department',
        start_date=datetime(2024, 3, 5, 9, 0, 0),
        end_date=datetime(2024, 3, 10, 18, 0, 0),
        status='active'
    )
    db.session.add(election4)
    db.session.flush()
    
    # Candidates for Election 4
    candidates4 = [
        Candidate(
            election_id=election4.id,
            name='Mike Thompson',
            party='Sports First',
            year='3rd Year',
            department='Physical Education',
            manifesto='More tournaments, better equipment, inter-college leagues',
            image='🏃',
            color='from-red-500 to-orange-500'
        ),
        Candidate(
            election_id=election4.id,
            name='Sarah Wilson',
            party='Athlete\'s Choice',
            year='4th Year',
            department='Sports Science',
            manifesto='Upgrade gym facilities, more sports scholarships',
            image='🏋️',
            color='from-blue-500 to-indigo-500'
        ),
        Candidate(
            election_id=election4.id,
            name='James Chen',
            party='Team Spirit',
            year='3rd Year',
            department='Business',
            manifesto='Increase sports funding, more practice sessions',
            image='⚡',
            color='from-green-500 to-teal-500'
        )
    ]
    for candidate in candidates4:
        db.session.add(candidate)
    
    # Commit all changes
    db.session.commit()
    
    print("✅ Sample elections added successfully!")
    
    # Verify
    elections = Election.query.all()
    print(f"\nTotal elections: {len(elections)}")
    for election in elections:
        candidate_count = len(election.candidates)
        print(f"  - {election.title} ({election.status}): {candidate_count} candidates")