import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';  // <-- Import Link from react-router-dom
import './Auth.css';
import logo from '../images/logo.png';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) return alert("Passwords do not match!");

    try {
      await axios.post('http://localhost:5000/api/auth/signup', { email, password });
      alert("Registration Successful!");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <img src={logo} alt="Logo" style={{ width: '45px', height: 'auto', margin: '0 auto 20px', display: 'block' }} />
              <h1 style={{
                  fontFamily: '"Abril Fatface", cursive',
                  fontSize: '2.5rem',
                  fontWeight: '100',
                  color: '#ffa500',
                  marginBottom: '20px',
                }}>
                  Food Recipe
                </h1>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e.target.value)} required />
          <button type="submit">Sign Up</button>
        </form>
        <p>
          Already have an account? <Link to="/signin" className="sign-in-link">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
