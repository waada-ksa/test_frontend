import React from 'react';
import { User } from '../types/User';
import './UserList.css';

interface UserListProps {
  users: User[];
  isLoading?: boolean;
  error?: string;
  onRefresh?: () => void;
}

export const UserList: React.FC<UserListProps> = ({ 
  users, 
  isLoading = false, 
  error,
  onRefresh 
}) => {
  if (isLoading) {
    return (
      <div className="user-list-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="user-list-container">
        <div className="error-state">
          <p className="error-message">{error}</p>
          {onRefresh && (
            <button onClick={onRefresh} className="retry-button">
              Try Again
            </button>
          )}
        </div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="user-list-container">
        <div className="empty-state">
          <p>No users found</p>
          <p className="empty-state-subtitle">Add a new user to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="user-list-container">
      <div className="user-list-header">
        <h2>Users ({users.length})</h2>
        {onRefresh && (
          <button onClick={onRefresh} className="refresh-button">
            Refresh
          </button>
        )}
      </div>
      
      <div className="user-list">
        {users.map((user, index) => (
          <div key={user.id || index} className="user-card">
            <div className="user-avatar">
              {user.firstName.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <h3 className="user-name">
                {user.firstName} {user.lastName}
              </h3>
              <p className="user-email">{user.email}</p>
              <p className="user-phone">{user.phoneNumber}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
