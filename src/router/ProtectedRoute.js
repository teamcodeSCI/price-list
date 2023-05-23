import React from 'react';
import { Navigate } from 'react-router-dom';
import { APP_URL } from '../utils/const';

const ProtectedRoute = ({ children }) => {
  let auth = Boolean(localStorage.getItem('token'));
  if (!auth) {
    return <Navigate to={`${APP_URL}/auth/login`} replace />;
  }
  return children;
};

export default ProtectedRoute;
