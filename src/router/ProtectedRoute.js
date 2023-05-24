import React from 'react';
import { Navigate } from 'react-router-dom';
import { APP_URL } from '../utils/const';
import { useLocalStorage } from '../hooks/useLocalStorage';

const ProtectedRoute = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', null);
  if (!token) {
    return <Navigate to={`${APP_URL}/auth/login`} replace />;
  }
  return children;
};

export default ProtectedRoute;
