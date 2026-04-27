import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// --- SUB-COMPONENTS ---

const StudentsView = ({ students }) => (
  <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-8 border-b border-gray-50 flex justify-between items-center">
      <h3 className="text-2xl font-black text-indigo-950">Registered Students Directory</h3>
      <span className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold">{students.length} Total</span>
    </div>
    <table className="w-full text-left">
      <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
        <tr>
          <th className="px-8 py-4">System ID</th>
          <th className="px-8 py-4">Student Name</th>
          <th className="px-8 py-4">Email Address</th>
          <th className="px-8 py-4">Status</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {students.length === 0 ? <tr><td colSpan="4" className="text-center p-8 text-gray-400">No students registered yet.</td></tr> : null}
        {students.map((student) => (
          <tr key={student.id} className="hover:bg-gray-50 transition">
            <td className="px-8 py-4 font-bold text-gray-400">#EDU-{student.id}</td>
            <td className="px-8 py-4 font-bold text-indigo-950 flex items-center gap-3">
               <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                  <img src={`https://ui-avatars.com/api/?name=${student.name}&background=f8fafc&color=4f46e5`} alt="avatar" />
               </div>
               {student.name}
            </td>
            <td className="px-8 py-4 text-sm text-gray-500">{student.email}</td>
            <td className="px-8 py-4"><span className="px-3 py-1 bg-green-50 text-green-600 rounded-full text-[10px] font-bold uppercase tracking-widest">Active</span></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const TeachersView = ({ teachers, courses }) => (
  <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
    <div className="p-8 border-b border-gray-50 flex justify-between items-center">
      <h3 className="text-2xl font-black text-indigo-950">Faculty Directory</h3>
      <span className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold">{teachers.length} Total</span>
    </div>
    <table className="w-full text-left">
      <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
        <tr>
          <th className="px-8 py-4">System ID</th>
          <th className="px-8 py-4">Teacher Name</th>
          <th className="px-8 py-4">Email Address</th>
          <th className="px-8 py-4">Assigned Courses</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {teachers.length === 0 ? <tr><td colSpan="4" className="text-center p-8 text-gray-400">No teachers registered yet.</td></tr> : null}
        {teachers.map((teacher) => {
          const assignedCount = courses.filter(c => c.teacherName === teacher.name).length;
          
          return (
            <tr key={teacher.id} className="hover:bg-gray-50 transition">
              <td className="px-8 py-4 font-bold text-gray-400">#FAC-{teacher.id}</td>
              <td className="px-8 py-4 font-bold text-indigo-950 flex items-center gap-3">
                 <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 border border-gray-200">
                    <img src={`https://ui-avatars.com/api/?name=${teacher.name}&background=e0e7ff&color=4f46e5`} alt="avatar" />
                 </div>
                 {teacher.name}
              </td>
              <td className="px-8 py-4 text-sm text-gray-500">{teacher.email}</td>
              <td className="px-8 py-4">
                 {assignedCount > 0 ? (
                    <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-bold">{assignedCount} Classes</span>
                 ) : (
                    <span className="px-3 py-1 bg-gray-50 text-gray-400 rounded-full text-xs font-bold">Unassigned</span>
                 )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
);

// --- NEW: ADMIN REPORTS VIEW ---
const AdminReportsView = ({ enrollmentData, performanceData }) => {
  const COLORS = ['#22c55e', '#0ea5e9', '#f59e0b', '#f43f5e', '#4f46e5'];

  return (
    <div className="space-y-8 text-left">
      <h3 className="text-2xl font-black text-indigo-950 mb-6">School-Wide Analytics</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h4 className="text-lg font-bold text-gray-800 mb-6">Global Enrollment Trends</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs><linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={4} fillOpacity={1} fill="url(#colorVal)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h4 className="text-lg font-bold text-gray-800 mb-6">Department Average GPA</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: 'bold'}} width={100} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: 'none'}} />
                <Bar dataKey="score" radius={[0, 8, 8, 0]} barSize={24}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* System Health Status */}
      <div className="bg-indigo-950 p-8 rounded-[2.5rem] shadow-sm border border-indigo-900 text-white grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
           <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Server Status</p>
           <h4 className="text-2xl font-black text-green-400 flex items-center gap-2"><span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span> Online</h4>
        </div>
        <div>
           <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">Database Load</p>
           <h4 className="text-2xl font-black">12.4 MB</h4>
        </div>
        <div>
           <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest mb-1">API Requests (24h)</p>
           <h4 className="text-2xl font-black">1,402</h4>
        </div>
      </div>
    </div>
  );
};

// --- NEW: ADMIN SETTINGS VIEW ---
const AdminSettingsView = ({ adminName }) => {
  const [toggles, setToggles] = useState({ maintenance: false, openEnrollment: true, autoGrade: true });
  const handleToggle = (key) => setToggles(prev => ({...prev, [key]: !prev[key]}));

  return (
    <div className="text-left max-w-5xl">
      <h3 className="text-2xl font-black text-indigo-950 mb-6">Enterprise Settings</h3>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h4 className="text-lg font-bold text-gray-800 mb-6">Platform Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Institution Name</label>
                <input type="text" defaultValue="EduTrack Global Academy" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Support Email</label>
                <input type="email" defaultValue="admin@edutrack.edu" className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 outline-none focus:ring-2 focus:ring-indigo-600" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Academic Year</label>
                <select className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 outline-none focus:ring-2 focus:ring-indigo-600">
                  <option>2025 - 2026</option>
                  <option>2026 - 2027</option>
                </select>
              </div>
            </div>
            <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition cursor-pointer shadow-md">Save Configuration</button>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
            <h4 className="text-lg font-bold text-gray-800 mb-6">Administrator Profile</h4>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-600 font-black text-xl rounded-full flex items-center justify-center">
                {adminName.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <input type="text" defaultValue={adminName} className="w-full mb-3 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-bold text-gray-600 outline-none" />
                <button className="px-6 py-2 bg-gray-100 text-gray-500 rounded-xl font-bold text-xs hover:bg-gray-200 transition cursor-pointer">Update Password</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit">
           <h4 className="text-lg font-bold text-gray-800 mb-6">System Controls</h4>
           <div className="space-y-6">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-bold text-sm text-gray-800">Maintenance Mode</p>
                 <p className="text-[10px] text-gray-400 mt-1">Lock access for updates.</p>
               </div>
               <div onClick={() => handleToggle('maintenance')} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggles.maintenance ? 'bg-red-500' : 'bg-gray-200'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${toggles.maintenance ? 'translate-x-6' : ''}`}></div>
               </div>
             </div>
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-bold text-sm text-gray-800">Open Enrollment</p>
                 <p className="text-[10px] text-gray-400 mt-1">Allow students to join classes.</p>
               </div>
               <div onClick={() => handleToggle('openEnrollment')} className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggles.openEnrollment ? 'bg-green-500' : 'bg-gray-200'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${toggles.openEnrollment ? 'translate-x-6' : ''}`}></div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD ---

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin');
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // Real-time Data States
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  const [newCourse, setNewCourse] = useState({ courseName: '', teacherName: '', gradeLevel: 'Grade 10' });

  useEffect(() => {
    const storedName = localStorage.getItem('edutrack_userName');
    if (storedName) setAdminName(storedName);
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const userRes = await fetch('http://localhost:8080/api/users');
      const users = await userRes.json();
      
      const realStudents = users.filter(u => u.role === 'STUDENT');
      const realTeachers = users.filter(u => u.role === 'TEACHER');
      
      setStudents(realStudents);
      setTeachers(realTeachers);

      const courseRes = await fetch('http://localhost:8080/api/courses');
      const courseData = await courseRes.json();
      setCourses(courseData);

    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.courseName || !newCourse.teacherName) return alert("Please fill all fields");

    try {
      const response = await fetch('http://localhost:8080/api/courses/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCourse)
      });
      if (response.ok) {
        alert("Course added successfully!");
        setNewCourse({ courseName: '', teacherName: '', gradeLevel: 'Grade 10' });
        fetchAllData(); 
      }
    } catch (err) { alert("Failed to add course."); }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try {
      await fetch(`http://localhost:8080/api/courses/delete/${id}`, { method: 'DELETE' });
      fetchAllData();
    } catch (err) { alert("Delete failed"); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  // Mock Data for Charts
  const enrollmentData = [
    { name: 'Jan', val: 1050 }, { name: 'Feb', val: 1080 }, { name: 'Mar', val: 1100 },
    { name: 'Apr', val: 1130 }, { name: 'May', val: 1160 }, { name: 'Jun', val: 1180 },
    { name: 'Jul', val: 1200 }, { name: 'Aug', val: 1240 }
  ];

  const performanceData = [
    { subject: 'Math', score: 78 },
    { subject: 'Science', score: 82 },
    { subject: 'English', score: 71 },
    { subject: 'History', score: 80 },
    { subject: 'Computer Sci', score: 91 }
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-left">
      
      <aside className="w-64 bg-[#2e268a] text-white flex flex-col fixed h-full z-10 shadow-xl">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded flex items-center justify-center font-black">E</div>
          <div>
            <span className="text-xl font-bold tracking-wide block leading-none">EduTrack</span>
            <span className="text-[10px] text-indigo-300 font-bold tracking-widest uppercase">Admin V2.1</span>
          </div>
        </div>
        <nav className="flex-1 py-6 space-y-2">
          {['Dashboard', 'Students', 'Teachers', 'Courses', 'Reports', 'Settings'].map((item) => (
            <div key={item} onClick={() => setActiveTab(item)} className={`px-8 py-3 text-sm font-medium cursor-pointer flex items-center gap-4 border-l-4 transition-all ${activeTab === item ? 'bg-[#3b32a8] border-indigo-400 text-white' : 'border-transparent text-indigo-200 hover:bg-white/5'}`}>
              <span className="text-lg opacity-80">
                {item === 'Dashboard' && '🏠'}
                {item === 'Students' && '👥'}
                {item === 'Teachers' && '💼'}
                {item === 'Courses' && '📖'}
                {item === 'Reports' && '📊'}
                {item === 'Settings' && '⚙️'}
              </span>
              {item}
            </div>
          ))}
        </nav>
        <button onClick={handleLogout} className="p-8 text-sm font-medium text-indigo-200 hover:text-white flex items-center gap-3 mt-auto border-t border-white/10 cursor-pointer">
          <span>🚪</span> Logout
        </button>
      </aside>

      <main className="flex-1 ml-64 p-8">
        
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div className="text-sm font-bold text-gray-500">
            Admin <span className="mx-2">/</span> <span className="text-indigo-950">{activeTab}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm cursor-pointer hover:bg-indigo-200 transition" onClick={() => setActiveTab('Settings')}>
               {adminName.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {activeTab === 'Dashboard' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 border-l-4 border-l-indigo-600">
                  <p className="text-gray-500 text-sm font-bold mb-1">Total Students</p>
                  <h4 className="text-3xl font-black text-gray-800">{students.length}</h4>
               </div>
               <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 border-l-4 border-l-emerald-500">
                  <p className="text-gray-500 text-sm font-bold mb-1">Total Teachers</p>
                  <h4 className="text-3xl font-black text-gray-800">{teachers.length}</h4>
               </div>
               <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 border-l-4 border-l-amber-500">
                  <p className="text-gray-500 text-sm font-bold mb-1">Active Courses</p>
                  <h4 className="text-3xl font-black text-gray-800">{courses.length}</h4>
               </div>
               <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 border-l-4 border-l-red-500">
                  <p className="text-gray-500 text-sm font-bold mb-1">Open Alerts</p>
                  <h4 className="text-3xl font-black text-gray-800">2</h4>
               </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
               <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                  <h3 className="text-lg font-black text-indigo-950 mb-6">Student Enrollment Trend</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs><linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>
               <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-8">
                  <h3 className="text-lg font-black text-indigo-950 mb-6">Performance Overview</h3>
                  <div className="space-y-5">
                     {performanceData.map((item, i) => (
                        <div key={i}>
                           <div className="flex justify-between items-center mb-1"><p className="text-sm font-bold text-gray-700">{item.subject}</p><p className="text-xs font-bold text-gray-500">{item.score}%</p></div>
                           <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden"><div className="h-full rounded-full bg-emerald-500" style={{ width: `${item.score}%` }}></div></div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </>
        )}

        {/* --- DYNAMIC VIEWS --- */}
        {activeTab === 'Students' && <StudentsView students={students} />}
        {activeTab === 'Teachers' && <TeachersView teachers={teachers} courses={courses} />}
        {activeTab === 'Reports' && <AdminReportsView enrollmentData={enrollmentData} performanceData={performanceData} />}
        {activeTab === 'Settings' && <AdminSettingsView adminName={adminName} />}
        
        {activeTab === 'Courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 h-fit">
              <h3 className="text-lg font-black text-indigo-950 mb-6">Create New Course</h3>
              <form onSubmit={handleAddCourse} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Course Name</label>
                  <input type="text" placeholder="e.g. Advanced Physics" required value={newCourse.courseName} onChange={(e) => setNewCourse({...newCourse, courseName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Assign Teacher</label>
                  <select required value={newCourse.teacherName} onChange={(e) => setNewCourse({...newCourse, teacherName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none cursor-pointer">
                    <option value="">Select a Teacher</option>
                    {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Grade Level</label>
                  <select value={newCourse.gradeLevel} onChange={(e) => setNewCourse({...newCourse, gradeLevel: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none cursor-pointer">
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition cursor-pointer mt-4 shadow-md">Add Course +</button>
              </form>
            </div>

            <div className="lg:col-span-2 bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                <h3 className="text-2xl font-black text-indigo-950">Active Directory</h3>
                <span className="px-4 py-1 bg-indigo-50 text-indigo-600 rounded-xl text-xs font-bold">{courses.length} Courses</span>
              </div>
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-[10px] uppercase font-bold tracking-widest">
                  <tr>
                    <th className="px-8 py-4">Course Name</th>
                    <th className="px-8 py-4">Teacher</th>
                    <th className="px-8 py-4">Grade Level</th>
                    <th className="px-8 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {courses.length === 0 ? <tr><td colSpan="4" className="text-center p-8 text-gray-400">No courses created yet.</td></tr> : null}
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition">
                      <td className="px-8 py-5 font-bold text-indigo-950">{course.courseName}</td>
                      <td className="px-8 py-5 text-sm text-gray-600 font-medium">{course.teacherName}</td>
                      <td className="px-8 py-5"><span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">{course.gradeLevel}</span></td>
                      <td className="px-8 py-5 text-center">
                        <button onClick={() => handleDeleteCourse(course.id)} className="px-4 py-2 bg-red-50 text-red-500 rounded-xl text-xs font-bold hover:bg-red-500 hover:text-white transition cursor-pointer">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;