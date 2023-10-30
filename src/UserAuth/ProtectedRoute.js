import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ element, authenticated, redirectPath }) {
  return authenticated ? element : <Navigate to={redirectPath} />;
}

export default ProtectedRoute;