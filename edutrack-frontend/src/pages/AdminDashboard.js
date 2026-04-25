import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('Admin');
  const [activeTab, setActiveTab] = useState('Dashboard'); // NEW: Tab State
  
  // Real-time Data States
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);

  // New Course Form State
  const [newCourse, setNewCourse] = useState({ courseName: '', teacherName: '', gradeLevel: 'Grade 10' });

  useEffect(() => {
    const storedName = localStorage.getItem('edutrack_userName');
    if (storedName) setAdminName(storedName);
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Fetch Users (Students and Teachers)
      const userRes = await fetch('http://localhost:8080/api/users');
      const users = await userRes.json();
      
      const realStudents = users.filter(u => u.role === 'STUDENT');
      const realTeachers = users.filter(u => u.role === 'TEACHER');
      
      setStudents(realStudents);
      setTeachers(realTeachers);

      // Fetch Courses
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
        fetchAllData(); // Refresh the table
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
    { subject: 'Math', score: 78, color: 'bg-green-600' },
    { subject: 'Science', score: 82, color: 'bg-green-600' },
    { subject: 'English', score: 71, color: 'bg-orange-500' },
    { subject: 'History', score: 80, color: 'bg-green-600' },
    { subject: 'Computer Sci', score: 91, color: 'bg-green-600' }
  ];

  return (
    <div className="flex min-h-screen bg-[#f8fafc] font-sans text-left">
      
      {/* Sidebar */}
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

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        
        <header className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <div className="text-sm font-bold text-gray-500">
            Admin <span className="mx-2">/</span> <span className="text-indigo-950">{activeTab}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="w-10 h-10 bg-indigo-100 text-indigo-700 font-bold rounded-full flex items-center justify-center border-2 border-white shadow-sm">
               {adminName.substring(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* --- TAB VIEW: DASHBOARD --- */}
        {activeTab === 'Dashboard' && (
          <>
            {/* KPI CARDS - NOW DYNAMIC! */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-indigo-600">
                  <p className="text-gray-500 text-sm font-bold mb-1">Total Students</p>
                  <h4 className="text-3xl font-black text-gray-800">{students.length}</h4>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-emerald-500">
                  <p className="text-gray-500 text-sm font-bold mb-1">Total Teachers</p>
                  <h4 className="text-3xl font-black text-gray-800">{teachers.length}</h4>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-amber-500">
                  <p className="text-gray-500 text-sm font-bold mb-1">Active Courses</p>
                  <h4 className="text-3xl font-black text-gray-800">{courses.length}</h4>
               </div>
               <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-red-500">
                  <p className="text-gray-500 text-sm font-bold mb-1">Open Alerts</p>
                  <h4 className="text-3xl font-black text-gray-800">2</h4>
               </div>
            </div>

            {/* CHARTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
               <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-black text-indigo-950 mb-6">Student Enrollment Trend</h3>
                  <div className="h-56">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                        <defs><linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient></defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#94a3b8'}} />
                        <Tooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                        <Area type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorVal)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
               </div>
               <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-black text-indigo-950 mb-6">Performance Overview</h3>
                  <div className="space-y-5">
                     {performanceData.map((item, i) => (
                        <div key={i}>
                           <div className="flex justify-between items-center mb-1"><p className="text-sm font-bold text-gray-700">{item.subject}</p><p className="text-xs font-bold text-gray-500">{item.score}%</p></div>
                           <div className="w-full bg-gray-100 h-2.5 rounded-full overflow-hidden"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.score}%` }}></div></div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
          </>
        )}

        {/* --- TAB VIEW: COURSES MANAGEMENT --- */}
        {activeTab === 'Courses' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Create Course Form */}
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-black text-indigo-950 mb-6">Create New Course</h3>
              <form onSubmit={handleAddCourse} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Course Name</label>
                  <input type="text" placeholder="e.g. Advanced Physics" required value={newCourse.courseName} onChange={(e) => setNewCourse({...newCourse, courseName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Assign Teacher</label>
                  <select required value={newCourse.teacherName} onChange={(e) => setNewCourse({...newCourse, teacherName: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none">
                    <option value="">Select a Teacher</option>
                    {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Grade Level</label>
                  <select value={newCourse.gradeLevel} onChange={(e) => setNewCourse({...newCourse, gradeLevel: e.target.value})} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-600 outline-none">
                    <option>Grade 9</option>
                    <option>Grade 10</option>
                    <option>Grade 11</option>
                    <option>Grade 12</option>
                  </select>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition cursor-pointer mt-4">Add Course +</button>
              </form>
            </div>

            {/* Course List Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="p-6 border-b border-gray-50">
                <h3 className="text-lg font-black text-indigo-950">Active Directory</h3>
              </div>
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-400 text-xs font-bold">
                  <tr>
                    <th className="px-6 py-4">Course Name</th>
                    <th className="px-6 py-4">Teacher</th>
                    <th className="px-6 py-4">Grade Level</th>
                    <th className="px-6 py-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {courses.length === 0 ? <tr><td colSpan="4" className="text-center p-8 text-gray-400">No courses created yet.</td></tr> : null}
                  {courses.map((course) => (
                    <tr key={course.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-bold text-indigo-950">{course.courseName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{course.teacherName}</td>
                      <td className="px-6 py-4"><span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-bold">{course.gradeLevel}</span></td>
                      <td className="px-6 py-4 text-center">
                        <button onClick={() => handleDeleteCourse(course.id)} className="px-3 py-1 bg-red-50 text-red-500 rounded-lg text-xs font-bold hover:bg-red-500 hover:text-white transition cursor-pointer">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        )}

        {/* --- PLACEHOLDER FOR OTHER TABS --- */}
        {!['Dashboard', 'Courses'].includes(activeTab) && (
          <div className="bg-white p-20 rounded-2xl text-center border border-dashed border-gray-200">
            <h2 className="text-2xl font-black text-gray-300 uppercase tracking-widest">{activeTab} Coming Soon</h2>
            <p className="text-gray-400 mt-2">Module currently under construction.</p>
          </div>
        )}

      </main>
    </div>
  );
};

export default AdminDashboard;