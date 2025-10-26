import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Layout from './components/Layout/Layout';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import JobSeekerDashboard from './pages/Dashboard/JobSeekerDashboard';
import RecruiterDashboard from './pages/Dashboard/RecruiterDashboard';
import Jobs from './pages/Jobs/Jobs';
import JobDetails from './pages/Jobs/JobDetails';
import Profile from './pages/Profile/Profile';
import Placements from './pages/Placements/Placements';
import Applications from './pages/Applications/Applications';
import AITutor from './pages/AI/AITutor';
import AIChatbot from './pages/AI/AIChatbot';
import LoadingSpinner from './components/UI/LoadingSpinner';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashboard" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/dashboard" />} />

      {/* Protected Routes */}
      <Route path="/" element={user ? <Layout /> : <Navigate to="/login" />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="dashboard" element={
          user?.role === 'jobseeker' ? <JobSeekerDashboard /> : <RecruiterDashboard />
        } />
        <Route path="jobs" element={<Jobs />} />
        <Route path="jobs/:id" element={<JobDetails />} />
        <Route path="profile" element={<Profile />} />
        <Route path="placements" element={<Placements />} />
        <Route path="applications" element={<Applications />} />
        <Route path="ai-tutor" element={<AITutor />} />
        <Route path="ai-chatbot" element={<AIChatbot />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
