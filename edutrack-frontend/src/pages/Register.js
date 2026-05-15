import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  // State to track the selected role so we can show/hide the Access Code field
  const [selectedRole, setSelectedRole] = useState('Student');

  const handleRegister = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    if (form.newPassword.value !== form.confirmPassword.value) {
      return alert("Passwords do not match!");
    }

    // Updated payload to perfectly match Spring Boot RegisterRequest.java DTO
    const payload = {
      role: selectedRole.toUpperCase(),
      fullName: form.fullName.value, // Changed from 'name' to 'fullName'
      email: form.email.value,
      password: form.newPassword.value,
      // Pass the access code ONLY if they are staff
      accessCode: (selectedRole === 'Teacher' || selectedRole === 'Admin') ? form.accessCode.value : null
    };

    try {
      // Changed endpoint from /add to /register to hit the secure controller
      const response = await fetch('http://localhost:8080/api/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Account created successfully! Please log in.");
        navigate('/login');
      } else {
        const errorText = await response.text();
        alert("Registration failed: " + errorText);
      }
    } catch (error) {
      alert("Cannot connect to server. Is Spring Boot running?");
    }
  };

  return (
    <div className="flex min-h-screen font-sans text-left">
      <div className="hidden lg:flex flex-col justify-center w-1/2 bg-gradient-to-br from-[#4f46e5] to-[#312e81] text-white p-16 relative overflow-hidden">
        <div className="absolute top-16 left-16 flex items-center gap-3">
          <div className="w-8 h-8 bg-white text-indigo-700 rounded-lg flex items-center justify-center font-black">E</div>
          <span className="text-xl font-black tracking-tighter">EduTrack</span>
        </div>
        
        <div className="z-10 mt-10">
          <h1 className="text-4xl font-black mb-4 leading-tight w-3/4">Join thousands of educators and students</h1>
          <p className="text-indigo-200 mb-12 text-sm w-3/4">Create your account today and experience the future of educational management.</p>
          
          <div className="grid grid-cols-2 gap-4 w-3/4">
             <div className="h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"><div className="w-12 h-2 bg-white/30 rounded-full"></div></div>
             <div className="h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"><div className="w-12 h-2 bg-white/30 rounded-full"></div></div>
             <div className="h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"><div className="w-12 h-2 bg-white/30 rounded-full"></div></div>
             <div className="h-16 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 flex items-center justify-center"><div className="w-12 h-2 bg-white/30 rounded-full"></div></div>
          </div>
        </div>

        <div className="absolute -bottom-24 -right-24 w-96 h-96 border-[40px] border-indigo-500/20 rounded-full"></div>
        <div className="absolute -bottom-12 -right-12 w-96 h-96 border-[40px] border-indigo-400/10 rounded-full"></div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center bg-white p-8 overflow-y-auto">
        <div className="w-full max-w-md py-8">
          <h2 className="text-3xl font-black text-indigo-950 mb-2">Create your account</h2>
          <p className="text-sm text-gray-500 font-medium mb-8">Fill in the details below to get started.</p>

          <form autoComplete="off" onSubmit={handleRegister} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-5">
            
            {/* ROLE SELECTOR */}
            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Role</label>
              <select 
                name="role" 
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600 appearance-none cursor-pointer"
              >
                <option value="Student">Student</option>
                <option value="Teacher">Teacher</option>
                <option value="Admin">Admin</option>
              </select>
            </div>

            {/* CONDITIONAL ACCESS CODE FIELD (Only shows for Teacher/Admin) */}
            {(selectedRole === 'Teacher' || selectedRole === 'Admin') && (
              <div className="animate-fade-in bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 border-dashed">
                <label className="block text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-2">School Access Code <span className="text-red-500">*</span></label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-indigo-300">🔑</span>
                  <input type="text" name="accessCode" placeholder="Enter EDU2026" required className="w-full pl-10 pr-4 py-3 bg-white border border-indigo-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none font-mono tracking-widest" />
                </div>
                <p className="text-[10px] font-bold text-indigo-400 mt-2">Required to verify staff status.</p>
              </div>
            )}

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Full Name</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-300">👤</span>
                <input type="text" name="fullName" autoComplete="name" placeholder="Jane Doe" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Email address</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-300">✉</span>
                <input type="email" name="email" autoComplete="email" placeholder="jane@example.com" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Institution / School Name</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-gray-300">🏛</span>
                <input type="text" name="institution" autoComplete="organization" placeholder="Westview High School" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-300">🔒</span>
                  <input type="password" name="newPassword" autoComplete="new-password" placeholder="••••••••" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Confirm Password</label>
                <div className="relative">
                  <span className="absolute left-4 top-3 text-gray-300">🔒</span>
                  <input type="password" name="confirmPassword" autoComplete="new-password" placeholder="••••••••" required className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2 cursor-pointer">
                <input type="checkbox" required className="mt-1 w-4 h-4 rounded border-gray-300 text-indigo-600" />
                <span className="text-[10px] font-bold text-gray-500 leading-tight">
                  I agree to the <span className="text-indigo-600 cursor-pointer hover:underline">Terms of Service</span> and <span className="text-indigo-600 cursor-pointer hover:underline">Privacy Policy</span>.
                </span>
              </label>
            </div>

            <button type="submit" className="w-full mt-4 bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition-all flex justify-center items-center gap-2 cursor-pointer">
              Create Account <span className="text-lg leading-none">›</span>
            </button>
          </form>

          <p className="text-center text-xs font-bold text-gray-500 mt-8">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-800 font-black">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;