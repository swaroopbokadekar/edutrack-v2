import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  // Function for smooth scrolling to sections
  const scrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#e8eaf0] text-slate-800 selection:bg-indigo-200 selection:text-indigo-900 font-sans scroll-smooth">
      
      {/* TopNavBar */}
      <header className="bg-[#e8eaf0]/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-300/50">
        <nav className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center h-20">
          <div className="text-2xl font-semibold text-indigo-600 tracking-tight cursor-pointer" style={{fontFamily: "'Noto Serif', serif"}} onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            EduTrack
          </div>
          <div className="hidden md:flex items-center gap-12">
            <a href="#philosophy" onClick={(e) => scrollToSection(e, 'philosophy')} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-all duration-300 cursor-pointer">Philosophy</a>
            <a href="#capabilities" onClick={(e) => scrollToSection(e, 'capabilities')} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-all duration-300 cursor-pointer">Capabilities</a>
            <div className="relative group">
              <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="text-sm font-medium text-indigo-600 transition-all duration-300 flex items-center gap-1 cursor-pointer">
                Experience
                <span className="material-symbols-outlined text-xs">expand_more</span>
              </a>
              {/* Dropdown Menu */}
              <div className="absolute top-full left-0 mt-2 w-56 bg-[#e8eaf0] rounded-2xl editorial-shadow border border-slate-300/50 py-2 z-50 transform transition-all duration-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0">
                <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-200 transition-colors group/item cursor-pointer">
                  <span className="material-symbols-outlined text-indigo-400 text-lg">dashboard</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800">Personal Dashboard</span>
                  </div>
                </a>
                <a href="#experience" onClick={(e) => scrollToSection(e, 'experience')} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-200 transition-colors group/item cursor-pointer">
                  <span className="material-symbols-outlined text-indigo-400 text-lg">filter_center_focus</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800">Focus Mode</span>
                  </div>
                </a>
                <a href="#analytics" onClick={(e) => scrollToSection(e, 'analytics')} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-200 transition-colors group/item cursor-pointer">
                  <span className="material-symbols-outlined text-indigo-400 text-lg">trending_up</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-slate-800">Progress Tracking</span>
                  </div>
                </a>
              </div>
            </div>
            <a href="#analytics" onClick={(e) => scrollToSection(e, 'analytics')} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-all duration-300 cursor-pointer">Analytics</a>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/login')} className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-all active:scale-95 duration-200 cursor-pointer">Log In</button>
            <button onClick={() => navigate('/login')} className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-sm font-medium hover:bg-indigo-700 active:scale-95 transition-all duration-200 editorial-shadow cursor-pointer">Get Started</button>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* UPDATED: High-quality, modern educational image focusing on digital focus & modern study */}
            <img alt="Focused modern student wearing headphones studying with digital technology" className="w-full h-full object-cover object-center" src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop" />
            <div className="absolute inset-0 bg-[#e8eaf0]/60 backdrop-blur-[2px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#e8eaf0]/40 via-transparent to-[#e8eaf0]"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 text-center mt-20">
            <div className="max-w-3xl mx-auto space-y-8">
              <h1 className="text-5xl md:text-7xl text-slate-800 leading-[1.1] font-medium drop-shadow-sm" style={{fontFamily: "'Noto Serif', serif"}}>
                Learn with clarity.<br/>
                <span className="italic text-violet-600">Progress with purpose.</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-800 leading-relaxed max-w-2xl mx-auto font-medium drop-shadow-sm">
                A calm, AI-guided learning environment designed for deep work and intentional progress.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-6">
                <button onClick={() => navigate('/login')} className="px-10 py-4 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-all active:scale-95 duration-300 shadow-xl border border-white/20 cursor-pointer">Start your learning journey</button>
                <button onClick={(e) => scrollToSection(e, 'philosophy')} className="px-10 py-4 bg-white/70 backdrop-blur-md border border-white/50 text-slate-800 rounded-xl text-sm font-semibold hover:bg-slate-200 hover:border-indigo-400 transition-all active:scale-95 duration-300 cursor-pointer">Explore how it works</button>
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        {/* UPDATED: Integrated the soft illustrative library background for a warm, focused feel. */}
        <section className="relative py-24 px-6 lg:px-12 overflow-hidden bg-subtle-gradient" id="philosophy">
          <div className="absolute inset-0 z-0">
            {/* Added: Stylyzed illustrative library background */}
            {/* <img alt="Serene library study space" className="w-full h-full object-cover object-center" src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop" /> */}
            <div className="absolute inset-0 bg-[#e8eaf0]/70 backdrop-blur-[1px]"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#e8eaf0]/30 via-transparent to-[#e8eaf0]"></div>
          </div>
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <span className="text-xs uppercase tracking-[0.2em] text-indigo-600 mb-6 block font-semibold">Our Philosophy</span>
            <h2 className="text-4xl text-slate-800 mb-10 font-medium" style={{fontFamily: "'Noto Serif', serif"}}>Designed for the Thinking Mind</h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-slate-500 leading-relaxed font-medium">
                In an era of digital noise, we believe true learning requires a protected space. EduTrack is built on the principles of deep work—eliminating distractions to allow the brain to form lasting connections. We prioritize quiet visual languages over frantic notifications, fostering an environment where progress is measured by depth, not just speed.
              </p>
            </div>
          </div>
        </section>

        {/* Problem vs Solution (Bento Style) */}
        <section className="py-24 px-6 lg:px-12 bg-[#e8eaf0]">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-10">
              <div className="p-10 lg:p-12 neo-card border border-white/20 hover:scale-[1.01] transition-all duration-500">
                <div className="flex items-center gap-2 mb-6 text-red-600">
                  <span className="material-symbols-outlined">noise_aware</span>
                  <span className="text-sm font-semibold">Traditional Learning</span>
                </div>
                <h3 className="text-2xl mb-6 font-medium text-slate-800" style={{fontFamily: "'Noto Serif', serif"}}>Fragmented and Noisy</h3>
                <p className="text-slate-500 text-base mb-10 opacity-80">Scattered notifications, cluttered interfaces, and constant context-switching that drain mental energy.</p>
                <div className="space-y-4">
                  <div className="h-4 w-full neo-inset rounded-full opacity-50"></div>
                  <div className="h-4 w-3/4 neo-inset rounded-full opacity-50"></div>
                </div>
              </div>
              <div className="p-10 lg:p-12 neo-card border border-white/20 hover:scale-[1.01] transition-all duration-500">
                <div className="flex items-center gap-2 mb-6 text-indigo-600">
                  <span className="material-symbols-outlined">vibration</span>
                  <span className="text-sm font-semibold">EduTrack System</span>
                </div>
                <h3 className="text-2xl mb-6 font-medium text-slate-800" style={{fontFamily: "'Noto Serif', serif"}}>Harmonious and Focused</h3>
                <p className="text-slate-500 text-base mb-10">A unified, serene workspace that guides you gently through your curriculum without the friction of chaos.</p>
                <div className="space-y-4">
                  <div className="h-4 w-full bg-indigo-600/20 rounded-full"></div>
                  <div className="h-4 w-1/2 bg-indigo-600/20 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        {/* UPDATED: Added a bg-mesh-gradient for a subtle, optimistic feel in this section. */}
        <section className="relative py-24 px-6 lg:px-12 bg-subtle-gradient overflow-hidden capabilities-background" id="capabilities">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="mb-16">
              <h2 className="text-4xl text-slate-800 font-medium leading-snug" style={{fontFamily: "'Noto Serif', serif"}}>Software that understands how<br/>learning actually works</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <div className="neo-card p-8 lg:p-10 border border-white/20 flex flex-col gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 bg-mesh-gradient">
                <div className="w-12 h-12 rounded-xl neo-inset flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined">map</span>
                </div>
                <h3 className="text-xl text-indigo-600 font-medium" style={{fontFamily: "'Noto Serif', serif"}}>Smart learning plans</h3>
                <p className="text-base text-slate-500">Adaptive goal tracking that adjusts to your pace, ensuring steady progress without overwhelm.</p>
              </div>
              <div className="neo-card p-8 lg:p-10 border border-white/20 flex flex-col gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 bg-mesh-gradient">
                <div className="w-12 h-12 rounded-xl neo-inset flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined">insights</span>
                </div>
                <h3 className="text-xl text-indigo-600 font-medium" style={{fontFamily: "'Noto Serif', serif"}}>Real-time progress</h3>
                <p className="text-base text-slate-500">Visual insights that show not just what you've done, but how deeply you've engaged with the material.</p>
              </div>
              <div className="neo-card p-8 lg:p-10 border border-white/20 flex flex-col gap-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 bg-mesh-gradient">
                <div className="w-12 h-12 rounded-xl neo-inset flex items-center justify-center text-indigo-600">
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <h3 className="text-xl text-indigo-600 font-medium" style={{fontFamily: "'Noto Serif', serif"}}>Connected families</h3>
                <p className="text-base text-slate-500">Seamless communication bridges for families, providing clarity without intrusive oversight.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Product Experience */}
        <section className="py-24 px-6 lg:px-12 bg-[#2e3040] text-white" id="experience">
          <div className="max-w-7xl mx-auto overflow-hidden">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="p-6 md:p-0">
                <h2 className="text-4xl mb-10 text-white font-medium" style={{fontFamily: "'Noto Serif', serif"}}>A workspace for your best work.</h2>
                <p className="text-lg text-white/70 mb-12 leading-relaxed">Every element of the EduTrack dashboard is designed to recede into the background, letting your content take center stage.</p>
                <ul className="space-y-6">
                  <li className="flex items-center gap-6 group">
                    <span className="material-symbols-outlined text-indigo-300 transition-transform group-hover:scale-110">check_circle</span>
                    <span className="text-sm text-white/90">Minimalist sidebar for swift navigation</span>
                  </li>
                  <li className="flex items-center gap-6 group">
                    <span className="material-symbols-outlined text-indigo-300 transition-transform group-hover:scale-110">check_circle</span>
                    <span className="text-sm text-white/90">Contextual tools that appear only when needed</span>
                  </li>
                  <li className="flex items-center gap-6 group">
                    <span className="material-symbols-outlined text-indigo-300 transition-transform group-hover:scale-110">check_circle</span>
                    <span className="text-sm text-white/90">Soft-toned palette to reduce eye strain</span>
                  </li>
                </ul>
              </div>
              <div className="bg-white/5 rounded-3xl p-4 md:p-8 backdrop-blur-sm border border-white/10 shadow-2xl">
                <img alt="A clean and minimalist software dashboard interface." className="rounded-xl w-full shadow-2xl opacity-90 hover:opacity-100 transition-opacity duration-700" src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"/>
              </div>
            </div>
          </div>
        </section>

        {/* Our Solutions */}
        <section className="py-24 px-6 lg:px-12 bg-[#e8eaf0]">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
              <h2 className="text-4xl text-slate-800 max-w-xl font-medium" style={{fontFamily: "'Noto Serif', serif"}}>Designed to support learning at every level</h2>
              <p className="text-lg text-slate-500 max-w-md italic">Streamlined systems for individuals, educators, and institutional administrators.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-16">
              <div className="border-t-2 border-indigo-200 pt-8 hover:border-indigo-600 transition-all duration-500 group">
                <h4 className="text-2xl text-indigo-600 mb-4 font-medium transition-colors group-hover:text-indigo-800" style={{fontFamily: "'Noto Serif', serif"}}>Centralized data</h4>
                <p className="text-base text-slate-500 opacity-80">One home for every curriculum, assessment, and resource. No more hunting through tabs.</p>
              </div>
              <div className="border-t-2 border-indigo-200 pt-8 hover:border-indigo-600 transition-all duration-500 group">
                <h4 className="text-2xl text-indigo-600 mb-4 font-medium transition-colors group-hover:text-indigo-800" style={{fontFamily: "'Noto Serif', serif"}}>Unified communication</h4>
                <p className="text-base text-slate-500 opacity-80">Focused direct messaging that keeps academic conversations professional and on-topic.</p>
              </div>
              <div className="border-t-2 border-indigo-200 pt-8 hover:border-indigo-600 transition-all duration-500 group">
                <h4 className="text-2xl text-indigo-600 mb-4 font-medium transition-colors group-hover:text-indigo-800" style={{fontFamily: "'Noto Serif', serif"}}>Simplified reporting</h4>
                <p className="text-base text-slate-500 opacity-80">Powerful insights delivered through clear, readable summaries that respect your time.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Focus Mode */}
        <section className="py-24 px-6 lg:px-12 bg-[#1e1b4b] text-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-20">
            <div className="md:w-1/2">
              <img alt="A tranquil scene of a clean, minimalist wooden desk." className="rounded-2xl shadow-2xl w-full aspect-square object-cover border border-white/5 editorial-shadow" src="https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?q=80&w=2070&auto=format&fit=crop"/>
            </div>
            <div className="md:w-1/2 space-y-10">
              <h2 className="text-5xl font-medium leading-tight" style={{fontFamily: "'Noto Serif', serif"}}>Introducing Focus Mode</h2>
              <p className="text-xl opacity-80 leading-relaxed">Activate Deep Work Mode to strip away all UI elements except your core study material. Our interface transforms into a digital sheet of paper, designed to help you reach a state of flow faster and stay there longer.</p>
              <button className="px-12 py-4 bg-white text-[#1e1b4b] rounded-full text-sm font-semibold hover:bg-slate-200 hover:shadow-lg transition-all active:scale-95 duration-300 cursor-pointer">Try Deep Work</button>
            </div>
          </div>
        </section>

        {/* Analytics */}
        <section className="py-24 px-6 lg:px-12 bg-[#e8eaf0]" id="analytics">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl mb-10 text-indigo-600 font-medium" style={{fontFamily: "'Noto Serif', serif"}}>Progress that's felt,<br/><span className="italic">not just measured</span></h2>
              <p className="text-lg text-slate-500 leading-relaxed">Our analytics don't just count hours. They track retention curves and cognitive load to provide a thoughtful overview of your academic growth.</p>
            </div>
            <div className="neo-card p-10 lg:p-12 border border-white/20 editorial-shadow">
              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-slate-500">Cognitive Mastery</span>
                    <span className="text-xs font-semibold text-indigo-600">82%</span>
                  </div>
                  <div className="h-3 w-full neo-inset rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full w-[82%] transition-all duration-1000 ease-out"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <span className="text-sm font-medium text-slate-500">Deep Work Consistency</span>
                    <span className="text-xs font-semibold text-indigo-600">94%</span>
                  </div>
                  <div className="h-3 w-full neo-inset rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 rounded-full w-[94%] transition-all duration-1000 ease-out delay-200"></div>
                  </div>
                </div>
                <div className="pt-6 grid grid-cols-7 gap-4 items-end h-32">
                  <div className="bg-indigo-200 rounded-t-lg h-1/2 hover:bg-indigo-600 transition-colors duration-300"></div>
                  <div className="bg-indigo-200 rounded-t-lg h-3/4 hover:bg-indigo-600 transition-colors duration-300"></div>
                  <div className="bg-indigo-200 rounded-t-lg h-2/3 hover:bg-indigo-600 transition-colors duration-300"></div>
                  <div className="bg-indigo-600 rounded-t-lg h-full shadow-lg transition-all duration-300"></div>
                  <div className="bg-indigo-200 rounded-t-lg h-4/5 hover:bg-indigo-600 transition-colors duration-300"></div>
                  <div className="bg-indigo-200 rounded-t-lg h-1/2 hover:bg-indigo-600 transition-colors duration-300"></div>
                  <div className="bg-indigo-200 rounded-t-lg h-2/3 hover:bg-indigo-600 transition-colors duration-300"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof */}
        <section className="py-24 px-6 lg:px-12 bg-slate-200/50 border-y border-slate-300/30">
          <div className="max-w-7xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-medium text-slate-800" style={{fontFamily: "'Noto Serif', serif"}}>Trusted by intentional learners</h2>
          </div>
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
            <blockquote className="p-10 lg:p-12 neo-card border border-white/20 hover:scale-[1.01] transition-all duration-500 editorial-shadow">
              <p className="text-lg text-slate-800 italic mb-10 leading-relaxed" style={{fontFamily: "'Noto Serif', serif"}}>"EduTrack has fundamentally changed how I approach my doctoral research. The lack of visual noise is a breath of fresh air compared to traditional LMS platforms."</p>
              <footer className="text-sm text-indigo-600 font-semibold">— Dr. Sarah Jenkins, Research Fellow</footer>
            </blockquote>
            <blockquote className="p-10 lg:p-12 neo-card border border-white/20 hover:scale-[1.01] transition-all duration-500 editorial-shadow">
              <p className="text-lg text-slate-800 italic mb-10 leading-relaxed" style={{fontFamily: "'Noto Serif', serif"}}>"As an educator, I appreciate the focus on quality of engagement over quantity. My students are calmer and more focused when using the platform."</p>
              <footer className="text-sm text-indigo-600 font-semibold">— Marcus Thorne, Academy Lead</footer>
            </blockquote>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-24 px-6 lg:px-12 bg-[#e8eaf0]">
          <div className="max-w-7xl mx-auto text-center py-24 px-8 border border-indigo-200/20 rounded-[3rem] bg-gradient-to-b from-[#e8eaf0] to-slate-200 shadow-2xl">
            <h2 className="text-5xl text-indigo-600 mb-6 font-medium" style={{fontFamily: "'Noto Serif', serif"}}>Return to the joy of learning.</h2>
            <p className="text-xl text-slate-500 mb-16 italic opacity-80">Join a community dedicated to intentional progress and mental clarity.</p>
            <button onClick={() => navigate('/login')} className="px-20 py-4 bg-indigo-600 text-white rounded-xl text-sm font-semibold hover:bg-indigo-800 hover:shadow-xl transition-all active:scale-95 duration-500 editorial-shadow cursor-pointer">Begin your journey</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-slate-200 border-t border-slate-300/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-2xl font-semibold text-indigo-600" style={{fontFamily: "'Noto Serif', serif"}}>EduTrack</div>
          <div className="flex gap-10 text-sm text-slate-500 font-medium">
            <a href="#/" className="hover:text-indigo-600 transition-all duration-300 cursor-pointer">Privacy Policy</a>
            <a href="#/" className="hover:text-indigo-600 transition-all duration-300 cursor-pointer">Terms of Service</a>
            <a href="#philosophy" onClick={(e) => scrollToSection(e, 'philosophy')} className="hover:text-indigo-600 transition-all duration-300 cursor-pointer">Our Philosophy</a>
            <a href="#/" className="hover:text-indigo-600 transition-all duration-300 cursor-pointer">Support</a>
          </div>
          <div className="text-xs text-slate-500/70 tracking-wide">
            © 2026 EduTrack. Designed for intentional progress.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;