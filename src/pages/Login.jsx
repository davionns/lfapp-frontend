import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import LogoImage from '../assets/logo.png'; // Adjust the import path as needed

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/users/login', { email, password });
      const { token, role, userId } = response.data;

      // Save token, role, and userId in local storage
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);
      localStorage.setItem('userId', userId);

      onLogin(role); // Update role state immediately

      // Redirect based on user role
      if (role === 'admin') {
        navigate('/dashboard');
      } else if (role === 'student') {
        navigate('/report-lost-item');
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-8">
        <div className="max-w-md mx-auto w-full space-y-8">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900">
              Welcome Back
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Sign in to continue to Lost & Found Tracker
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {showPassword ? 
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.78zM12.12 6.863a4 4 0 11.919 3.542l-2.379-2.379a4 4 0 011.46-1.163zM8.584 11.3A4 4 0 0010 8a4 4 0 00-3.203 3.11l1.787 1.79zM6.4 4.235A9.995 9.995 0 0110 3a8.267 8.267 0 018.057 6 8.264 8.264 0 01-2.707 4.243l-1.47-1.47A6.003 6.003 0 0010 14a6 6 0 01-1.004-5.929L4.26 4.89A9.958 9.958 0 016.4 4.235z" clipRule="evenodd" />
                    </svg>
                  }
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <a href="/forgot-password" className="font-medium text-teal-600 hover:text-teal-500">
                  Forgot your password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#018C79] hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="font-medium text-[#018C79] hover:text-teal-500"
              >
                Create an account
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Branding and Messaging */}
      <div 
        className="hidden lg:flex lg:w-1/2 bg-[#018C79] flex-col justify-center items-center p-12 text-white relative"
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg 
            className="w-full h-full" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1440 810" 
            preserveAspectRatio="xMinYMin slice"
          >
            <path 
              fill="#ffffff" 
              d="M0 0l225 112.5 225-112.5 225 112.5 225-112.5 225 112.5 225-112.5 225 112.5 240-120v810H0z" 
              opacity=".5"
            />
          </svg>
        </div>

        {/* Logo and Messaging */}
        <div className="z-10 text-center max-w-md">
          <img 
            src={LogoImage} 
            alt="Lost & Found Tracker Logo" 
            className="mx-auto h-32 w-32 mb-8 rounded-full shadow-2xl"
          />
          <h1 className="text-4xl font-bold mb-6">
            Lost & Found Tracker
          </h1>
          <p className="text-xl mb-8 leading-relaxed">
            Reunite with your lost belongings effortlessly. Our platform makes tracking and recovering lost items simple and efficient.
          </p>
          
          {/* Feature Highlights */}
          <div className="space-y-4">
            <div className="flex items-center">
              <svg 
                className="h-6 w-6 mr-3 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span>Quick and Easy Item Reporting</span>
            </div>
            <div className="flex items-center">
              <svg 
                className="h-6 w-6 mr-3 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" 
                />
              </svg>
              <span>Secure and Private</span>
            </div>
            <div className="flex items-center">
              <svg 
                className="h-6 w-6 mr-3 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <span>Instant Notifications</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;