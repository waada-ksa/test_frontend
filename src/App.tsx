import React, { useState, useEffect } from 'react';
import { UserForm } from './components/UserForm';
import { UserList } from './components/UserList';
import { Notification, NotificationType } from './components/Notification';
import { UserService } from './services/userService';
import { User, CreateUserRequest } from './types/User';
import './App.css';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [usersError, setUsersError] = useState<string | null>(null);

  const [notification, setNotification] = useState<{
    type: NotificationType;
    message: string;
    isVisible: boolean;
  }>({
    type: 'info',
    message: '',
    isVisible: false,
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setIsLoadingUsers(true);
    setUsersError(null);
    
    try {
      const response = await UserService.getAllUsers();
      console.log('Fetch users response:', response);
      
      if (response.success && response.data && Array.isArray(response.data)) {
        setUsers(response.data);
        console.log('Users set successfully:', response.data);
      } else {
        const errorMsg = response.error || 'Failed to fetch users';
        console.error('Failed to fetch users:', errorMsg);
        setUsersError(errorMsg);
      }
    } catch (error) {
      console.error('Fetch users error:', error);
      setUsersError('An unexpected error occurred');
    } finally {
      setIsLoadingUsers(false);
    }
  };



  const handleCreateUser = async (userData: CreateUserRequest) => {
    setIsSubmitting(true);
    
    try {
      const response = await UserService.createUser(userData);
      
      if (response.success && response.data) {
        setUsers(prevUsers => [response.data!, ...prevUsers]);
        showNotification('success', 'User created successfully!');
      } else {
        showNotification('error', response.error || 'Failed to create user');
      }
    } catch (error) {
      showNotification('error', 'An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const showNotification = (type: NotificationType, message: string) => {
    setNotification({
      type,
      message,
      isVisible: true,
    });
  };

  const hideNotification = () => {
    setNotification(prev => ({
      ...prev,
      isVisible: false,
    }));
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="header-content">
          <div className="header-text">
            <h1>User Management System</h1>
            <p>A simple React application for managing users</p>
          </div>
        </div>
        <div className="api-status">
          🔌 Connected to API at localhost:5000
        </div>
      </header>
      
      <main className="App-main">
        <div className="container">
          <UserForm 
            onSubmit={handleCreateUser}
            isLoading={isSubmitting}
          />
          
          <UserList
            users={users}
            isLoading={isLoadingUsers}
            error={usersError || undefined}
            onRefresh={fetchUsers}
          />
        </div>
      </main>

      <Notification
        type={notification.type}
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />
    </div>
  );
}

export default App;
