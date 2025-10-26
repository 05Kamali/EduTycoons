import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle token expiration
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (userData) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/auth/me'),
};

// Users API
export const usersAPI = {
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  getJobSeekers: (params) => api.get('/users/jobseekers', { params }),
  getSuggestedCandidates: (jobId) => api.get(`/users/suggested-candidates/${jobId}`),
  addDailyGoals: (goals) => api.post('/users/daily-goals', { goals }),
  updateGoalStatus: (goalIndex) => api.put(`/users/daily-goals/${goalIndex}`),
};

// Jobs API
export const jobsAPI = {
  getJobs: (params) => api.get('/jobs', { params }),
  getJob: (id) => api.get(`/jobs/${id}`),
  createJob: (data) => api.post('/jobs', data),
  updateJob: (id, data) => api.put(`/jobs/${id}`, data),
  deleteJob: (id) => api.delete(`/jobs/${id}`),
  applyForJob: (id, coverLetter) => api.post(`/jobs/${id}/apply`, { coverLetter }),
  getMyJobs: () => api.get('/jobs/my-jobs'),
  getRecommendedJobs: () => api.get('/jobs/recommended'),
};

// Applications API
export const applicationsAPI = {
  getMyApplications: () => api.get('/applications/my-applications'),
  getReceivedApplications: () => api.get('/applications/received'),
  updateApplicationStatus: (id, status) => api.put(`/applications/${id}/status`, { status }),
};

// Placements API
export const placementsAPI = {
  getPlacements: (params) => api.get('/placements', { params }),
  createPlacement: (data) => api.post('/placements', data),
  updatePlacement: (id, data) => api.put(`/placements/${id}`, data),
  deletePlacement: (id) => api.delete(`/placements/${id}`),
};

// Companies API
export const companiesAPI = {
  getCompanies: (params) => api.get('/companies', { params }),
  createCompany: (data) => api.post('/companies', data),
};

// AI API
export const aiAPI = {
  chatWithBot: (message, userRole) => api.post('/ai/chatbot', { message, userRole }),
  getLearningResources: (skill, type) => api.get('/ai/learning-resources', { 
    params: { skill, type } 
  }),
  getSkillRecommendations: (data) => api.post('/ai/skill-recommendations', data),
  getJobMatching: (data) => api.post('/ai/job-matching', data),
};

export default api;
