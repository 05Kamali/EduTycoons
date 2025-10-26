import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth API
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (email, password) => api.post('/auth/login', { email, password }),
  getCurrentUser: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/update', data),
};

// Users API
export const usersAPI = {
  getJobSeekers: () => api.get('/users/jobseekers'),
  getUser: (id) => api.get(`/users/${id}`),
  updateProfile: (data) => api.put('/users/profile', data),
  addGoals: (goals) => api.post('/users/goals', { goals }),
  updateGoal: (goalId, completed) => api.put(`/users/goals/${goalId}`, { completed }),
};

// Companies API
export const companiesAPI = {
  getAll: () => api.get('/companies'),
  getOne: (id) => api.get(`/companies/${id}`),
  create: (data) => api.post('/companies', data),
};

// Placements API
export const placementsAPI = {
  getAll: (params) => api.get('/placements', { params }),
  getOne: (id) => api.get(`/placements/${id}`),
  create: (data) => api.post('/placements', data),
  update: (id, data) => api.put(`/placements/${id}`, data),
  delete: (id) => api.delete(`/placements/${id}`),
};

// Jobs API
export const jobsAPI = {
  getAll: (params) => api.get('/jobs', { params }),
  getRecommended: () => api.get('/jobs/recommended'),
  getOne: (id) => api.get(`/jobs/${id}`),
  create: (data) => api.post('/jobs', data),
  update: (id, data) => api.put(`/jobs/${id}`, data),
  delete: (id) => api.delete(`/jobs/${id}`),
  applyForJob: (id, coverLetter) => api.post(`/jobs/${id}/apply`, { coverLetter }),
};

// Applications API
export const applicationsAPI = {
  getMyApplications: () => api.get('/applications/my-applications'),
  getReceived: () => api.get('/applications/received'),
  updateStatus: (id, status) => api.put(`/applications/${id}/status`, { status }),
};

// AI API
export const aiAPI = {
  chatWithBot: (message) => api.post('/ai/chatbot', { message }),
  getLearningResources: (skill, type) => api.get('/ai/learning-resources', { 
    params: { skill, type } 
  }),
};

export default api;

