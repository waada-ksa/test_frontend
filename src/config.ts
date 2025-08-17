// Application configuration
export const config = {
  // API Configuration
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api',
  
  // App Configuration
  APP_NAME: 'User Management System',
  APP_VERSION: '1.0.0',
  
  // API Endpoints
  ENDPOINTS: {
    USERS: '/users',
  },
  
  // Validation Rules
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^05\d{8}$/, // 10 digits starting with 05
  },
  
  // UI Configuration
  UI: {
    NOTIFICATION_DURATION: 5000, // 5 seconds
    DEBOUNCE_DELAY: 300,
  },
};
