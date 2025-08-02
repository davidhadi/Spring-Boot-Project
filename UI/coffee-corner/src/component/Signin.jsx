import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    await login({ email, password }); // 🔁 let AuthContext handle the API
    navigate('/profile');
  } catch (err) {
    alert('Login failed. Please check credentials.');
  }
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        <input type="email" placeholder="Email" className="w-full mb-4 p-2 border rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" className="w-full mb-4 p-2 border rounded" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">Login</button>
      </form>
    </div>
  );
};


