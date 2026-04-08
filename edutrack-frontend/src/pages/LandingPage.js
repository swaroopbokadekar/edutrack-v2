
import { useNavigate } from 'react-router-dom'; // Add this import

import React from 'react';


const LandingPage = () => {
    const navigate = useNavigate(); // Initialize the navigate function
  // Function for smooth scrolling to sections
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen text-gray-900 overflow-x-hidden font-sans scroll-smooth">
      {/* 1. MAANG-Style Navbar */}
      <nav className="flex items-center justify-between px-20 py-6 bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          {/* Custom MAANG-Inspired Modern Logo */}
          <div className="relative w-12 h-12 flex items-center justify-center">
            <div className="absolute inset-0 bg-indigo-600 rounded-xl rotate-6 opacity-20 group-hover:rotate-12 transition-transform"></div>
            <div className="relative w-10 h-10 bg-gradient-to-tr from-indigo-600 to-indigo-400 rounded-xl shadow-lg flex items-center justify-center border border-white/20">
              <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor">
                <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
              </svg>
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-indigo-900 tracking-tighter leading-none">EduTrack</div>
            <div className="text-[10px] font-bold text-indigo-500 uppercase tracking-[0.2em]">SPED Edition</div>
          </div>
        </div>
        
        {/* Navigation Buttons with Smooth Scroll Links */}
        <div className="hidden lg:flex space-x-10 text-gray-600 font-bold text-sm">
          <button onClick={() => scrollToSection('features')} className="hover:text-indigo-600 transition-colors uppercase tracking-widest">Features</button>
          <button onClick={() => scrollToSection('solutions')} className="hover:text-indigo-600 transition-colors uppercase tracking-widest">Solutions</button>
          <button onClick={() => scrollToSection('resources')} className="hover:text-indigo-600 transition-colors uppercase tracking-widest">Resources</button>
        </div>
        
        <div className="flex items-center space-x-6">
        <span 
        onClick={() => navigate('/login')} 
        className="text-sm font-bold text-gray-700 cursor-pointer hover:text-indigo-600 transition-colors">Log In</span>
          <button 
                onClick={() => navigate('/login')} 
                className="bg-indigo-600 text-white px-8 py-3 rounded-full font-black text-sm shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-105 transition-all cursor-pointer">Get Started</button>
        </div>
      </nav>

      {/* 2. Hero Section */}
      <div className="max-w-[1400px] mx-auto px-20 py-24 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="text-left">
          <div className="inline-block bg-indigo-50 text-indigo-600 px-4 py-1 rounded-full text-[10px] font-black mb-6 tracking-[0.2em] uppercase border border-indigo-100">
            Platform 2.0 Live
          </div>
          <h1 className="text-7xl font-black text-indigo-950 mb-8 leading-[1.05] tracking-tight">
            Education <br />reimagined for <br />
            <span className="text-indigo-600">every learner.</span>
          </h1>
          <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed font-medium">
            The world's most intuitive SPED management system. Streamlining individual progress, compliance, and teacher-parent collaboration.
          </p>
          <div className="flex gap-4">
           <button onClick={() => navigate('/login')} 
                className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl shadow-indigo-200 hover:scale-105 transition-all cursor-pointer">Free Trial</button>
            <button 
  onClick={() => navigate('/teacher')} 
  className="border-2 border-gray-100 px-10 py-4 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all cursor-pointer">Watch Demo</button>
          </div>
        </div>
        <div className="relative">
          <div className="bg-white rounded-[3rem] h-[480px] shadow-2xl border-[8px] border-indigo-50/50 overflow-hidden relative z-10">
            <div className="bg-indigo-950 w-full h-10 flex items-center px-4 gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400"></div>
              <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
              <div className="w-2 h-2 rounded-full bg-green-400"></div>
            </div>
            <div className="p-8">
              <div className="flex gap-4 mb-8">
                <div className="w-12 h-12 bg-indigo-600 rounded-xl"></div>
                <div className="flex-1 space-y-2">
                  <div className="w-1/2 h-3 bg-gray-100 rounded"></div>
                  <div className="w-1/4 h-2 bg-gray-50 rounded"></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="h-32 bg-gray-50 rounded-2xl border border-dashed border-gray-200"></div>
                <div className="h-32 bg-gray-50 rounded-2xl border border-dashed border-gray-200"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Features Section */}
      <section id="features" className="py-32 bg-white px-20 border-t border-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div className="max-w-2xl">
              <h2 className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4">Core Capabilities</h2>
              <h3 className="text-5xl font-black text-indigo-950 leading-tight">Software that thinks <br/>the way teachers do.</h3>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-10">
            {[
              {title: "Smart IEPs", desc: "Automated goal tracking and compliance documentation in half the time."},
              {icon: "📈", title: "Real-time Metrics", desc: "Visualize student progress with beautiful, exportable analytics dashboards."},
              {icon: "🤝", title: "Parent Portal", desc: "Keep families in the loop with secure messaging and progress snapshots."}
            ].map((f, i) => (
              <div key={i} className="group p-10 bg-indigo-50/30 rounded-[2rem] border border-transparent hover:border-indigo-100 hover:bg-white hover:shadow-xl transition-all">
                <div className="text-3xl mb-6">{f.icon || "⚡"}</div>
                <h4 className="text-xl font-black mb-4">{f.title}</h4>
                <p className="text-gray-500 font-medium leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Solutions Section */}
      <section id="solutions" className="py-32 bg-indigo-950 text-white px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 gap-20 items-center">
          <div className="grid grid-cols-2 gap-4">
            <div className="h-64 bg-indigo-900 rounded-3xl mt-12"></div>
            <div className="h-64 bg-indigo-800 rounded-3xl"></div>
          </div>
          <div>
            <h2 className="text-indigo-400 font-black text-xs uppercase tracking-[0.3em] mb-4">Our Solutions</h2>
            <h3 className="text-5xl font-black mb-8 leading-tight">Tailored for your <br/>entire district.</h3>
            <div className="space-y-6">
              {["Centralized Special Ed Data", "Unified Communication", "Automatic Federal Reporting"].map((s, i) => (
                <div key={i} className="flex items-center gap-4 text-indigo-200 font-bold">
                  <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center text-[10px] text-white">✓</div>
                  {s}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Resources Section */}
      <section id="resources" className="py-32 px-20 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-indigo-600 font-black text-xs uppercase tracking-[0.3em] mb-4">Knowledge Base</h2>
          <h3 className="text-5xl font-black text-indigo-950 mb-16 tracking-tighter">Everything you need to succeed.</h3>
          <div className="grid grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-3xl text-left border border-gray-100">
              <div className="text-sm font-black text-indigo-600 mb-2">WHITE PAPER</div>
              <h4 className="text-xl font-black mb-4">The Future of SPED in 2026</h4>
              <p className="text-gray-500 text-sm font-medium">Download our latest research on digital inclusion.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl text-left border border-gray-100">
              <div className="text-sm font-black text-indigo-600 mb-2">WEBINAR</div>
              <h4 className="text-xl font-black mb-4">Mastering IEP Compliance</h4>
              <p className="text-gray-500 text-sm font-medium">Join our experts for a live walkthrough.</p>
            </div>
            <div className="bg-gray-50 p-8 rounded-3xl text-left border border-gray-100">
              <div className="text-sm font-black text-indigo-600 mb-2">GUIDE</div>
              <h4 className="text-xl font-black mb-4">Parent Communication</h4>
              <p className="text-gray-500 text-sm font-medium">Building bridges between school and home.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MAANG-Inspired Footer (Matches Ridgeview Ref 2) */}
      <footer className="bg-[#1a1b2e] text-white py-24 px-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          
          {/* Logo Column */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-indigo-400" fill="currentColor">
                  <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-black tracking-tight leading-none">EduTrack</h2>
                <p className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mt-1">SPED Edition</p>
              </div>
            </div>
          </div>

          {/* Quick Navigation Column */}
          <div>
            <h3 className="text-white text-xs font-black tracking-[0.3em] uppercase mb-10 opacity-50">Quick Navigation</h3>
            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-sm font-bold text-gray-400">
              <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="hover:text-indigo-400 text-left">About</button>
              <span className="hover:text-indigo-400 cursor-pointer">News</span>
              <button onClick={() => scrollToSection('features')} className="hover:text-indigo-400 text-left">Academics</button>
              <button onClick={() => scrollToSection('resources')} className="hover:text-indigo-400 text-left">Events</button>
              <span className="hover:text-indigo-400 cursor-pointer">Students</span>
              <span className="hover:text-indigo-400 cursor-pointer">Admissions</span>
              <span className="hover:text-indigo-400 cursor-pointer">Parents</span>
              <button onClick={() => scrollToSection('solutions')} className="hover:text-indigo-400 text-left">Contact</button>
            </div>
          </div>

          {/* Social Column */}
          <div>
            <h3 className="text-white text-xs font-black tracking-[0.3em] uppercase mb-10 opacity-50">Stay Connected</h3>
            <div className="flex flex-col gap-5 text-sm font-bold text-gray-400">
              <span className="hover:text-indigo-400 cursor-pointer">Facebook</span>
              <span className="hover:text-indigo-400 cursor-pointer">Twitter</span>
              <span className="hover:text-indigo-400 cursor-pointer">Instagram</span>
              <span className="hover:text-indigo-400 cursor-pointer">Youtube</span>
            </div>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-white text-xs font-black tracking-[0.3em] uppercase mb-10 opacity-50">Get In Touch</h3>
            <div className="flex flex-col gap-5 text-sm font-bold text-gray-400">
              <p>500 Terry Francine Street</p>
              <p>San Francisco, CA 94158</p>
              <div className="pt-2">
                <p className="text-white">Tel: 123-456-7890</p>
                <p className="text-indigo-400">info@edutrack.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Bar */}
        <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-500 font-black uppercase tracking-widest">
          <p>© 2026 EduTrack Inc. All rights reserved.</p>
          <div className="flex gap-10">
            <span>Privacy Policy</span>
            <span>Terms of Use</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;