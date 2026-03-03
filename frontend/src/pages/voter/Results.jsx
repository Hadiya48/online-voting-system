import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Trophy, 
  BarChart3, 
  PieChart,
  CheckCircle,
  Award,
  TrendingUp,
  Calendar,
  Users,
  Download,
  Share2,
  Medal,
  Crown
} from 'lucide-react';

function Results() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState(null);
  const [selectedView, setSelectedView] = useState('chart'); // 'chart' or 'table'

  // Mock data - Replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // Mock results data based on election ID
      const mockResults = {
        1: {
          id: 1,
          title: 'Student Council Election 2024',
          organization: 'Student Affairs Office',
          endDate: '2024-03-15T18:00:00',
          totalVotes: 1875,
          totalVoters: 2500,
          turnout: 75,
          winner: {
            id: 101,
            name: 'Alice Johnson',
            party: 'Student Voice',
            votes: 845,
            percentage: 45.1,
            image: '👩‍🎓',
            color: 'from-blue-500 to-cyan-500'
          },
          candidates: [
            {
              id: 101,
              name: 'Alice Johnson',
              party: 'Student Voice',
              votes: 845,
              percentage: 45.1,
              image: '👩‍🎓',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              id: 102,
              name: 'Bob Smith',
              party: 'Campus United',
              votes: 623,
              percentage: 33.2,
              image: '👨‍🎓',
              color: 'from-purple-500 to-pink-500'
            },
            {
              id: 103,
              name: 'Carol Martinez',
              party: 'Future First',
              votes: 287,
              percentage: 15.3,
              image: '👩‍🔬',
              color: 'from-green-500 to-emerald-500'
            },
            {
              id: 104,
              name: 'David Kim',
              party: 'Unity Alliance',
              votes: 120,
              percentage: 6.4,
              image: '👨‍🔧',
              color: 'from-orange-500 to-red-500'
            }
          ],
          timeline: [
            { date: '2024-03-01', votes: 245 },
            { date: '2024-03-02', votes: 389 },
            { date: '2024-03-03', votes: 567 },
            { date: '2024-03-04', votes: 723 },
            { date: '2024-03-05', votes: 892 },
            { date: '2024-03-06', votes: 1056 },
            { date: '2024-03-07', votes: 1234 },
            { date: '2024-03-08', votes: 1456 },
            { date: '2024-03-09', votes: 1567 },
            { date: '2024-03-10', votes: 1678 },
            { date: '2024-03-11', votes: 1723 },
            { date: '2024-03-12', votes: 1789 },
            { date: '2024-03-13', votes: 1823 },
            { date: '2024-03-14', votes: 1856 },
            { date: '2024-03-15', votes: 1875 }
          ]
        },
        3: {
          id: 3,
          title: 'Budget Approval Committee',
          organization: 'Finance Department',
          endDate: '2024-02-15T18:00:00',
          totalVotes: 936,
          totalVoters: 1200,
          turnout: 78,
          winner: {
            id: 301,
            name: 'Elena Rodriguez',
            party: 'Fiscal Responsibility',
            votes: 412,
            percentage: 44,
            image: '👩‍💼',
            color: 'from-purple-500 to-indigo-500'
          },
          candidates: [
            {
              id: 301,
              name: 'Elena Rodriguez',
              party: 'Fiscal Responsibility',
              votes: 412,
              percentage: 44,
              image: '👩‍💼',
              color: 'from-purple-500 to-indigo-500'
            },
            {
              id: 302,
              name: 'Thomas Wright',
              party: 'Budget Reform',
              votes: 298,
              percentage: 31.8,
              image: '👨‍💼',
              color: 'from-blue-500 to-cyan-500'
            },
            {
              id: 303,
              name: 'Patricia Lee',
              party: 'Transparency First',
              votes: 226,
              percentage: 24.2,
              image: '👩‍⚖️',
              color: 'from-green-500 to-teal-500'
            }
          ],
          timeline: [
            { date: '2024-02-01', votes: 89 },
            { date: '2024-02-02', votes: 156 },
            { date: '2024-02-03', votes: 234 },
            { date: '2024-02-04', votes: 312 },
            { date: '2024-02-05', votes: 389 },
            { date: '2024-02-06', votes: 445 },
            { date: '2024-02-07', votes: 512 },
            { date: '2024-02-08', votes: 578 },
            { date: '2024-02-09', votes: 634 },
            { date: '2024-02-10', votes: 689 },
            { date: '2024-02-11', votes: 745 },
            { date: '2024-02-12', votes: 801 },
            { date: '2024-02-13', votes: 856 },
            { date: '2024-02-14', votes: 902 },
            { date: '2024-02-15', votes: 936 }
          ]
        }
      };

      setResults(mockResults[id] || mockResults[1]);
      setLoading(false);
    }, 1500);
  }, [id]);

  const getWinnerMedal = (index) => {
    switch(index) {
      case 0: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 1: return <Medal className="w-5 h-5 text-gray-400" />;
      case 2: return <Medal className="w-5 h-5 text-amber-600" />;
      default: return null;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading election results...</p>
        </div>
      </div>
    );
  }

  if (!results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg">
          <BarChart3 className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Results Not Available</h2>
          <p className="text-gray-600 mb-6">Results for this election haven't been published yet.</p>
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
        {/* Header */}
        <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg">
                📊
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{results.title}</h1>
                <p className="text-gray-600">{results.organization}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Download className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-xl p-4">
              <Calendar className="w-5 h-5 text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">Election Ended</p>
              <p className="font-medium text-gray-800">{new Date(results.endDate).toLocaleDateString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <Users className="w-5 h-5 text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">Total Votes</p>
              <p className="font-medium text-gray-800">{results.totalVotes.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <TrendingUp className="w-5 h-5 text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">Turnout</p>
              <p className="font-medium text-gray-800">{results.turnout}%</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <Trophy className="w-5 h-5 text-indigo-600 mb-2" />
              <p className="text-sm text-gray-500">Winner</p>
              <p className="font-medium text-gray-800">{results.winner.name}</p>
            </div>
          </div>
        </div>

        {/* Winner Banner */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-400 rounded-3xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-16 -translate-x-16"></div>
          
          <div className="relative flex flex-col md:flex-row items-center gap-6">
            <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-5xl">
              {results.winner.image}
            </div>
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Crown className="w-6 h-6 text-yellow-200" />
                <span className="text-sm font-medium uppercase tracking-wider text-yellow-100">Winner</span>
              </div>
              <h2 className="text-3xl font-bold mb-1">{results.winner.name}</h2>
              <p className="text-yellow-100 mb-2">{results.winner.party}</p>
              <div className="flex items-center gap-4">
                <span className="text-2xl font-bold">{results.winner.votes.toLocaleString()} votes</span>
                <span className="text-xl text-yellow-100">({results.winner.percentage}%)</span>
              </div>
            </div>
            <div className="text-center md:text-right">
              <div className="text-5xl font-bold mb-1">🏆</div>
              <p className="text-yellow-100">Winning Margin</p>
              <p className="text-2xl font-bold">{(results.winner.percentage - results.candidates[1].percentage).toFixed(1)}%</p>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center justify-end gap-2 mb-6">
          <button
            onClick={() => setSelectedView('chart')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
              selectedView === 'chart'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <PieChart className="w-4 h-4" />
            Chart View
          </button>
          <button
            onClick={() => setSelectedView('table')}
            className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors ${
              selectedView === 'table'
                ? 'bg-indigo-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            Table View
          </button>
        </div>

        {/* Results Display */}
        {selectedView === 'chart' ? (
          // Chart View
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5 text-indigo-600" />
              Vote Distribution
            </h2>
            
            <div className="space-y-6">
              {results.candidates.map((candidate, index) => (
                <div key={candidate.id}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {getWinnerMedal(index)}
                      <span className="font-medium text-gray-800">{candidate.name}</span>
                      <span className="text-sm text-gray-500">{candidate.party}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-800">{candidate.votes.toLocaleString()}</span>
                      <span className="text-sm text-gray-500 w-16">{candidate.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${candidate.color} rounded-full transition-all duration-1000`}
                      style={{ width: `${candidate.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Timeline Chart */}
            <div className="mt-8 pt-8 border-t border-gray-100">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Vote Accumulation Over Time
              </h3>
              <div className="h-40 flex items-end gap-1">
                {results.timeline.map((day, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center group">
                    <div className="relative w-full">
                      <div 
                        className="w-full bg-gradient-to-t from-indigo-600 to-purple-600 rounded-t-lg transition-all duration-300 group-hover:from-indigo-700 group-hover:to-purple-700"
                        style={{ height: `${(day.votes / results.totalVotes) * 100}px` }}
                      ></div>
                      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
                        {day.votes.toLocaleString()} votes
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-2 transform -rotate-45 origin-top-left">
                      {new Date(day.date).getDate()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          // Table View
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-8 border border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              Detailed Results
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 text-gray-600 font-medium">Rank</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-medium">Candidate</th>
                    <th className="text-left py-4 px-4 text-gray-600 font-medium">Party</th>
                    <th className="text-right py-4 px-4 text-gray-600 font-medium">Votes</th>
                    <th className="text-right py-4 px-4 text-gray-600 font-medium">Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {results.candidates.map((candidate, index) => (
                    <tr key={candidate.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {index === 0 && <Crown className="w-4 h-4 text-yellow-500" />}
                          {index === 1 && <Medal className="w-4 h-4 text-gray-400" />}
                          {index === 2 && <Medal className="w-4 h-4 text-amber-600" />}
                          {index > 2 && <span className="w-4 text-gray-400">{index + 1}</span>}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{candidate.image}</span>
                          <span className="font-medium text-gray-800">{candidate.name}</span>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-gray-600">{candidate.party}</td>
                      <td className="py-4 px-4 text-right font-medium text-gray-800">{candidate.votes.toLocaleString()}</td>
                      <td className="py-4 px-4 text-right">
                        <span className="font-bold text-indigo-600">{candidate.percentage}%</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Certificate / Verification */}
        <div className="bg-indigo-50 rounded-2xl p-6 border border-indigo-100">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-1">Verified Results</h3>
              <p className="text-sm text-gray-600 mb-2">
                These results have been cryptographically verified and certified by the election commission.
                Each vote was encrypted, counted, and verified for integrity.
              </p>
              <div className="flex items-center gap-4 text-xs">
                <span className="text-gray-500">Certificate: #VOTE-{results.id}-{Date.now()}</span>
                <span className="text-gray-500">Block: 0x7a3f...8e2b</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Results;