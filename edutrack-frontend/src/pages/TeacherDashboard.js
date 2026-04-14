import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// --- SUB-COMPONENTS ---

const DashboardHome = ({ studentList, chartData, setActiveTab }) => (
  <>
    <div className="grid grid-cols-4 gap-6 mb-10 text-left">
      {[
        { label: 'Total Students', value: studentList.length, icon: '👥' },
        { label: 'Classes Today', value: '04', icon: '🏫' },
        { label: 'Avg Attendance', value: '94%', icon: '📈' },
        { label: 'Pending Grading', value: '18', icon: '📝' }
      ].map((stat, i) => (
        <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="text-3xl bg-gray-50 w-14 h-14 flex items-center justify-center rounded-2xl">{stat.icon}</div>
          <div>
            <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
            <h4 className="text-2xl font-black text-indigo-950">{stat.value}</h4>
          </div>
        </div>
      ))}
    </div>

    <div className="grid grid-cols-3 gap-8 mb-10 text-left">
      <div className="col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
        <h3 className="text-xl font-black mb-6 text-indigo-950">Class Performance (Real-time)</h3>
        {/* DEFINITIVE FIX for Recharts width(-1) error: Use inline styles for absolute bounds */}
        <div style={{ width: '100%', height: 300, minHeight: 300 }}> 
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} />
              <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none'}} />
              <Bar dataKey="avg" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      <div className="bg-indigo-900 p-8 rounded-[2.5rem] shadow-xl text-white">
        <h3 className="text-xl font-black mb-6">Next Class</h3>
        <div className="bg-white/10 p-6 rounded-3xl border border-white/10 mb-4">
            <p className="text-indigo-300 text-xs font-bold uppercase mb-1">Mathematics</p>
            <h4 className="text-lg font-black">Room 104 • 10:30 AM</h4>
            <p className="text-indigo-200 text-sm mt-2 font-medium">{studentList.length} Students enrolled</p>
        </div>
        <button onClick={() => setActiveTab('Attendance')} className="w-full bg-white text-indigo-950 py-3 rounded-xl font-black text-sm mt-4 hover:bg-indigo-50 transition cursor-pointer">Take Attendance</button>
      </div>
    </div>
  </>
);

