from app import db, bcrypt
from datetime import datetime
import hashlib
import secrets

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    voter_id = db.Column(db.String(50), unique=True, nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    role = db.Column(db.Enum('voter', 'admin'), default='voter')
    registered_date = db.Column(db.DateTime, default=datetime.utcnow)
    
    votes = db.relationship('Vote', backref='voter', lazy=True)
    activity_logs = db.relationship('ActivityLog', backref='user', lazy=True)

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.full_name,
            'voterId': self.voter_id,
            'email': self.email,
            'role': self.role,
            'registeredDate': self.registered_date.isoformat() if self.registered_date else None
        }

class Election(db.Model):
    __tablename__ = 'elections'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text)
    organization = db.Column(db.String(100))
    start_date = db.Column(db.DateTime, nullable=False)
    end_date = db.Column(db.DateTime, nullable=False)
    status = db.Column(db.Enum('upcoming', 'active', 'completed'), default='upcoming')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    candidates = db.relationship('Candidate', backref='election', lazy=True, cascade='all, delete-orphan')
    votes = db.relationship('Vote', backref='election', lazy=True)

    def to_dict(self):
        total_voters = User.query.filter_by(role='voter').count()
        voted_count = Vote.query.filter_by(election_id=self.id).count()
        turnout = (voted_count / total_voters * 100) if total_voters > 0 else 0

        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'organization': self.organization,
            'startDate': self.start_date.isoformat() if self.start_date else None,
            'endDate': self.end_date.isoformat() if self.end_date else None,
            'status': self.status,
            'totalVoters': total_voters,
            'votedCount': voted_count,
            'turnout': round(turnout, 1),
            'image': '🎓' if 'student' in self.title.lower() else '🗳️',
            'candidates': [c.to_dict() for c in self.candidates]
        }

class Candidate(db.Model):
    __tablename__ = 'candidates'
    
    id = db.Column(db.Integer, primary_key=True)
    election_id = db.Column(db.Integer, db.ForeignKey('elections.id', ondelete='CASCADE'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    party = db.Column(db.String(100))
    year = db.Column(db.String(50))
    department = db.Column(db.String(100))
    manifesto = db.Column(db.Text)
    image = db.Column(db.String(10), default='👤')
    color = db.Column(db.String(50), default='from-blue-500 to-cyan-500')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'party': self.party,
            'year': self.year,
            'department': self.department,
            'manifesto': self.manifesto,
            'image': self.image,
            'color': self.color
        }

class Vote(db.Model):
    __tablename__ = 'votes'
    
    id = db.Column(db.Integer, primary_key=True)
    election_id = db.Column(db.Integer, db.ForeignKey('elections.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    encrypted_vote_data = db.Column(db.Text, nullable=False)
    encrypted_aes_key = db.Column(db.Text, nullable=False)
    vote_hash = db.Column(db.String(64), nullable=False)
    signature = db.Column(db.Text, nullable=False)
    receipt = db.Column(db.String(100), unique=True)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)

    __table_args__ = (db.UniqueConstraint('election_id', 'user_id', name='unique_vote'),)

    def generate_receipt(self):
        hash_input = f"{self.election_id}{self.user_id}{self.timestamp}"
        self.receipt = f"VOTE-{self.election_id}-{self.timestamp.strftime('%y%m%d')}-{hashlib.sha256(hash_input.encode()).hexdigest()[:8]}"
        return self.receipt

class ActivityLog(db.Model):
    __tablename__ = 'activity_log'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    action = db.Column(db.String(100))
    details = db.Column(db.Text)
    ip_address = db.Column(db.String(45))
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)