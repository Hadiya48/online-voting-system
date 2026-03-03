from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Vote, Election, User, ActivityLog
from datetime import datetime
import hashlib

votes_bp = Blueprint('votes', __name__)

@votes_bp.route('/status/<int:election_id>', methods=['GET'])
@jwt_required()
def get_vote_status(election_id):
    try:
        user_id = get_jwt_identity()
        
        vote = Vote.query.filter_by(election_id=election_id, user_id=user_id).first()
        
        return jsonify({
            'hasVoted': vote is not None,
            'votedAt': vote.timestamp.isoformat() if vote else None
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@votes_bp.route('/submit', methods=['POST'])
@jwt_required()
def submit_vote():
    try:
        user_id = get_jwt_identity()
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['electionId', 'encryptedVoteData', 'encryptedAesKey', 'voteHash', 'signature']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'message': f'Missing field: {field}'}), 400
        
        # Check if election exists and is active
        election = Election.query.get(data['electionId'])
        if not election:
            return jsonify({'success': False, 'message': 'Election not found'}), 404
        
        now = datetime.utcnow()
        if now < election.start_date or now > election.end_date:
            return jsonify({'success': False, 'message': 'Voting is not active for this election'}), 400
        
        # Check if user already voted
        existing_vote = Vote.query.filter_by(
            election_id=data['electionId'],
            user_id=user_id
        ).first()
        
        if existing_vote:
            return jsonify({'success': False, 'message': 'You have already voted in this election'}), 400
        
        # Create vote
        vote = Vote(
            election_id=data['electionId'],
            user_id=user_id,
            encrypted_vote_data=data['encryptedVoteData'],
            encrypted_aes_key=data['encryptedAesKey'],
            vote_hash=data['voteHash'],
            signature=data['signature']
        )
        
        # Generate receipt
        vote.generate_receipt()
        
        db.session.add(vote)
        
        # Log activity
        log = ActivityLog(
            user_id=user_id,
            action='VOTE_CAST',
            details=f'Vote cast in election {data["electionId"]}',
            ip_address=request.remote_addr
        )
        db.session.add(log)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'receipt': vote.receipt,
            'timestamp': vote.timestamp.isoformat()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500