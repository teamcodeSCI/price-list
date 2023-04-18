import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  let auth = Boolean(localStorage.getItem('access_token'));
  if (!auth) {
    return <Navigate to={`/login`} replace />;
  }
  return children;
};

export default ProtectedRoute;
