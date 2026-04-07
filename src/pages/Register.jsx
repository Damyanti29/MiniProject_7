import React, { useState } from 'react';
import './Login.css'; // Reusing the identical premium glassmorphism styles
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { register } = useAuth();
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Dummy Registration attempt:', { name, email });
    
    if (!email || !name) {
      setErrorMsg('Please fill in all details');
      return;
    }
    
    register(name, email); // Our dummy auth system registers and auto-logs them in

    navigate('/profile');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Create Account ✨</h2>
        <p>Join us to get your personalized skin and hair advisor</p>
        
        {errorMsg && (
          <div className="error-msg" style={{color: '#ff5c8a', marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '10px'}}>
            <span>{errorMsg}</span>
          </div>
        )}
        
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="name">Full Name</label>
            <input 
              type="text" 
              id="name" 
              placeholder="Sarah Jenkins"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input 
              type="email" 
              id="email" 
              placeholder="hello@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          <button type="submit" className="login-btn">Sign Up</button>
        </form>
        
        <div className="register-link">
          Already have an account? <Link to="/login">Log in</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
