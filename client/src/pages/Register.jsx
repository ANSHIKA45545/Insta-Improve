import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../store/auth'; // for storing token
import instaLogo from '../img/instagram-logo.png';
import appleStore from '../img/apple-button.png';
import googlePlay from '../img/googleplay-button.png';
import facebookLogo from '../img/facebook.png';

const Register = () => {
  const [user, setUser] = useState({ username: '', email: '', phone: '', password: '' });
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user.username || !user.email || !user.phone || !user.password) {
      toast.error('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        // Save token like login
        storeTokenInLS(res_data.token);
        toast.success('Registration successful!');
        setUser({ username: '', email: '', phone: '', password: '' });
        navigate('/login');
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log('Registration error:', error);
      toast.error('Something went wrong. Try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4">
        <div className="flex justify-center mt-6">
          <img src={instaLogo} alt="Instagram Logo" className="h-14 w-auto" />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border border-gray-300 p-6 rounded-lg shadow-sm space-y-3"
        >
          <input
            type="text"
            name="username"
            placeholder="Full Name"
            value={user.username}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={user.email}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={user.phone}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleInput}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm bg-gray-50 focus:outline-none focus:ring-1 focus:ring-gray-400"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-md transition-colors text-sm"
          >
            Sign Up
          </button>
        </form>

        <div className="bg-white border border-gray-300 p-4 rounded-lg mt-3 text-center shadow-sm">
          <p className="text-sm">
            Have an account?{' '}
            <Link to="/login" className="text-blue-500 font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>

        <div className="flex flex-col items-center mt-4 space-y-2">
          <p className="text-sm text-gray-500">Get the app.</p>
          <div className="flex space-x-2">
            <img src={appleStore} alt="Apple Store" className="h-10" />
            <img src={googlePlay} alt="Google Play" className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
