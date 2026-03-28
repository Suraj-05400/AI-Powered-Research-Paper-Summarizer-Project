import apiClient from './api';

// Authentication Services
export const authService = {
  register: (email, password, confirmPassword, fullName, phoneNumber) =>
    apiClient.post('/auth/register', {
      email,
      password,
      confirm_password: confirmPassword,
      full_name: fullName,
      phone_number: phoneNumber,
    }),

  login: (email, password) =>
    apiClient.post('/auth/login', { email, password }),

  getProfile: () => apiClient.get('/auth/me'),

  updateProfile: (fullName, phoneNumber) =>
    apiClient.put('/auth/profile', {
      full_name: fullName,
      phone_number: phoneNumber,
    }),

  changePassword: (oldPassword, newPassword, confirmPassword) =>
    apiClient.post('/auth/change-password', null, {
      params:{
      old_password: oldPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    }
  }),
};

// Paper Services
export const paperService = {
  uploadPaper: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return apiClient.post('/papers/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },

  getPapers: () => apiClient.get('/papers/'),

  getPaperDetail: (paperId) => apiClient.get(`/papers/${paperId}`),

  deletePaper: (paperId) => apiClient.delete(`/papers/${paperId}`),

  downloadSummary: (paperId, language = 'en') =>
    apiClient.get(`/papers/${paperId}/download-summary`, {
      params: { language },
      responseType: 'blob',
    }),
};

// Q&A Services
export const qaService = {
  createSession: (paperId) => apiClient.post(`/qa/${paperId}/sessions`),

  getSession: (paperId, sessionId) =>
    apiClient.get(`/qa/${paperId}/sessions/${sessionId}`),

  getPaperSessions: (paperId) => apiClient.get(`/qa/${paperId}/sessions`),

  askQuestion: (paperId, sessionId, question) =>
    apiClient.post(`/qa/${paperId}/sessions/${sessionId}/ask`, {
      question,
    }),
};

// Search Services
export const searchService = {
  semanticSearch: (query, topK = 5) =>
    apiClient.post('/search/semantic', {
      query,
      top_k: topK,
    }),

  searchInPaper: (paperId, query, topK = 5) =>
    apiClient.post(`/search/papers/${paperId}`, {
      query,
      top_k: topK,
    }),
};

// Translation Services
export const translationService = {
  getLanguages: () => apiClient.get('/translation/languages'),

  translateSummary: (paperId, targetLanguage) =>
    apiClient.post(`/translation/paper/${paperId}/summary`, null, {
      params: { target_language: targetLanguage },
    }),

  translateText: (text, targetLanguage) =>
    apiClient.post('/translation/text', null, {
      params: { text, target_language: targetLanguage },
    }),
};

// Analytics Services
export const analyticsService = {
  getUserAnalytics: () => apiClient.get('/analytics/user'),

  getPaperAnalytics: (paperId) => apiClient.get(`/analytics/paper/${paperId}`),

  getHistory: () => apiClient.get('/analytics/history'),
};
