import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault(); 
    
    const payload = {
      email: email,
      password: password,
      role: role.toUpperCase()
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const userData = await response.json();
        
        // Save the authenticated user details to the browser
        localStorage.setItem('edutrack_userId', userData.id);
        localStorage.setItem('edutrack_userName', userData.name);

        if (role === 'Teacher' || role === 'Admin') {
          navigate('/teacher');
        } else {
          navigate('/student');
        }
      } else {
        alert("Invalid Email, Password, or Role.");
      }
    } catch (error) {
      alert("Cannot connect to server. Is Spring Boot running?");
    }
  };

  return (
    <div className="flex min-h-screen font-sans text-left">
      <div className="hidden lg:flex flex-col justify-between w-1/2 bg-gradient-to-br from-[#4f46e5] to-[#312e81] text-white p-16">
        <div>
          <div className="flex items-center gap-3 mb-16 cursor-pointer" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-white text-indigo-700 rounded-lg flex items-center justify-center font-black">E</div>
            <span className="text-xl font-black tracking-tighter">EduTrack</span>
          </div>
          <h1 className="text-4xl font-black mb-6 leading-tight">Manage your educational<br/>ecosystem with<br/>confidence.</h1>
          <p className="text-indigo-200 mb-10 text-sm w-3/4">The platform for modern schools. Everything you need in one centralized workspace.</p>
          
          <ul className="space-y-4 text-sm font-bold text-indigo-100">
            <li className="flex items-center gap-3"><span className="text-indigo-400">✔</span> Intuitive grade management</li>
            <li className="flex items-center gap-3"><span className="text-indigo-400">✔</span> Real-time attendance tracking</li>
            <li className="flex items-center gap-3"><span className="text-indigo-400">✔</span> Smart communication tools</li>
            <li className="flex items-center gap-3"><span className="text-indigo-400">✔</span> Comprehensive analytics</li>
          </ul>
        </div>

        <div className="flex gap-16 border-t border-indigo-500/30 pt-8">
          <div>
            <h4 className="text-2xl font-black">1,240</h4>
            <p className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">Active Students</p>
          </div>
          <div>
            <h4 className="text-2xl font-black">68</h4>
            <p className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">Teachers</p>
          </div>
          <div>
            <h4 className="text-2xl font-black">98%</h4>
            <p className="text-[10px] uppercase tracking-widest text-indigo-300 font-bold">Satisfaction</p>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-black text-indigo-950 mb-2">Welcome back</h2>
          <p className="text-sm text-gray-500 font-medium mb-8">Select your role and sign in to continue.</p>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="flex p-1 bg-gray-50 rounded-xl border border-gray-100">
              {['Admin', 'Teacher', 'Student'].map((r) => (
                <button
                  key={r} type="button"
                  onClick={() => setRole(r)}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${role === r ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="flex justify-between items-center bg-indigo-50/50 p-3 rounded-lg border border-indigo-100 border-dashed">
               <span className="text-xs font-bold text-indigo-400">Demo: student@edutrack.com</span>
               <button type="button" onClick={() => setEmail('student@edutrack.com')} className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer">Fill →</button>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Email address</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-300">✉</span>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-300">🔒</span>
                <input 
                  type={showPassword ? "text" : "password"} 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  placeholder="••••••••" 
                  required
                  className="w-full pl-10 pr-16 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all" 
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-xs font-bold text-indigo-600 cursor-pointer hover:text-indigo-800"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                <span className="text-xs font-bold text-gray-500">Remember me</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 hover:text-indigo-800 cursor-pointer">Forgot password?</span>
            </div>

            <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex justify-center items-center gap-2 cursor-pointer">
              Sign in <span className="text-lg leading-none">›</span>
            </button>
          </form>

          <p className="text-center text-xs font-bold text-gray-500 mt-8">
            Don't have an account? <Link to="/register" className="text-indigo-600 hover:text-indigo-800 font-black">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;