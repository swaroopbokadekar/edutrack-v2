import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine } from 'recharts';

// --- Helper Functions & Components ---
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

const getBorderColor = (type) => {
  if (type === 'QUIZ') return 'border-indigo-500';
  if (type === 'ASSIGNMENT') return 'border-teal-500';
  return 'border-rose-500';
};

const getTextColor = (type) => {
  if (type === 'QUIZ') return 'text-indigo-400 border-indigo-100';
  if (type === 'ASSIGNMENT') return 'text-teal-500 border-teal-100';
  return 'text-rose-400 border-rose-100';
};

// --- SUB-COMPONENTS ---

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

const GradesView = ({ courses }) => (
  <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden text-left p-8">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-2xl font-black text-indigo-950">Academic Transcript</h3>
      <span className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold">Semester 1</span>
    </div>
    <table className="w-full text-left mt-4">
      <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
        <tr>
          <th className="px-8 py-4">Subject</th>
          <th className="px-8 py-4 text-center">Quiz Avg</th>
          <th className="px-8 py-4 text-center">Midterm</th>
          <th className="px-8 py-4 text-center">Assignments</th>
          <th className="px-8 py-4 text-center">Overall Score</th>
          <th className="px-8 py-4 text-center">Final Grade</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {courses.map((c, i) => (
          <tr key={i} className="hover:bg-gray-50 transition">
            <td className="px-8 py-5">
              <p className="font-bold text-indigo-950">{c.subject}</p>
              <p className="text-[10px] text-gray-500">{c.teacher}</p>
            </td>
            <td className="px-8 py-5 text-center font-bold text-gray-500">{c.score > 0 ? c.score : '-'}</td>
            <td className="px-8 py-5 text-center font-bold text-gray-500">{c.score > 0 ? c.score : '-'}</td>
            <td className="px-8 py-5 text-center font-bold text-gray-500">{c.score > 0 ? c.score : '-'}</td>
            <td className="px-8 py-5 text-center font-black text-indigo-600">{c.score}%</td>
            <td className="px-8 py-5 text-center">
              <span className={`w-8 py-1 inline-block rounded text-center text-xs font-bold ${c.bg} ${c.hex}`}>{c.grade}</span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const CalendarView = ({ myAssignments }) => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-left max-w-3xl">
    <h3 className="text-2xl font-black text-indigo-950 mb-2">Schedule & Deadlines</h3>
    <p className="text-gray-500 mb-8">Stay on top of your upcoming tasks across all enrolled courses.</p>
    
    {myAssignments.length === 0 ? (
      <div className="p-12 text-center text-gray-400 border-2 border-dashed border-gray-100 rounded-3xl">
        <span className="text-4xl block mb-4">🎉</span>
        <p className="font-bold">No upcoming deadlines!</p>
        <p className="text-xs mt-1">Enjoy your free time.</p>
      </div>
    ) : (
      <div className="relative border-l-2 border-indigo-100 ml-4 space-y-8 py-4">
        {myAssignments.map((task, i) => {
          let dotColor = 'bg-indigo-500';
          if (task.type === 'ASSIGNMENT') dotColor = 'bg-teal-500';
          if (task.type === 'PROJECT') dotColor = 'bg-rose-500';

          return (
            <div key={i} className="relative pl-8">
              <div className={`absolute -left-[9px] top-4 w-4 h-4 rounded-full border-4 border-white ${dotColor} shadow-sm`}></div>
              <div className={`p-6 rounded-2xl border border-gray-100 shadow-sm border-l-4 ${getBorderColor(task.type)} bg-gray-50/30 hover:bg-white transition`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[10px] font-black border px-2 py-1 rounded uppercase tracking-widest ${getTextColor(task.type)}`}>{task.type}</span>
                    <h4 className="font-bold text-gray-800 text-lg mt-3">{task.title}</h4>
                    <p className="text-xs font-bold text-gray-500 mt-1">{task.courseName}</p>
                  </div>
                  <div className="text-right bg-white p-3 rounded-xl shadow-sm border border-gray-50">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Due Date</p>
                    <p className="font-black text-rose-500 text-sm">{task.dueDate}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

const AttendanceDetailsView = ({ attendanceData, courses }) => (
  <div className="space-y-8 text-left">
    <h3 className="text-2xl font-black text-indigo-950 mb-6">Attendance Records</h3>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h4 className="text-lg font-bold text-gray-800 mb-6">Monthly Overview</h4>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} domain={[60, 100]} />
              <Tooltip cursor={false} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
              <ReferenceLine y={75} stroke="#f87171" strokeDasharray="3 3" label={{ position: 'insideTopLeft', value: 'Minimum Required: 75%', fill: '#f87171', fontSize: 10 }} />
              <Line type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={3} dot={{r: 5, fill: '#ffffff', stroke: '#4f46e5', strokeWidth: 2}} activeDot={{r: 8}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h4 className="text-lg font-bold text-gray-800 mb-6">By Subject</h4>
        <div className="space-y-4">
           {courses.map((c, i) => (
             <div key={i} className="flex justify-between items-center p-3 border border-gray-50 rounded-xl bg-gray-50/50">
               <span className="font-bold text-sm text-gray-700">{c.subject}</span>
               <span className={`text-xs font-black px-2 py-1 rounded-lg ${c.score > 0 ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                 {c.score > 0 ? '92%' : 'N/A'}
               </span>
             </div>
           ))}
        </div>
      </div>
    </div>
  </div>
);

const AlertsView = () => (
  <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 text-left max-w-3xl">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-2xl font-black text-indigo-950">System Alerts</h3>
      <span className="text-xs font-bold text-indigo-600 cursor-pointer hover:underline">Mark all as read</span>
    </div>
    <div className="space-y-4">
      <div className="bg-blue-50 p-5 rounded-2xl border border-blue-100 flex gap-4 items-start shadow-sm">
        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-lg shadow-sm">ℹ️</div>
        <div>
          <h4 className="font-black text-blue-900">Attendance Update</h4>
          <p className="text-sm text-blue-700 mt-1">Your overall attendance is currently 87%, which is above the 75% minimum requirement. Keep up the good work!</p>
          <span className="text-[10px] font-bold text-blue-400 mt-3 block">Just now</span>
        </div>
      </div>
      <div className="bg-green-50 p-5 rounded-2xl border border-green-100 flex gap-4 items-start shadow-sm opacity-70">
        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-lg shadow-sm">✅</div>
        <div>
          <h4 className="font-black text-green-900">Assignment Graded</h4>
          <p className="text-sm text-green-700 mt-1">Prof. Santosh Patil has graded your English Assignment. Check your Grades tab for details.</p>
          <span className="text-[10px] font-bold text-green-400 mt-3 block">2 days ago</span>
        </div>
      </div>
      <div className="bg-amber-50 p-5 rounded-2xl border border-amber-100 flex gap-4 items-start shadow-sm opacity-70">
        <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-lg shadow-sm">⚠️</div>
        <div>
          <h4 className="font-black text-amber-900">Semester Registration</h4>
          <p className="text-sm text-amber-700 mt-1">Please ensure you have joined all your required classes in the Course Catalog before the end of the week.</p>
          <span className="text-[10px] font-bold text-amber-400 mt-3 block">1 week ago</span>
        </div>
      </div>
    </div>
  </div>
);

// --- UPGRADED: Educational Platform Profile View ---
const ProfileView = ({ studentName, studentId }) => {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="space-y-8 text-left max-w-6xl">
       <h3 className="text-2xl font-black text-indigo-950 mb-6">Student Profile & Settings</h3>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Identity & Contact Card */}
          <div className="space-y-8">
             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-indigo-50 shadow-md mb-4">
                  <img src={`https://ui-avatars.com/api/?name=${studentName}&background=e0e7ff&color=4f46e5&size=256`} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-2xl font-black text-gray-800">{studentName}</h4>
                <p className="text-sm font-bold text-indigo-600 mt-1">Computer Science & Engineering</p>
                <span className="inline-block mt-3 px-3 py-1 bg-gray-100 text-gray-500 rounded-lg text-xs font-black tracking-widest uppercase">ID: #EDU-{studentId || '000'}</span>

                <div className="mt-8 text-left space-y-4">
                   <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</p>
                     <p className="font-bold text-gray-700 text-sm mt-1">{`${studentName.toLowerCase().replace(/\s/g, '')}@student.edutrack.com`}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Phone Number</p>
                     <p className="font-bold text-gray-700 text-sm mt-1">+91 98765 43210</p>
                   </div>
                </div>
                <button className="w-full mt-8 px-4 py-3 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-100 transition cursor-pointer">Edit Profile</button>
             </div>
          </div>

          {/* Right Column: Academic Portfolio & Preferences */}
          <div className="lg:col-span-2 space-y-8">
             
             {/* Academic Details */}
             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h4 className="text-lg font-bold text-gray-800 mb-6">Academic Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Program</p>
                      <p className="font-bold text-gray-800 mt-1">B.E. Computer Science</p>
                   </div>
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Current Semester</p>
                      <p className="font-bold text-gray-800 mt-1">Semester 8</p>
                   </div>
                   <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Enrollment Year</p>
                      <p className="font-bold text-gray-800 mt-1">2022 - 2026</p>
                   </div>
                   <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                      <p className="text-[10px] font-black text-green-500 uppercase tracking-widest">Academic Standing</p>
                      <p className="font-black text-green-700 mt-1">Good Standing (GPA: 8.2)</p>
                   </div>
                </div>
             </div>

             {/* Earned Badges/Certificates */}
             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h4 className="text-lg font-bold text-gray-800 mb-6">Credentials & Certifications</h4>
                <div className="flex gap-4 overflow-x-auto pb-2">
                   <div className="min-w-[140px] p-4 bg-sky-50 rounded-2xl border border-sky-100 text-center">
                      <span className="text-3xl block mb-2">💻</span>
                      <p className="text-xs font-bold text-sky-900">Java Full Stack</p>
                      <p className="text-[9px] text-sky-600 mt-1">Certified</p>
                   </div>
                   <div className="min-w-[140px] p-4 bg-amber-50 rounded-2xl border border-amber-100 text-center">
                      <span className="text-3xl block mb-2">📊</span>
                      <p className="text-xs font-bold text-amber-900">Big Data</p>
                      <p className="text-[9px] text-amber-600 mt-1">Foundations</p>
                   </div>
                   <div className="min-w-[140px] p-4 bg-rose-50 rounded-2xl border border-rose-100 text-center">
                      <span className="text-3xl block mb-2">🚀</span>
                      <p className="text-xs font-bold text-rose-900">Hackathon</p>
                      <p className="text-[9px] text-rose-600 mt-1">Project ZeroBin</p>
                   </div>
                </div>
             </div>

             {/* Preferences */}
             <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
                <h4 className="text-lg font-bold text-gray-800 mb-6">Preferences</h4>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div>
                    <p className="font-bold text-sm text-gray-800">Assignment Reminders</p>
                    <p className="text-[10px] text-gray-400 mt-1">Get emails 24h before a deadline.</p>
                  </div>
                  <div onClick={() => setNotifications(!notifications)} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notifications ? 'bg-green-500' : 'bg-gray-200'}`}>
                     <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${notifications ? 'translate-x-6' : ''}`}></div>
                  </div>
                </div>
             </div>

          </div>
       </div>
    </div>
  );
};

// --- MAIN DASHBOARD ---

const StudentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [studentId, setStudentId] = useState(null);
  const [studentName, setStudentName] = useState('Student');
  const [currentDateTime, setCurrentDateTime] = useState('');
  
  const [allCourses, setAllCourses] = useState([]);
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [myAssignments, setMyAssignments] = useState([]); 
  
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
      const courseRes = await fetch('http://localhost:8080/api/courses');
      if (courseRes.ok) setAllCourses(await courseRes.json());

      const enrollRes = await fetch(`http://localhost:8080/api/enrollments/student/${id}`);
      if (enrollRes.ok) setMyEnrollments(await enrollRes.json());

      const assignRes = await fetch(`http://localhost:8080/api/assignments/student/${id}`);
      if (assignRes.ok) setMyAssignments(await assignRes.json());

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
      const payload = { studentId: parseInt(studentId), courseId: parseInt(courseId) };
      const response = await fetch('http://localhost:8080/api/enrollments/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (response.ok) {
        alert("Successfully enrolled in class!");
        fetchData(studentId);
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

      <main className="flex-1 xl:ml-64 px-8 pt-6 pb-12">
        
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center gap-2">
            <h1 className="text-lg font-bold text-gray-800">Good morning, {studentName}!</h1>
            <span className="text-gray-400 text-sm">| {currentDateTime}</span>
          </div>
          <div className="flex items-center gap-4">
            <span onClick={() => setActiveTab('Alerts')} className="text-gray-400 cursor-pointer hover:text-indigo-600 transition">🔔</span>
            <div onClick={() => setActiveTab('Profile')} className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden border border-gray-300 cursor-pointer hover:border-indigo-500 transition">
               <img src={`https://ui-avatars.com/api/?name=${studentName}&background=f3f4f6&color=4f46e5`} alt="Profile" />
            </div>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <>
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
                  <h4 className="text-2xl font-black text-gray-800">8.2</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Above class avg</p>
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
                  <p className="text-gray-400 text-xs font-bold uppercase mb-1">Tasks Due</p>
                  <h4 className="text-2xl font-black text-gray-800">{myAssignments.length}</h4>
                  <p className="text-[10px] text-gray-400 mt-1">Pending items</p>
                </div>
                <CircularProgress value={myAssignments.length > 0 ? 100 : 0} color="#f59e0b" />
              </div>
            </div>

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
                  <span onClick={() => setActiveTab('Calendar')} className="text-indigo-600 text-xs font-bold cursor-pointer hover:underline">View Calendar</span>
                </div>
                
                <div className="space-y-3">
                   {myAssignments.length === 0 ? (
                     <p className="text-gray-400 text-xs text-center py-4">No upcoming deadlines.</p>
                   ) : (
                     myAssignments.map((item, i) => (
                       <div key={i} className={`p-4 rounded-xl border border-gray-100 border-l-4 shadow-sm flex justify-between items-center ${getBorderColor(item.type)}`}>
                          <div>
                            <p className="font-bold text-gray-800 text-sm">{item.title}</p>
                            <p className="text-[10px] text-gray-400 mt-1">{item.courseName} • Due {item.dueDate}</p>
                          </div>
                          <span className={`text-[9px] font-bold border px-2 py-1 rounded bg-gray-50 ${getTextColor(item.type)}`}>{item.type}</span>
                       </div>
                     ))
                   )}
                </div>
              </div>
            </div>

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
          </>
        )}

        {/* --- DYNAMIC VIEWS --- */}
        {activeTab === 'My Courses' && <CourseCatalogView allCourses={allCourses} myEnrollments={myEnrollments} handleJoinCourse={handleJoinCourse} />}
        {activeTab === 'Grades' && <GradesView courses={courses} />}
        {activeTab === 'Calendar' && <CalendarView myAssignments={myAssignments} />}
        {activeTab === 'Attendance' && <AttendanceDetailsView attendanceData={attendanceData} courses={courses} />}
        {activeTab === 'Alerts' && <AlertsView />}
        {activeTab === 'Profile' && <ProfileView studentName={studentName} studentId={studentId} />}

      </main>
    </div>
  );
};

export default StudentDashboard;