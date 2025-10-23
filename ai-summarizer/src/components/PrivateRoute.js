
import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  // In a real app, you'd verify a token here.
  // For now, we'll simulate it with localStorage.
  return localStorage.getItem('isAuthenticated') === 'true';
};

export default function PrivateRoute({ children }) {
  return isAuthenticated() ? children : <Navigate to="/login" />;
}
