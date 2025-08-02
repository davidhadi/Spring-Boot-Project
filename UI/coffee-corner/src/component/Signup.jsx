import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const [form, setForm] = useState({ fname: '', lname: '', email: '', password: '', contact: '', address: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/api/auth/v1/signup', {
        ...form,
        role: ["user"]
      });
      alert('Signup successful! Please login.');
      navigate('/signin');
    } catch (err) {
      alert('Signup failed. Email may already exist.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
        {['fname', 'lname', 'email', 'password', 'contact', 'address'].map((field) => (
          <input
            key={field}
            type={field === 'password' ? 'password' : 'text'}
            name={field}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="w-full mb-4 p-2 border rounded"
            value={form[field]}
            onChange={handleChange}
            required
          />
        ))}
        <button type="submit" className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600">Sign Up</button>
      </form>
    </div>
  );
};

// Update your App.jsx
// Wrap Routes with <AuthProvider>
// import { Signin } from './component/Signin';
// import { Signup } from './component/Signup';
// import { AuthProvider } from './context/AuthContext';

// Replace <Routes> with this:
{/*
<AuthProvider>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<Signup />} />
  </Routes>
</AuthProvider>
*/}
