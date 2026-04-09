// API Configuration
export const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// Default headers for API requests
export const defaultHeaders = {
  'Content-Type': 'application/json',
};

// Helper function to make API calls
export const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  // Add token if available
  const token = localStorage.getItem('token');
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Call Failed: ${endpoint}`, error);
    throw error;
  }
};

// Project API endpoints
export const projectAPI = {
  getAll: () => apiCall('/projects'),
  getById: (id) => apiCall(`/projects/${id}`),
  create: (data) => apiCall('/projects', { method: 'POST', body: JSON.stringify(data) }),
  update: (id, data) => apiCall(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id) => apiCall(`/projects/${id}`, { method: 'DELETE' }),
};

// Task API endpoints
export const taskAPI = {
  getByProject: (projectId) => apiCall(`/projects/${projectId}/tasks`),
  create: (projectId, data) => apiCall(`/projects/${projectId}/tasks`, { method: 'POST', body: JSON.stringify(data) }),
  update: (projectId, taskId, data) => apiCall(`/projects/${projectId}/tasks/${taskId}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (projectId, taskId) => apiCall(`/projects/${projectId}/tasks/${taskId}`, { method: 'DELETE' }),
};

// Milestone API endpoints
export const milestoneAPI = {
  getByProject: (projectId) => apiCall(`/projects/${projectId}/milestones`),
  create: (projectId, data) => apiCall(`/projects/${projectId}/milestones`, { method: 'POST', body: JSON.stringify(data) }),
  update: (projectId, milestoneId, data) => apiCall(`/projects/${projectId}/milestones/${milestoneId}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (projectId, milestoneId) => apiCall(`/projects/${projectId}/milestones/${milestoneId}`, { method: 'DELETE' }),
};

// Submission API endpoints
export const submissionAPI = {
  getByProject: (projectId) => apiCall(`/projects/${projectId}/submission`),
  submit: (projectId, data) => apiCall(`/projects/${projectId}/submission`, { method: 'POST', body: JSON.stringify(data) }),
  grade: (projectId, data) => apiCall(`/projects/${projectId}/submission/grade`, { method: 'PUT', body: JSON.stringify(data) }),
};
