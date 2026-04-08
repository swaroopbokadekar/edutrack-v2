import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  // Function to handle the login button click
  const handleLogin = (e) => {
    e.preventDefault(); // Prevents the page from refreshing
    
    // Logic: In a real app, we would validate credentials here.
    // For now, we redirect directly to the Teacher Dashboard.
    navigate('/teacher');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-12 border border-gray-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl mb-4 shadow-lg shadow-indigo-200">
            <svg viewBox="0 0 24 24" className="w-8 h-8 text-white" fill="currentColor">
              <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
            </svg>
          </div>
          <h2 className="text-3xl font-black text-indigo-950">Welcome Back</h2>
          <p className="text-gray-500 font-medium mt-2">Sign in to your SPED Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Email Address</label>
            <input 
              required
              type="email" 
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
              placeholder="name@school.edu"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
            <input 
              required
              type="password" 
              className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:border-indigo-600 focus:ring-2 focus:ring-indigo-100 outline-none transition-all font-medium"
              placeholder="••••••••"
            />
          </div>
          
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
              <span className="text-gray-600 font-bold">Remember me</span>
            </label>
            <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Forgot Password?</span>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black text-lg shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.02] transition-all cursor-pointer"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-gray-500 text-sm font-medium">
            Don't have an account? <span className="text-indigo-600 font-bold cursor-pointer hover:underline">Contact Administrator</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;