const AttendanceView = ({ studentList, newStudentName, setNewStudentName, enrollStudent, markRealTime, removeStudent }) => (
  <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden text-left p-8">
    <div className="flex justify-between items-center mb-8">
      <h3 className="text-2xl font-black text-indigo-950">Daily Attendance</h3>
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder="Enroll Student..." 
          value={newStudentName}
          onChange={(e) => setNewStudentName(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-600 w-64 text-black"
        />
        <button onClick={enrollStudent} className="bg-indigo-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-indigo-700 transition cursor-pointer">+ Enroll</button>
      </div>
    </div>
    <table className="w-full text-left">
      <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
        <tr>
          <th className="px-8 py-4">#</th>
          <th className="px-8 py-4">Student Name</th>
          <th className="px-8 py-4 text-center">Action</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-50">
        {studentList.map((s, index) => (
          <tr key={s.id}>
            <td className="px-8 py-5 text-gray-400 font-bold">{index + 1}</td>
            <td className="px-8 py-5 font-bold text-indigo-950">{s.name}</td>
            <td className="px-8 py-5 flex justify-center gap-3">
              <button onClick={() => markRealTime(s.id, 'Present')} className="px-4 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-xs hover:bg-green-200 cursor-pointer">Present</button>
              <button onClick={() => markRealTime(s.id, 'Absent')} className="px-4 py-1 bg-red-100 text-red-700 rounded-lg font-bold text-xs hover:bg-red-200 cursor-pointer">Absent</button>
              <button onClick={() => removeStudent(s.id)} className="px-4 py-1 bg-gray-100 text-gray-400 rounded-lg font-bold text-xs hover:bg-red-500 hover:text-white transition cursor-pointer">Remove 🗑️</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

const GradeBookView = ({ studentList, saveGrade }) => {
  const [marks, setMarks] = useState({});
  const handleInputChange = (studentId, field, value) => {
    setMarks(prev => ({ ...prev, [studentId]: { ...prev[studentId], [field]: value } }));
  };

  return (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden text-left p-8">
      <h3 className="text-2xl font-black text-indigo-950 mb-6">Grade Book - Semester 1</h3>
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
          <tr>
            <th className="px-8 py-4">Student Name</th>
            <th className="px-8 py-4 text-center">Quiz</th>
            <th className="px-8 py-4 text-center">Midterm</th>
            <th className="px-8 py-4 text-center">Assignment</th>
            <th className="px-8 py-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {studentList.map((s) => (
            <tr key={s.id}>
              <td className="px-8 py-5 font-bold text-indigo-950">{s.name}</td>
              <td className="px-8 py-5 text-center">
                <input type="number" placeholder="0" className="w-20 p-2 border rounded-xl outline-none text-center" onChange={(e) => handleInputChange(s.id, 'quiz', e.target.value)} />
              </td>
              <td className="px-8 py-5 text-center">
                <input type="number" placeholder="0" className="w-20 p-2 border rounded-xl outline-none text-center" onChange={(e) => handleInputChange(s.id, 'midterm', e.target.value)} />
              </td>
              <td className="px-8 py-5 text-center">
                <input type="number" placeholder="0" className="w-20 p-2 border rounded-xl outline-none text-center" onChange={(e) => handleInputChange(s.id, 'assignment', e.target.value)} />
              </td>
              <td className="px-8 py-5 text-center">
                <button onClick={() => saveGrade(s.id, marks[s.id])} className="px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 transition cursor-pointer">Save Grade</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

// --- MAIN DASHBOARD ---

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [studentList, setStudentList] = useState([]); 
  const [newStudentName, setNewStudentName] = useState("");
  const [chartData, setChartData] = useState([]);
  
  // NEW: State for real-time data
  const [teacherName, setTeacherName] = useState('Teacher');
  const [currentDateTime, setCurrentDateTime] = useState('');
  
  const navigate = useNavigate();

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/users');
      const data = await res.json();
      // Filter so Teachers don't show up in the student list!
      const studentsOnly = data.filter(u => u.role === 'STUDENT');
      setStudentList(studentsOnly);
    } catch (e) { console.error(e); }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/grades/analytics/class-average');
      const data = await res.json();
      const formatted = Object.keys(data).map(key => ({ name: key, avg: data[key] }));
      setChartData(formatted);
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    // 1. Fetch real teacher name from Login
    const storedName = localStorage.getItem('edutrack_userName');
    if (storedName) setTeacherName(storedName);

    // 2. Real-Time Clock
    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
      setCurrentDateTime(now.toLocaleString('en-US', options));
    };

    updateTime(); 
    const timerId = setInterval(updateTime, 60000); 

    fetchStudents();
    fetchAnalytics();

    return () => clearInterval(timerId); // Cleanup clock
  }, []);

  const enrollStudent = async () => {
    if (!newStudentName.trim()) return alert("Enter name");
    try {
      const res = await fetch('http://localhost:8080/api/users/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newStudentName })
      });
      if (res.ok) { setNewStudentName(""); fetchStudents(); alert("Enrolled!"); }
    } catch (e) { alert("Failed"); }
  };

  const removeStudent = async (id) => {
    if (!window.confirm("Remove?")) return;
    try {
      await fetch(`http://localhost:8080/api/users/delete/${id}`, { method: 'DELETE' });
      fetchStudents(); fetchAnalytics();
    } catch (e) { alert("Failed"); }
  };

  const markRealTime = async (studentId, status) => {
    try {
      const res = await fetch('http://localhost:8080/api/attendance/mark', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: studentId, status: status, classId: 101 }),
      });
      if (res.ok) alert(`${status} marked!`);
    } catch (e) { alert("Failed"); }
  };

  const saveGrade = async (studentId, studentMarks) => {
    const payload = {
      userId: studentId, classId: 101,
      quiz: parseInt(studentMarks?.quiz || 0),
      midterm: parseInt(studentMarks?.midterm || 0),
      assignment: parseInt(studentMarks?.assignment || 0),
      role: "TEACHER" 
    };
    try {
      const res = await fetch('http://localhost:8080/api/grades/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) { alert("Saved!"); fetchAnalytics(); }
    } catch (e) { alert("Error"); }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-left">
      <aside className="w-64 bg-indigo-950 text-white flex flex-col fixed h-full z-10">
        <div className="p-8 flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-black italic">E</div>
          <span className="text-xl font-black tracking-tighter">EduTrack</span>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4 flex flex-col">
          {['Dashboard', 'My Classes', 'Attendance', 'Grade Book', 'Assignments', 'Reports', 'Settings'].map((item) => (
            <button key={item} onClick={() => setActiveTab(item)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                activeTab === item ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-indigo-300 hover:bg-white/5'
              }`}
            > {item} </button>
          ))}
          <button onClick={handleLogout} className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all mt-auto mb-8 cursor-pointer">Logout 🚪</button>
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            {/* UPDATED: Dynamic Name */}
            <h1 className="text-3xl font-black text-indigo-950 uppercase tracking-wide">Good morning, {teacherName}!</h1>
            {/* UPDATED: Dynamic Date & Time */}
            <p className="text-gray-500 font-bold text-sm mt-1">{currentDateTime}</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gray-200 rounded-full overflow-hidden border-2 border-white shadow-md">
               <img src={`https://ui-avatars.com/api/?name=${teacherName}&background=e0e7ff&color=4f46e5`} alt="Profile" />
            </div>
          </div>
        </header>

        {activeTab === 'Dashboard' && <DashboardHome studentList={studentList} chartData={chartData} setActiveTab={setActiveTab} />}
        {activeTab === 'Attendance' && <AttendanceView studentList={studentList} newStudentName={newStudentName} setNewStudentName={setNewStudentName} enrollStudent={enrollStudent} markRealTime={markRealTime} removeStudent={removeStudent} />}
        {activeTab === 'Grade Book' && <GradeBookView studentList={studentList} saveGrade={saveGrade} />}
        
        {!['Dashboard', 'Attendance', 'Grade Book'].includes(activeTab) && (
          <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
            <h2 className="text-2xl font-black text-gray-300 uppercase tracking-widest">{activeTab} Coming Soon</h2>
            <p className="text-gray-400 mt-2">Linking to edutrack_db...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;