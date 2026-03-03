import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VoterDashboard from './pages/voter/Dashboard';
import ElectionDetails from './pages/voter/ElectionDetails';
import Results from './pages/voter/Results'; // Add this
import AdminDashboard from './pages/admin/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/voter/dashboard" element={<VoterDashboard />} />
        <Route path="/elections/:id" element={<ElectionDetails />} />
        <Route path="/results/:id" element={<Results />} /> {/* Add this */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;