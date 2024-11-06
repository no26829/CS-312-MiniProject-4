// src/components/SignUp.js
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../App';
import './main.css';

function SignUp({ setUser }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setIsAuthenticated } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        setError(data.error);
      } else {
        setIsAuthenticated(true);
        setUser({ name: data.user.name }); // Set user info in context
        navigate('/'); // Redirect to home on successful sign-up
      }
    })
    .catch(() => setError("An error occurred while signing up"));
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="button">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
}

export default SignUp;
