from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required
from app import db
from app.models import Election, Candidate, Vote, User
from datetime import datetime, timedelta
from collections import defaultdict

results_bp = Blueprint('results', __name__)

def calculate_results(election_id):
    """Helper function to calculate election results"""
    election = Election.query.get(election_id)
    if not election:
        return None
    
    # Get all votes for this election
    votes = Vote.query.filter_by(election_id=election_id).all()
    total_votes = len(votes)
    
    # Count votes per candidate
    # Note: In a real system, you'd need to decrypt votes first
    # This is a mock implementation - actual decryption would happen in admin route
    candidates = Candidate.query.filter_by(election_id=election_id).all()
    
    # Mock vote distribution (replace with actual decrypted data)
    import random
    random.seed(election_id)
    vote_counts = []
    remaining = total_votes
    for i, candidate in enumerate(candidates):
        if i == len(candidates) - 1:
            count = remaining
        else:
            count = random.randint(0, remaining)
            remaining -= count
        vote_counts.append(count)
    
    # Sort candidates by votes
    results = []
    for candidate, votes in zip(candidates, vote_counts):
        percentage = (votes / total_votes * 100) if total_votes > 0 else 0
        results.append({
            'id': candidate.id,
            'name': candidate.name,
            'party': candidate.party,
            'votes': votes,
            'percentage': round(percentage, 1),
            'image': candidate.image,
            'color': candidate.color
        })
    
    results.sort(key=lambda x: x['votes'], reverse=True)
    
    # Generate timeline data (last 15 days of voting)
    timeline = []
    if election.start_date and election.end_date:
        current = max(election.start_date, datetime.utcnow() - timedelta(days=15))
        while current <= min(election.end_date, datetime.utcnow()):
            day_votes = Vote.query.filter(
                Vote.election_id == election_id,
                db.func.date(Vote.timestamp) == current.date()
            ).count()
            timeline.append({
                'date': current.date().isoformat(),
                'votes': day_votes
            })
            current += timedelta(days=1)
    
    return {
        'id': election.id,
        'title': election.title,
        'organization': election.organization,
        'endDate': election.end_date.isoformat() if election.end_date else None,
        'totalVotes': total_votes,
        'totalVoters': User.query.filter_by(role='voter').count(),
        'turnout': round(total_votes / User.query.filter_by(role='voter').count() * 100, 1) if User.query.filter_by(role='voter').count() > 0 else 0,
        'winner': results[0] if results else None,
        'candidates': results,
        'timeline': timeline
    }

@results_bp.route('/<int:election_id>', methods=['GET'])
@jwt_required()
def get_results(election_id):
    try:
        election = Election.query.get(election_id)
        if not election:
            return jsonify({'success': False, 'message': 'Election not found'}), 404
        
        # Only show results if election is completed
        if election.status != 'completed':
            return jsonify({'success': False, 'message': 'Results not available yet'}), 403
        
        results = calculate_results(election_id)
        return jsonify(results), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500