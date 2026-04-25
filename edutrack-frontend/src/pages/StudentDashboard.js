import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine } from 'recharts';

// --- Helper Component for the Circular Progress Rings ---
const CircularProgress = ({ value, color, max = 100 }) => {
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const strokeDashoffset = circumference - percentage * circumference;
  
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" className="transform -rotate-90">
      <circle cx="24" cy="24" r={radius} stroke="#f1f5f9" strokeWidth="4" fill="none" />
      <circle cx="24" cy="24" r={radius} stroke={color} strokeWidth="4" fill="none"
        strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" />
    </svg>
  );
};

// --- NEW: Course Catalog View ---
const CourseCatalogView = ({ allCourses, myEnrollments, handleJoinCourse }) => {
  return (
    <div className="text-left">
      <h3 className="text-2xl font-black text-indigo-950 mb-6">Course Catalog</h3>
      <p className="text-gray-500 mb-8">Browse available classes and enroll for the current semester.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {allCourses.map(course => {
          const isEnrolled = myEnrollments.some(e => e.courseId === course.id);
          return (
            <div key={course.id} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col h-full hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                 <div>
                   <span className="text-[10px] font-black tracking-widest text-indigo-400 uppercase">{course.gradeLevel}</span>
                   <h4 className="text-xl font-black text-indigo-950 mt-1">{course.courseName}</h4>
                 </div>
                 <span className="text-2xl">🎓</span>
              </div>
              <p className="text-sm font-bold text-gray-500 mb-6">Prof. {course.teacherName}</p>
              
              <div className="mt-auto pt-4 border-t border-gray-50 flex justify-between items-center">
                <span className="text-xs font-bold text-gray-400">{course.enrolledStudents || 0} Students Enrolled</span>
                {isEnrolled ? (
                  <span className="px-4 py-2 bg-green-50 text-green-600 rounded-xl font-bold text-xs">Enrolled ✅</span>
                ) : (
                  <button onClick={() => handleJoinCourse(course.id)} className="px-4 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition cursor-pointer">Join Class +</button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [studentId, setStudentId] = useState(null);
  const [studentName, setStudentName] = useState('Student');
  const [currentDateTime, setCurrentDateTime] = useState('');
  
  // States for Enrollments
  const [allCourses, setAllCourses] = useState([]);
  const [myEnrollments, setMyEnrollments] = useState([]);
  
  const [courses, setCourses] = useState([
    { subject: 'Mathematics', teacher: 'Mr. Kumar', score: 0, grade: 'N/A', color: '#4f46e5', hex: 'text-indigo-600', bg: 'bg-indigo-50' },
    { subject: 'Science', teacher: 'Ms. Park', score: 0, grade: 'N/A', color: '#0ea5e9', hex: 'text-sky-600', bg: 'bg-sky-50' },
    { subject: 'English', teacher: 'Mr. Davis', score: 0, grade: 'N/A', color: '#f43f5e', hex: 'text-rose-600', bg: 'bg-rose-50' },
    { subject: 'History', teacher: 'Ms. Wilson', score: 85, grade: 'B', color: '#f59e0b', hex: 'text-amber-600', bg: 'bg-amber-50' },
    { subject: 'Computer Sci', teacher: 'Mr. Lee', score: 95, grade: 'A+', color: '#334155', hex: 'text-slate-600', bg: 'bg-slate-50' }
  ]);

  const calculateGrade = (score) => {
    if (score >= 90) return 'A+';
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score > 0) return 'D';
    return '-';
  };

  const fetchData = async (id) => {
    try {
      // 1. Fetch available courses
      const courseRes = await fetch('http://localhost:8080/api/courses');
      if (courseRes.ok) setAllCourses(await courseRes.json());

      // 2. Fetch my enrollments
      const enrollRes = await fetch(`http://localhost:8080/api/enrollments/student/${id}`);
      if (enrollRes.ok) setMyEnrollments(await enrollRes.json());

      // 3. Fetch grades
      const gradeRes = await fetch(`http://localhost:8080/api/grades/${id}`);
      if (gradeRes.ok) {
        const gradeData = await gradeRes.json();
        if (gradeData && gradeData.length > 0) {
          const marks = gradeData[gradeData.length - 1]; 
          setCourses(prev => [
            { ...prev[0], score: marks.quiz || 0, grade: calculateGrade(marks.quiz || 0) },
            { ...prev[1], score: marks.midterm || 0, grade: calculateGrade(marks.midterm || 0) },
            { ...prev[2], score: marks.assignment || 0, grade: calculateGrade(marks.assignment || 0) },
            prev[3], prev[4]
          ]);
        }
      }
    } catch (err) { console.error(err); }
  };

  useEffect(() => {
    const storedName = localStorage.getItem('edutrack_userName');
    const storedId = localStorage.getItem('edutrack_userId');
    if (storedName) setStudentName(storedName);
    if (storedId) {
      setStudentId(storedId);
      fetchData(storedId);
    }

    const updateTime = () => {
      const now = new Date();
      const options = { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
      setCurrentDateTime(now.toLocaleString('en-US', options));
    };

    updateTime(); 
    const timerId = setInterval(updateTime, 60000); 

    return () => clearInterval(timerId);
  }, []);

  const handleJoinCourse = async (courseId) => {
    try {
      // ParseInt forces numbers to prevent backend type errors
      const payload = {
        studentId: parseInt(studentId),
        courseId: parseInt(courseId)
      };

      const response = await fetch('http://localhost:8080/api/enrollments/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        alert("Successfully enrolled in class!");
        fetchData(studentId); // Refresh catalogs and counts
      } else {
        const errText = await response.text();
        alert("Could not enroll: " + errText);
      }
    } catch (err) { 
      console.error(err);
      alert("Network Error: Is Spring Boot running?"); 
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const attendanceData = [
    { name: 'Jan', val: 92 }, { name: 'Feb', val: 89 }, { name: 'Mar', val: 85 }, 
    { name: 'Apr', val: 87 }, { name: 'May', val: 84 }, { name: 'Jun', val: 87 }
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-left">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#2e268a] text-white hidden xl:flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center font-black">E</div>
          <span className="text-xl font-bold tracking-wide">EduTrack</span>
        </div>
        <nav className="flex-1 py-6 space-y-1">
          {['Dashboard', 'My Courses', 'Grades', 'Attendance', 'Calendar', 'Alerts', 'Profile'].map((item) => (
            <div key={item} onClick={() => setActiveTab(item)} className={`px-8 py-3 text-sm font-medium cursor-pointer flex items-center gap-4 border-l-4 transition-all ${activeTab === item ? 'bg-white/10 border-white text-white' : 'border-transparent text-indigo-200 hover:bg-white/5'}`}>
              <span>{item === 'Alerts' ? '🔔' : '📄'}</span>
              {item}
              {item === 'Alerts' && <span className="ml-auto bg-indigo-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">2</span>}
            </div>
          ))}
        </nav>
        <button onClick={handleLogout} className="p-6 text-sm font-medium text-indigo-200 hover:text-white flex items-center gap-3 mt-auto cursor-pointer">
          <span>🚪</span> Logout
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 xl:ml-64 px-8 pt-6 pb-12">
        
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-gray-800">Good morning, {studentName}!</h1>
            <span className="text-gray-400 text-sm">| {currentDateTime}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-400 cursor-pointer">🔔</span>
            <div className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden border border-gray-300">
               <img src={`https://ui-avatars.com/api/?name=${studentName}&background=f3f4f6&color=4f46e5`} alt="Profile" />
            </div>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <>
            {/* 1. TOP STATS ROW */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Attendance</p>
                  <h4 className="text-2xl font-black text-gray-800">87%</h4>
                  <p className="text-[10px] text-gray-400 mt-1">7 absences this sem</p>
                </div>
                <CircularProgress value={87} color="#22c55e" />
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">GPA</p>
                  <h4 className="text-2xl font-black text-gray-800">3.4</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Above class average</p>
                </div>
                <CircularProgress value={3.4} max={4.0} color="#4f46e5" />
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Rank</p>
                  <h4 className="text-2xl font-black text-gray-800">#12</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Top 27% of class</p>
                </div>
                <CircularProgress value={73} color="#a855f7" />
              </div>
              <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
                <div>
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Upcoming</p>
                  <h4 className="text-2xl font-black text-gray-800">3</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Due this week</p>
                </div>
                <CircularProgress value={100} color="#f59e0b" />
              </div>
            </div>

            {/* 2. MIDDLE ROW: Courses & Deadlines */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                 <h3 className="text-sm font-bold text-gray-800 mb-6">My Courses</h3>
                 <div className="space-y-5">
                    {courses.map((course, i) => (
                      <div key={i} className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full" style={{backgroundColor: course.color}}></div>
                        <div className="w-32">
                          <p className="font-bold text-gray-800 text-xs">{course.subject}</p>
                          <p className="text-[10px] text-gray-400">{course.teacher}</p>
                        </div>
                        <div className="flex-1">
                          <div className="w-full bg-gray-100 h-1.5 rounded-full">
                            <div className="h-full rounded-full transition-all duration-1000" style={{width: `${course.score}%`, backgroundColor: course.color}}></div>
                          </div>
                        </div>
                        <span className="text-xs font-bold text-gray-500 w-8 text-right">{course.score}%</span>
                        <span className={`w-8 py-1 rounded text-center text-xs font-bold ${course.bg} ${course.hex}`}>{course.grade}</span>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-sm font-bold text-gray-800">Upcoming Deadlines</h3>
                  <span className="text-indigo-600 text-xs font-bold cursor-pointer hover:underline">View Calendar</span>
                </div>
                <div className="space-y-3">
                   {[
                     { title: 'Math Quiz Ch.7', sub: 'Mathematics • Due Tomorrow', type: 'QUIZ', color: 'border-indigo-500' },
                     { title: 'Science Lab Report', sub: 'Science • Due in 2 days', type: 'ASSIGNMENT', color: 'border-teal-500' },
                     { title: 'English Essay Draft', sub: 'English • Due in 5 days', type: 'PROJECT', color: 'border-rose-500' },
                     { title: 'History Presentation', sub: 'History • Due Next Week', type: 'PROJECT', color: 'border-amber-500' }
                   ].map((item, i) => (
                     <div key={i} className={`p-4 rounded-xl border border-gray-100 border-l-4 shadow-sm flex justify-between items-center ${item.color}`}>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{item.sub}</p>
                        </div>
                        <span className="text-[9px] font-bold text-gray-400 border border-gray-200 px-2 py-1 rounded bg-gray-50">{item.type}</span>
                     </div>
                   ))}
                </div>
              </div>
            </div>

            {/* 3. CHARTS ROW */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800 mb-6">Attendance Trend</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={attendanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} domain={[60, 100]} />
                        <Tooltip cursor={false} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <ReferenceLine y={75} stroke="#f87171" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Min Req: 75%', fill: '#f87171', fontSize: 9 }} />
                        <Line type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={2} dot={{r: 4, fill: '#ffffff', stroke: '#4f46e5', strokeWidth: 2}} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-sm font-bold text-gray-800 mb-6">Grades by Subject</h3>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={courses} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                        <XAxis type="number" hide domain={[0, 100]} />
                        <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} width={80} />
                        <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={16}>
                          {courses.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
            </div>

            {/* 4. ACHIEVEMENTS & ALERTS ROW */}
            <h3 className="text-sm font-bold text-gray-800 mb-4">Achievements & Badges</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
               <div className="bg-amber-50/50 p-4 rounded-xl border border-amber-100 text-center shadow-sm">
                  <span className="text-2xl">⭐</span>
                  <p className="text-xs font-bold text-gray-800 mt-2">Perfect Attendance</p>
                  <p className="text-[10px] text-gray-500">March 2026</p>
               </div>
               <div className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 text-center shadow-sm">
                  <span className="text-2xl">🏆</span>
                  <p className="text-xs font-bold text-gray-800 mt-2">Top Scorer</p>
                  <p className="text-[10px] text-gray-500">Science Quiz</p>
               </div>
               <div className="bg-emerald-50/50 p-4 rounded-xl border border-emerald-100 text-center shadow-sm">
                  <span className="text-2xl">📈</span>
                  <p className="text-xs font-bold text-gray-800 mt-2">Improvement Champ</p>
                  <p className="text-[10px] text-gray-500">+15% overall</p>
               </div>
               <div className="bg-sky-50/50 p-4 rounded-xl border border-sky-100 text-center shadow-sm">
                  <span className="text-2xl">✅</span>
                  <p className="text-xs font-bold text-gray-800 mt-2">Assignment Master</p>
                  <p className="text-[10px] text-gray-500">20 on-time</p>
               </div>
            </div>

            <h3 className="text-sm font-bold text-gray-800 mb-4">Recent Alerts</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-blue-50/30 p-4 rounded-xl border border-blue-100 flex items-start gap-3 shadow-sm">
                  <span className="text-blue-500 mt-0.5">ℹ️</span>
                  <div>
                    <p className="text-sm font-bold text-blue-900">Attendance OK</p>
                    <p className="text-[10px] text-blue-600 mt-1">Your 87% is above the 75% minimum requirement. Keep it up!</p>
                  </div>
               </div>
               <div className="bg-green-50/30 p-4 rounded-xl border border-green-100 flex items-start gap-3 shadow-sm">
                  <span className="text-green-500 mt-0.5">✅</span>
                  <div>
                    <p className="text-sm font-bold text-green-900">Grade Improved</p>
                    <p className="text-[10px] text-green-600 mt-1">Your Math score improved from 68% to {courses[0].score}% this semester.</p>
                  </div>
               </div>
            </div>
          </>
        )}

        {/* --- NEW: Course Catalog Tab --- */}
        {activeTab === 'My Courses' && (
           <CourseCatalogView 
              allCourses={allCourses} 
              myEnrollments={myEnrollments} 
              handleJoinCourse={handleJoinCourse} 
           />
        )}

        {!['Dashboard', 'My Courses'].includes(activeTab) && (
          <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
            <h2 className="text-2xl font-black text-gray-300 uppercase tracking-widest">{activeTab} Coming Soon</h2>
            <p className="text-gray-400 mt-2">Linking to edutrack_db...</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default StudentDashboard;