import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';
import instaLogo from '../img/instagram-logo.png';
import favIcon from '../img/facebook.png';
import appleStore from '../img/apple-button.png';
import googlePlay from '../img/googleplay-button.png';

const Login = () => {
  const [user, setUser] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth(); // Make sure your Provider wraps App

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        toast.success('Login successful!');
        storeTokenInLS(res_data.token); // store token in localStorage
        setUser({ email: '', password: '' });
        navigate('/'); // Redirect to home/dashboard
      } else {
        toast.error(res_data.extraDetails || res_data.message);
      }
    } catch (error) {
      console.log('Login error:', error);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <div className="flex flex-col items-center w-full max-w-md">
        {/* Login Panel */}
        <div className="bg-white border border-gray-300 p-8 w-full mb-4">
          <h1 className="flex justify-center mb-6">
            <img src={instaLogo} alt="Instagram Logo" className="h-12" />
          </h1>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="Phone number, username, or email"
              value={user.email}
              onChange={handleInput}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={user.password}
              onChange={handleInput}
              required
              autoComplete="off"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
            >
              Log In
            </button>
          </form>

          <div className="flex items-center my-4">
            <span className="flex-grow border-t border-gray-300"></span>
            <span className="mx-2 text-gray-400 font-bold">OR</span>
            <span className="flex-grow border-t border-gray-300"></span>
          </div>

          <div className="flex flex-col items-center">
            <a href="#" className="flex items-center text-blue-600 font-semibold mb-2">
              <img src={favIcon} alt="Facebook Logo" className="h-7 mr-2" />
              Log in with Facebook
            </a>
            <a href="#" className="text-xs text-blue-500">Forgot password?</a>
          </div>
        </div>

        {/* Register Panel */}
        <div className="bg-white border border-gray-300 p-4 w-full mb-4 text-center">
          <p className="text-sm">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-600 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>

        {/* App Download */}
        <div className="text-center">
          <p className="mb-2 text-sm">Get the app.</p>
          <div className="flex justify-center space-x-2">
            <img src={appleStore} alt="Apple Store" className="h-10" />
            <img src={googlePlay} alt="Google Play" className="h-10" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
