import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('Student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    
    const payload = { email, password, role: role.toUpperCase() };

    try {
      const response = await fetch('http://localhost:8080/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        const data = await response.json();
        
        // Save VIP Wristband & Details
        localStorage.setItem('edutrack_jwt', data.token);
        localStorage.setItem('edutrack_userId', data.user.id);
        localStorage.setItem('edutrack_userName', data.user.name);
        localStorage.setItem('edutrack_userRole', data.user.role);

        // Smart Routing
        if (data.user.role === 'ADMIN') navigate('/admin');
        else if (data.user.role === 'TEACHER') navigate('/teacher');
        else navigate('/student');
      } else {
        const errText = await response.text();
        setError(errText || "Invalid credentials or role mismatch.");
      }
    } catch (err) {
      setError("Network Error: Cannot connect to server.");
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-50 font-sans">
      {/* Left Side - Branding (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-900/50 to-slate-900 z-0"></div>
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-blue-600 rounded-full blur-3xl opacity-10"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">E</div>
          <span className="text-2xl font-black text-white tracking-tight">EduTrack<span className="text-indigo-400">.</span></span>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white mb-6 leading-tight">Manage education,<br/>intelligently.</h1>
          <p className="text-slate-400 text-lg max-w-md">Access your personalized dashboard to monitor performance, manage assignments, and stay connected.</p>
        </div>

        <div className="relative z-10 flex gap-4 text-sm text-slate-500 font-medium">
          <span>© 2026 EduTrack Global</span>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 animate-fade-in-up">
          
          {/* Mobile Branding */}
          <div className="lg:hidden flex justify-center items-center gap-2 mb-8">
             <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">E</div>
             <span className="text-xl font-black text-slate-900">EduTrack<span className="text-indigo-600">.</span></span>
          </div>

          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800">Welcome Back</h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">Please enter your details to sign in.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            
            {/* Custom Role Selector Pills */}
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex mb-6">
              {['Student', 'Teacher', 'Admin'].map(r => (
                <button
                  key={r} type="button" onClick={() => setRole(r)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${role === r ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input 
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all" 
                placeholder={`name@${role.toLowerCase()}.edutrack.edu`} 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} required
                  className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all pr-16" 
                  placeholder="••••••••" 
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 cursor-pointer" />
                <span className="text-xs font-bold text-slate-600">Remember me</span>
              </label>
              <span className="text-xs font-bold text-indigo-600 hover:underline cursor-pointer">Forgot password?</span>
            </div>

            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg mt-4 cursor-pointer flex justify-center items-center gap-2">
              Sign In <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </form>

          <p className="text-center text-sm font-medium text-slate-500 mt-8 border-t border-slate-100 pt-6">
            Don't have an account? <Link to="/register" className="text-indigo-600 font-bold hover:underline">Register here</Link>
          </p>
        </div>
      </div>

      <style>{`
        .animate-fade-in-up { animation: fadeInUp 0.5s ease-out forwards; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default Login;