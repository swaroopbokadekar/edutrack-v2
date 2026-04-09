import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const navigate = useNavigate();

  // Mock Data
  const chartData = [
    { name: 'Quiz 1', avg: 85 }, { name: 'Midterm', avg: 78 },
    { name: 'Quiz 2', avg: 92 }, { name: 'Final', avg: 88 },
  ];

  const students = [
    { id: 1, name: 'Onkar B.', quiz: 92, midterm: 88, assignment: 95, total: 91, grade: 'A' },
    { id: 2, name: 'Jayesh S.', quiz: 82, midterm: 75, assignment: 80, total: 79, grade: 'C' },
    { id: 3, name: 'Abhishek K.', quiz: 70, midterm: 65, assignment: 72, total: 69, grade: 'D' },
    { id: 4, name: 'Swaroop P.', quiz: 85, midterm: 82, assignment: 88, total: 85, grade: 'B' },
  ];

  const getGradeColor = (grade) => {
    switch (grade) {
      case 'A': return 'bg-green-100 text-green-700 border-green-200';
      case 'B': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'C': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'D': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  // --- SUB-COMPONENTS FOR DIFFERENT TABS ---

  const DashboardHome = () => (
    <>
      <div className="grid grid-cols-4 gap-6 mb-10">
        {[
          { label: 'Total Students', value: '124', icon: '👥' },
          { label: 'Classes Today', value: '04', icon: '🏫' },
          { label: 'Avg Attendance', value: '94%', icon: '📈' },
          { label: 'Pending Grading', value: '18', icon: '📝' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="text-3xl bg-gray-50 w-14 h-14 flex items-center justify-center rounded-2xl">{stat.icon}</div>
            <div className="text-left">
              <p className="text-gray-400 text-xs font-black uppercase tracking-widest">{stat.label}</p>
              <h4 className="text-2xl font-black text-indigo-950">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-8 mb-10">
        <div className="col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100">
          <h3 className="text-xl font-black mb-6 text-indigo-950 text-left">Class Performance</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontWeight: 700, fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="avg" fill="#4f46e5" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        <div className="bg-indigo-900 p-8 rounded-[2.5rem] shadow-xl text-white text-left">
          <h3 className="text-xl font-black mb-6">Next Class</h3>
          <div className="bg-white/10 p-6 rounded-3xl border border-white/10 mb-4">
              <p className="text-indigo-300 text-xs font-bold uppercase mb-1">Mathematics (SPED)</p>
              <h4 className="text-lg font-black">Room 104 • 10:30 AM</h4>
              <p className="text-indigo-200 text-sm mt-2 font-medium">14 Students attending</p>
          </div>
          <button className="w-full bg-white text-indigo-950 py-3 rounded-xl font-black text-sm mt-4 hover:bg-indigo-50 transition cursor-pointer">Take Attendance</button>
        </div>
      </div>
    </>
  );

  const AttendanceView = () => (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden text-left p-8">
      <h3 className="text-2xl font-black text-indigo-950 mb-6">Daily Attendance Marking</h3>
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
          <tr>
            <th className="px-8 py-4">Student Name</th>
            <th className="px-8 py-4 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {students.map((s) => (
            <tr key={s.id}>
              <td className="px-8 py-5 font-bold text-indigo-950">{s.name}</td>
              <td className="px-8 py-5 flex justify-center gap-3">
                <button className="px-4 py-1 bg-green-100 text-green-700 rounded-lg font-bold text-xs hover:bg-green-200">Present</button>
                <button className="px-4 py-1 bg-red-100 text-red-700 rounded-lg font-bold text-xs hover:bg-red-200">Absent</button>
                <button className="px-4 py-1 bg-yellow-100 text-yellow-700 rounded-lg font-bold text-xs hover:bg-yellow-200">Late</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const GradeBookView = () => (
    <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-8 border-b border-gray-50 flex justify-between items-center text-left">
        <h3 className="text-xl font-black text-indigo-950">Grade Book - Semester 1</h3>
        <button className="text-indigo-600 font-bold text-sm cursor-pointer">View Full Report →</button>
      </div>
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-gray-400 text-[10px] font-black uppercase tracking-widest">
          <tr>
            <th className="px-8 py-4">Student</th>
            <th className="px-8 py-4">Quiz</th>
            <th className="px-8 py-4">Midterm</th>
            <th className="px-8 py-4">Assignment</th>
            <th className="px-8 py-4 text-center">Final Grade</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {students.map((s) => (
            <tr key={s.id} className="hover:bg-gray-50/50 transition">
              <td className="px-8 py-5 font-bold text-indigo-950">{s.name}</td>
              <td className="px-8 py-5 text-gray-500 font-medium">{s.quiz}%</td>
              <td className="px-8 py-5 text-gray-500 font-medium">{s.midterm}%</td>
              <td className="px-8 py-5 text-gray-500 font-medium">{s.assignment}%</td>
              <td className="px-8 py-5 text-center">
                <span className={`px-4 py-1 rounded-full text-xs font-black border ${getGradeColor(s.grade)}`}>
                  {s.grade} ({s.total}%)
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans">
      <aside className="w-64 bg-indigo-950 text-white flex flex-col fixed h-full">
        <div className="p-8 flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('Dashboard')}>
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center font-black italic">E</div>
          <span className="text-xl font-black tracking-tighter">EduTrack</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4 flex flex-col">
          {['Dashboard', 'My Classes', 'Attendance', 'Grade Book', 'Assignments', 'Reports', 'Settings'].map((item) => (
            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                activeTab === item ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-indigo-300 hover:bg-white/5'
              }`}
            >
              {item}
            </button>
          ))}
          <button onClick={() => navigate('/')} className="w-full flex items-center px-4 py-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition-all mt-auto mb-8">
            Logout 🚪
          </button>
        </nav>
      </aside>

      <main className="flex-1 ml-64 p-10">
        <header className="flex justify-between items-center mb-10 text-left">
          <div>
            <h1 className="text-3xl font-black text-indigo-950">Good morning, Swaroop!</h1>
            <p className="text-gray-500 font-bold text-sm mt-1">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          <div className="w-12 h-12 bg-indigo-100 rounded-full border-2 border-white shadow-md flex items-center justify-center font-bold text-indigo-600">SP</div>
        </header>

        {/* --- DYNAMIC CONTENT RENDERING --- */}
        {activeTab === 'Dashboard' && <DashboardHome />}
        {activeTab === 'Attendance' && <AttendanceView />}
        {activeTab === 'Grade Book' && <GradeBookView />}
        
        {/* Placeholder for other tabs */}
        {!['Dashboard', 'Attendance', 'Grade Book'].includes(activeTab) && (
          <div className="bg-white p-20 rounded-[3rem] text-center border border-dashed border-gray-200">
            <h2 className="text-2xl font-black text-gray-300 uppercase tracking-widest">{activeTab} Coming Soon</h2>
            <p className="text-gray-400 mt-2">We are currently linking this module to the MySQL database.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;