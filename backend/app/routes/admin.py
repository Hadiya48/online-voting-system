from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, Election, Candidate, Vote, ActivityLog
from app.middleware.auth import admin_required
from datetime import datetime
import json

admin_bp = Blueprint('admin', __name__)

@admin_bp.route('/elections', methods=['POST'])
@jwt_required()
@admin_required
def create_election():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'startDate', 'endDate', 'candidates']
        for field in required_fields:
            if field not in data:
                return jsonify({'success': False, 'message': f'Missing field: {field}'}), 400
        
        # Parse dates
        start_date = datetime.fromisoformat(data['startDate'].replace('Z', '+00:00'))
        end_date = datetime.fromisoformat(data['endDate'].replace('Z', '+00:00'))
        
        # Create election
        election = Election(
            title=data['title'],
            description=data.get('description', ''),
            organization=data.get('organization', ''),
            start_date=start_date,
            end_date=end_date,
            status='upcoming'
        )
        
        db.session.add(election)
        db.session.flush()  # Get election ID
        
        # Add candidates
        for candidate_data in data['candidates']:
            candidate = Candidate(
                election_id=election.id,
                name=candidate_data['name'],
                party=candidate_data.get('party', ''),
                year=candidate_data.get('year', ''),
                department=candidate_data.get('department', ''),
                manifesto=candidate_data.get('manifesto', ''),
                image=candidate_data.get('image', '👤'),
                color=candidate_data.get('color', 'from-blue-500 to-cyan-500')
            )
            db.session.add(candidate)
        
        # Log activity
        admin_id = get_jwt_identity()
        log = ActivityLog(
            user_id=admin_id,
            action='CREATE_ELECTION',
            details=f'Created election: {data["title"]}',
            ip_address=request.remote_addr
        )
        db.session.add(log)
        
        db.session.commit()
        
        return jsonify({
            'success': True,
            'electionId': election.id
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False, 'message': str(e)}), 500

@admin_bp.route('/voters', methods=['GET'])
@jwt_required()
@admin_required
def get_voters():
    try:
        voters = User.query.filter_by(role='voter').all()
        
        result = []
        for voter in voters:
            # Get elections this voter has voted in
            voted_in = [vote.election_id for vote in voter.votes]
            
            result.append({
                'id': voter.id,
                'voterId': voter.voter_id,
                'name': voter.full_name,
                'email': voter.email,
                'registeredDate': voter.registered_date.isoformat() if voter.registered_date else None,
                'hasVoted': len(voter.votes) > 0,
                'votedIn': voted_in
            })
        
        return jsonify({'voters': result}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@admin_bp.route('/decrypt-votes/<int:election_id>', methods=['POST'])
@jwt_required()
@admin_required
def decrypt_votes(election_id):
    try:
        election = Election.query.get(election_id)
        if not election:
            return jsonify({'success': False, 'message': 'Election not found'}), 404
        
        # In a real system, this would use the admin's private key to decrypt votes
        # For now, we'll return mock decrypted results
        
        # Get all votes for this election
        votes = Vote.query.filter_by(election_id=election_id).all()
        
        # Mock decryption - in reality, you'd decrypt encrypted_vote_data
        # using the encrypted_aes_key and admin's private key
        
        # Calculate results
        from app.routes.results import calculate_results
        results = calculate_results(election_id)
        
        # Log decryption activity
        admin_id = get_jwt_identity()
        log = ActivityLog(
            user_id=admin_id,
            action='DECRYPT_VOTES',
            details=f'Decrypted votes for election {election_id}',
            ip_address=request.remote_addr
        )
        db.session.add(log)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Votes decrypted successfully',
            'results': results
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@admin_bp.route('/logs', methods=['GET'])
@jwt_required()
@admin_required
def get_activity_logs():
    try:
        logs = ActivityLog.query.order_by(ActivityLog.timestamp.desc()).limit(100).all()
        
        result = []
        for log in logs:
            user_name = log.user.full_name if log.user else 'System'
            result.append({
                'id': log.id,
                'user': user_name,
                'action': log.action,
                'details': log.details,
                'ipAddress': log.ip_address,
                'timestamp': log.timestamp.isoformat() if log.timestamp else None
            })
        
        return jsonify({'logs': result}), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500