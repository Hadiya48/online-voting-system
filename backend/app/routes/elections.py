from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Election, Candidate, User, Vote
from datetime import datetime

elections_bp = Blueprint('elections', __name__)

def update_election_statuses():
    """Helper function to update election statuses based on dates"""
    now = datetime.utcnow()
    
    # Update to active
    active_elections = Election.query.filter(
        Election.start_date <= now,
        Election.end_date >= now,
        Election.status != 'active'
    ).all()
    for election in active_elections:
        election.status = 'active'
    
    # Update to completed
    completed_elections = Election.query.filter(
        Election.end_date < now,
        Election.status != 'completed'
    ).all()
    for election in completed_elections:
        election.status = 'completed'
    
    db.session.commit()

@elections_bp.route('', methods=['GET'])
@jwt_required()
def get_elections():
    try:
        update_election_statuses()
        
        elections = Election.query.order_by(Election.start_date).all()
        return jsonify({
            'elections': [e.to_dict() for e in elections]
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@elections_bp.route('/active', methods=['GET'])
@jwt_required()
def get_active_elections():
    try:
        update_election_statuses()
        
        elections = Election.query.filter_by(status='active').order_by(Election.end_date).all()
        return jsonify({
            'elections': [e.to_dict() for e in elections]
        }), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500

@elections_bp.route('/<int:election_id>', methods=['GET'])
@jwt_required()
def get_election(election_id):
    try:
        update_election_statuses()
        
        election = Election.query.get(election_id)
        if not election:
            return jsonify({'success': False, 'message': 'Election not found'}), 404
        
        return jsonify(election.to_dict()), 200
        
    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500