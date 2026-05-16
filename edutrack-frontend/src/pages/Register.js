import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState('Student');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    
    const form = e.target;
    if (form.newPassword.value !== form.confirmPassword.value) {
      return setError("Passwords do not match!");
    }

    const payload = {
      role: selectedRole.toUpperCase(),
      fullName: form.fullName.value, 
      email: form.email.value,
      password: form.newPassword.value,
      accessCode: (selectedRole === 'Teacher' || selectedRole === 'Admin') ? form.accessCode.value : null
    };

    try {
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const errText = await response.text();
        setError(errText || "Registration failed. Email might be taken.");
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
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute top-0 right-0 w-3/4 h-3/4 bg-emerald-600 rounded-full blur-3xl opacity-10"></div>
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">E</div>
          <span className="text-2xl font-black text-white tracking-tight">EduTrack<span className="text-indigo-400">.</span></span>
        </div>

        <div className="relative z-10">
          <h1 className="text-5xl font-black text-white mb-6 leading-tight">Join the future<br/>of learning.</h1>
          <p className="text-slate-400 text-lg max-w-md">Create your account to unlock powerful tools designed for modern education.</p>
        </div>

        <div className="relative z-10 flex gap-4 text-sm text-slate-500 font-medium">
          <span>© 2026 EduTrack Global</span>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 animate-fade-in-up">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-black text-slate-800">Create an Account</h2>
            <p className="text-sm text-slate-500 mt-2 font-medium">Setup your profile to get started.</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-600 text-sm font-bold rounded-xl text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister} className="space-y-4">
            
            {/* Custom Role Selector Pills */}
            <div className="bg-slate-50 p-1.5 rounded-xl border border-slate-200 flex mb-4">
              {['Student', 'Teacher', 'Admin'].map(r => (
                <button
                  key={r} type="button" onClick={() => setSelectedRole(r)}
                  className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all ${selectedRole === r ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
              <input name="fullName" type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" placeholder="John Doe" />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
              <input name="email" type="email" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" placeholder={`john@${selectedRole.toLowerCase()}.edutrack.edu`} />
            </div>

            {(selectedRole === 'Teacher' || selectedRole === 'Admin') && (
              <div className="animate-fade-in-up">
                <label className="block text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2">Staff Access Code</label>
                <input name="accessCode" type="password" required className="w-full px-4 py-3 bg-emerald-50 border border-emerald-200 rounded-xl text-sm font-bold text-emerald-800 outline-none focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition-all" placeholder="Enter EDU2026" />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Password</label>
                <input name="newPassword" type="password" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" placeholder="••••••••" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Confirm</label>
                <input name="confirmPassword" type="password" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-800 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all" placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" className="w-full bg-slate-900 hover:bg-indigo-600 text-white font-bold py-3.5 rounded-xl transition-colors shadow-md mt-6 cursor-pointer flex justify-center items-center gap-2">
              Create Account <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
            </button>
          </form>

          <p className="text-center text-sm font-medium text-slate-500 mt-6 border-t border-slate-100 pt-6">
            Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;