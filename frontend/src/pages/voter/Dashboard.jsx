import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Vote, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Calendar,
  ChevronRight,
  LogOut,
  User,
  Shield,
  TrendingUp
} from 'lucide-react';

function VoterDashboard() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [elections, setElections] = useState([]);
  const [votedElections, setVotedElections] = useState([]);
  const [user, setUser] = useState({
    name: 'John Doe',
    voterId: 'VOTER123456',
    registeredDate: '2024-01-15'
  });

  // Mock data - Replace with actual API calls
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setElections([
        {
          id: 1,
          title: 'Student Council Election 2024',
          description: 'Vote for your student representatives for the academic year 2024-2025',
          startDate: '2024-03-01T09:00:00',
          endDate: '2024-03-15T18:00:00',
          status: 'active',
          totalCandidates: 4,
          totalVoters: 2500,
          turnout: 45,
          image: '🎓'
        },
        {
          id: 2,
          title: 'Department Head Election',
          description: 'Elect the head of Computer Science department',
          startDate: '2024-03-20T09:00:00',
          endDate: '2024-03-25T18:00:00',
          status: 'upcoming',
          totalCandidates: 3,
          totalVoters: 150,
          image: '👨‍🏫'
        },
        {
          id: 3,
          title: 'Budget Approval Committee',
          description: 'Vote for members of the budget approval committee',
          startDate: '2024-02-01T09:00:00',
          endDate: '2024-02-15T18:00:00',
          status: 'completed',
          totalCandidates: 5,
          totalVoters: 1200,
          turnout: 78,
          image: '💰'
        },
        {
          id: 4,
          title: 'Sports Secretary Election',
          description: 'Choose the next sports secretary',
          startDate: '2024-03-05T09:00:00',
          endDate: '2024-03-10T18:00:00',
          status: 'active',
          totalCandidates: 3,
          totalVoters: 800,
          turnout: 32,
          image: '⚽'
        }
      ]);

      setVotedElections([1]); // User has voted in election ID 1
      setLoading(false);
    }, 1500);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getTimeRemaining = (endDate) => {
    const end = new Date(endDate);
    const now = new Date();
    const diff = end - now;
    
    if (diff <= 0) return 'Ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days left`;
    if (hours > 0) return `${hours} hours left`;
    return 'Ending soon';
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'completed': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'active': return <Clock className="w-4 h-4" />;
      case 'upcoming': return <Calendar className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">🗳️</span>
              <span className="font-bold text-xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                VoteSecure
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* User menu */}
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-700">{user.name}</p>
                  <p className="text-xs text-gray-500">ID: {user.voterId}</p>
                </div>
              </div>
              
              <button
                onClick={handleLogout}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative">
            <h1 className="text-3xl font-bold mb-2">
              Welcome back, {user.name}! 👋
            </h1>
            <p className="text-indigo-100 mb-4 max-w-2xl">
              Your voice matters. Cast your vote securely in the ongoing elections below.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-indigo-100 text-sm">Active Elections</p>
                <p className="text-2xl font-bold">{elections.filter(e => e.status === 'active').length}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-indigo-100 text-sm">Voted</p>
                <p className="text-2xl font-bold">{votedElections.length}</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
                <p className="text-indigo-100 text-sm">Member Since</p>
                <p className="text-2xl font-bold">{new Date(user.registeredDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Active Elections Section */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Vote className="w-6 h-6 text-indigo-600" />
              Active Elections
            </h2>
            <Link to="/elections" className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {elections.filter(e => e.status === 'active').map(election => {
              const hasVoted = votedElections.includes(election.id);
              
              return (
                <div
                  key={election.id}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 group"
                >
                  {/* Card Header */}
                  <div className="h-32 bg-gradient-to-br from-indigo-500 to-purple-600 relative">
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor('active')} flex items-center gap-1`}>
                        {getStatusIcon('active')}
                        Active
                      </span>
                    </div>
                    <div className="absolute -bottom-6 left-6 w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-2xl">
                      {election.image}
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="pt-8 p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{election.title}</h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{election.description}</p>

                    {/* Election Info */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Candidates:</span>
                        <span className="font-medium text-gray-700">{election.totalCandidates}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Time Remaining:</span>
                        <span className="font-medium text-orange-600">{getTimeRemaining(election.endDate)}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Turnout:</span>
                        <span className="font-medium text-gray-700">{election.turnout}%</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-gray-100 rounded-full mb-4">
                      <div 
                        className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                        style={{ width: `${election.turnout}%` }}
                      ></div>
                    </div>

                    {/* Action Button */}
                    {hasVoted ? (
                      <div className="w-full py-3 bg-green-50 text-green-600 rounded-xl font-medium flex items-center justify-center gap-2">
                        <CheckCircle className="w-5 h-5" />
                        Already Voted
                      </div>
                    ) : (
                      <Link
  to={`/elections/${election.id}`}  // This should match the route above
  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium..."
>
  Cast Your Vote
</Link>
                    )}
                  </div>
                </div>
              );
            })}

            {elections.filter(e => e.status === 'active').length === 0 && (
              <div className="col-span-full text-center py-12 bg-white rounded-2xl border border-gray-200">
                <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-700 mb-2">No Active Elections</h3>
                <p className="text-gray-500">Check back later for upcoming elections.</p>
              </div>
            )}
          </div>
        </div>

        {/* Upcoming Elections */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Upcoming Elections
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {elections.filter(e => e.status === 'upcoming').map(election => (
              <div
                key={election.id}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl">
                    {election.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{election.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{election.description}</p>
                    <div className="flex items-center gap-4 text-xs">
                      <span className="text-gray-500">Starts: {new Date(election.startDate).toLocaleDateString()}</span>
                      <span className="text-gray-500">Candidates: {election.totalCandidates}</span>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium flex items-center gap-1 whitespace-nowrap">
                    <Clock className="w-3 h-3" />
                    Upcoming
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Completed Elections */}
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-gray-600" />
            Recent Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {elections.filter(e => e.status === 'completed').slice(0, 2).map(election => (
              <div
                key={election.id}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-gray-200"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                    {election.image}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{election.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{election.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Turnout: {election.turnout}%</span>
                      <Link 
  to={`/results/${election.id}`}  
  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1"
>
  View Results
  <ChevronRight className="w-4 h-4" />
</Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default VoterDashboard;