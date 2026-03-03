import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle, 
  AlertCircle,
  Shield,
  Vote,
  UserCheck,
  Award,
  BarChart3,
  Info
} from 'lucide-react';

function ElectionDetails() {
  const { id } = useParams(); // Get election ID from URL
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [election, setElection] = useState(null);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [voting, setVoting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [voteSuccess, setVoteSuccess] = useState(false);

  // Mock data - Replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock election data based on ID
      const mockElections = {
        1: {
          id: 1,
          title: 'Student Council Election 2024',
          description: 'Vote for your student representatives for the academic year 2024-2025. The student council plays a vital role in representing student interests and organizing events throughout the year.',
          organization: 'Student Affairs Office',
          startDate: '2024-03-01T09:00:00',
          endDate: '2024-03-15T18:00:00',
          status: 'active',
          totalVoters: 2500,
          votedCount: 1125,
          turnout: 45,
          image: '🎓',
          rules: [
            'You can vote for only one candidate',
            'Votes are encrypted and anonymous',
            'Once submitted, votes cannot be changed',
            'Results will be announced on March 16th'
          ],
          candidates: [
            {
              id: 101,
              name: 'Alice Johnson',
              party: 'Student Voice',
              year: '3rd Year',
              department: 'Computer Science',
              manifesto: 'Improve student facilities, more tech events, better internship opportunities',
              image: '👩‍🎓',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              id: 102,
              name: 'Bob Smith',
              party: 'Campus United',
              year: '4th Year',
              department: 'Business Administration',
              manifesto: 'Enhance campus life, student discounts, better cafeteria options',
              image: '👨‍🎓',
              color: 'from-purple-500 to-pink-500'
            },
            {
              id: 103,
              name: 'Carol Martinez',
              party: 'Future First',
              year: '3rd Year',
              department: 'Electrical Engineering',
              manifesto: 'Focus on academic resources, lab upgrades, research opportunities',
              image: '👩‍🔬',
              color: 'from-green-500 to-emerald-500'
            },
            {
              id: 104,
              name: 'David Kim',
              party: 'Unity Alliance',
              year: '4th Year',
              department: 'Mechanical Engineering',
              manifesto: 'Bridge gap between students and faculty, more workshops, career guidance',
              image: '👨‍🔧',
              color: 'from-orange-500 to-red-500'
            }
          ]
        },
        4: {
          id: 4,
          title: 'Sports Secretary Election',
          description: 'Choose the next sports secretary who will organize all sports events and manage sports facilities.',
          organization: 'Sports Department',
          startDate: '2024-03-05T09:00:00',
          endDate: '2024-03-10T18:00:00',
          status: 'active',
          totalVoters: 800,
          votedCount: 256,
          turnout: 32,
          image: '⚽',
          rules: [
            'Vote for your preferred candidate',
            'Results will affect next semester\'s sports calendar',
            'All votes are encrypted'
          ],
          candidates: [
            {
              id: 401,
              name: 'Mike Thompson',
              party: 'Sports First',
              year: '3rd Year',
              department: 'Physical Education',
              manifesto: 'More tournaments, better equipment, inter-college leagues',
              image: '🏃',
              color: 'from-red-500 to-orange-500'
            },
            {
              id: 402,
              name: 'Sarah Wilson',
              party: 'Athlete\'s Choice',
              year: '4th Year',
              department: 'Sports Science',
              manifesto: 'Upgrade gym facilities, more sports scholarships',
              image: '🏋️',
              color: 'from-blue-500 to-indigo-500'
            },
            {
              id: 403,
              name: 'James Chen',
              party: 'Team Spirit',
              year: '3rd Year',
              department: 'Business',
              manifesto: 'Increase sports funding, more practice sessions',
              image: '⚡',
              color: 'from-green-500 to-teal-500'
            }
          ]
        }
      };

      setElection(mockElections[id] || mockElections[1]);
      
      // Check if user has already voted (mock)
      const votedElections = [1]; // User voted in election ID 1
      setHasVoted(votedElections.includes(parseInt(id)));
      
      setLoading(false);
    }, 1500);
  }, [id]);

  const getTimeRemaining = () => {
    if (!election) return '';
    const end = new Date(election.endDate);
    const now = new Date();
    const diff = end - now;
    
    if (diff <= 0) return 'Election ended';
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (days > 0) return `${days} days ${hours} hours remaining`;
    if (hours > 0) return `${hours} hours remaining`;
    return 'Ending soon';
  };

  const handleVote = () => {
    if (!selectedCandidate) {
      alert('Please select a candidate first');
      return;
    }
    setShowConfirmModal(true);
  };

  const confirmVote = () => {
    setVoting(true);
    setShowConfirmModal(false);
    
    // Simulate API call - Replace with actual vote submission
    setTimeout(() => {
      console.log('Vote cast for candidate:', selectedCandidate);
      setVoting(false);
      setVoteSuccess(true);
      setHasVoted(true);
      
      // Redirect to success page after 2 seconds
      setTimeout(() => {
        navigate('/voter/dashboard', { 
          state: { message: 'Vote cast successfully!' } 
        });
      }, 2000);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading election details...</p>
        </div>
      </div>
    );
  }

  if (!election) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Election Not Found</h2>
          <p className="text-gray-600 mb-6">The election you're looking for doesn't exist.</p>
          <Link
            to="/voter/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  if (voteSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-10 rounded-3xl shadow-2xl max-w-md">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Vote Cast Successfully!</h2>
          <p className="text-gray-600 mb-6">Your vote has been encrypted and recorded.</p>
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-sm text-gray-500 mt-4">Redirecting to dashboard...</p>
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
            
            <Link
              to="/voter/dashboard"
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Election Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                {election.image}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{election.title}</h1>
                <p className="text-gray-600">{election.organization}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2 ${
                election.status === 'active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <Clock className="w-4 h-4" />
                {election.status === 'active' ? 'Active' : 'Closed'}
              </span>
              
              {hasVoted && (
                <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  You've voted
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-600 text-lg mb-6">{election.description}</p>

          {/* Election Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <Calendar className="w-5 h-5 text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">Start Date</p>
              <p className="font-medium text-gray-800">{new Date(election.startDate).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <Clock className="w-5 h-5 text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">End Date</p>
              <p className="font-medium text-gray-800">{new Date(election.endDate).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <Users className="w-5 h-5 text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">Total Voters</p>
              <p className="font-medium text-gray-800">{election.totalVoters.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <BarChart3 className="w-5 h-5 text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">Current Turnout</p>
              <p className="font-medium text-gray-800">{election.turnout}%</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Voter Turnout</span>
              <span className="font-medium text-gray-800">{election.votedCount} of {election.totalVoters} voted</span>
            </div>
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full"
                style={{ width: `${election.turnout}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
              <Info className="w-3 h-3" />
              {getTimeRemaining()}
            </p>
          </div>
        </div>

        {/* Candidates Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <UserCheck className="w-6 h-6 text-indigo-600" />
            Candidates ({election.candidates.length})
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {election.candidates.map(candidate => (
              <div
                key={candidate.id}
                onClick={() => !hasVoted && setSelectedCandidate(candidate)}
                className={`bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border-2 cursor-pointer ${
                  selectedCandidate?.id === candidate.id
                    ? 'border-indigo-600 ring-4 ring-indigo-100'
                    : 'border-transparent hover:border-indigo-200'
                } ${hasVoted ? 'opacity-75 cursor-not-allowed' : ''}`}
              >
                <div className={`h-2 bg-gradient-to-r ${candidate.color}`}></div>
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-16 h-16 bg-gradient-to-br ${candidate.color} rounded-xl flex items-center justify-center text-3xl shadow-lg`}>
                      {candidate.image}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">{candidate.name}</h3>
                          <p className="text-indigo-600 font-medium">{candidate.party}</p>
                        </div>
                        {selectedCandidate?.id === candidate.id && (
                          <CheckCircle className="w-6 h-6 text-indigo-600" />
                        )}
                      </div>
                      <div className="flex gap-3 text-sm text-gray-500 mb-3">
                        <span>{candidate.year}</span>
                        <span>•</span>
                        <span>{candidate.department}</span>
                      </div>
                      <p className="text-gray-600 text-sm">{candidate.manifesto}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Election Rules & Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Rules */}
          <div className="lg:col-span-2">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Shield className="w-5 h-5 text-indigo-600" />
                Election Rules & Guidelines
              </h3>
              <ul className="space-y-3">
                {election.rules.map((rule, index) => (
                  <li key={index} className="flex items-start gap-3 text-gray-600">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action Card */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl p-6 text-white shadow-xl sticky top-24">
              <Vote className="w-10 h-10 mb-4 opacity-90" />
              <h3 className="text-xl font-bold mb-2">Ready to Vote?</h3>
              <p className="text-indigo-100 text-sm mb-6">
                Your vote is secure and encrypted. Make your choice count!
              </p>
              
              {hasVoted ? (
                <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 text-center">
                  <CheckCircle className="w-8 h-8 mx-auto mb-2" />
                  <p className="font-medium">You have already voted in this election</p>
                </div>
              ) : (
                <>
                  {!selectedCandidate && (
                    <p className="text-indigo-100 text-sm mb-4">
                      👆 Select a candidate above to continue
                    </p>
                  )}
                  <button
                    onClick={handleVote}
                    disabled={!selectedCandidate || voting}
                    className={`w-full py-4 rounded-xl font-semibold text-lg transition-all duration-200 ${
                      selectedCandidate
                        ? 'bg-white text-indigo-600 hover:bg-indigo-50 transform hover:scale-[1.02] shadow-lg'
                        : 'bg-white/20 text-white cursor-not-allowed'
                    } ${voting ? 'opacity-75' : ''}`}
                  >
                    {voting ? (
                      <span className="flex items-center justify-center gap-2">
                        <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
                        Processing...
                      </span>
                    ) : (
                      'Cast Your Vote'
                    )}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && selectedCandidate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
            
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">
              Confirm Your Vote
            </h2>
            
            <p className="text-center text-gray-600 mb-6">
              You are about to vote for:
            </p>

            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4 mb-6">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 bg-gradient-to-br ${selectedCandidate.color} rounded-lg flex items-center justify-center text-2xl`}>
                  {selectedCandidate.image}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{selectedCandidate.name}</p>
                  <p className="text-sm text-indigo-600">{selectedCandidate.party}</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-6 text-center">
              ⚠️ This action cannot be undone. Your vote will be encrypted and recorded.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="flex-1 py-3 border border-gray-300 rounded-xl text-gray-700 font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmVote}
                className="flex-1 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-medium hover:from-indigo-700 hover:to-purple-700 transition-colors"
              >
                Confirm Vote
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ElectionDetails;