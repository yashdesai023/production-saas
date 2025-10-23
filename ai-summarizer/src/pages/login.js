
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simulate a successful login
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h2>AI Summarizer</h2>
          <p>Welcome back to AI Summarizer</p>
        </div>

        {isLogin ? (
          <form className="login-form" onSubmit={handleLogin}>
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="btn-primary">Login</button>
            <button type="button" className="btn-secondary">Continue with Google</button>
            <p className="toggle-form" onClick={() => setIsLogin(false)}>
              Don’t have an account? Sign up
            </p>
          </form>
        ) : (
          <form className="signup-form">
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email" required />
            <input type="password" placeholder="Password" required />
            <input type="password" placeholder="Confirm Password" required />
            <button type="submit" className="btn-primary">Create Account</button>
            <p className="toggle-form" onClick={() => setIsLogin(true)}>
              Already have an account? Login
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
