import axios from 'axios';
import { User, CreateUserRequest, ApiResponse } from '../types/User';
import { config } from '../config';

const apiClient = axios.create({
  baseURL: config.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // Add timeout and better error handling
  timeout: 10000,
});

export class UserService {
  /**
   * Create a new user
   */
  static async createUser(userData: CreateUserRequest): Promise<ApiResponse<User>> {
    try {
      const response = await apiClient.post<User>('/users', userData);
      console.log('Create user response:', response.data);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      console.error('Create user error:', error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') {
          return {
            success: false,
            error: 'Network error - check if your backend is running and accessible',
          };
        }
        if (error.response?.status === 0) {
          return {
            success: false,
            error: 'CORS error - your backend needs to allow requests from localhost:3000',
          };
        }
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to create user',
        };
      }
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }

  /**
   * Get all users
   */
  static async getAllUsers(): Promise<ApiResponse<User[]>> {
    try {
      const response = await apiClient.get<User[]>('/users');
      console.log('Get users response:', response.data);
      console.log('Response type:', typeof response.data);
      console.log('Response length:', Array.isArray(response.data) ? response.data.length : 'Not an array');
      
      // Your API returns the users array directly, not wrapped in a response object
      if (Array.isArray(response.data)) {
        return {
          success: true,
          data: response.data,
        };
      } else {
        console.error('Unexpected response format:', response.data);
        return {
          success: false,
          error: 'Invalid response format from API',
        };
      }
    } catch (error) {
      console.error('Get users error:', error);
      if (axios.isAxiosError(error)) {
        if (error.code === 'ERR_NETWORK') {
          return {
            success: false,
            error: 'Network error - check if your backend is running and accessible',
          };
        }
        if (error.response?.status === 0) {
          return {
            success: false,
            error: 'CORS error - your backend needs to allow requests from localhost:3000',
          };
        }
        return {
          success: false,
          error: error.response?.data?.message || 'Failed to fetch users',
        };
      }
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    }
  }
}
