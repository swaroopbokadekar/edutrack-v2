import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

// --- ENTERPRISE SVG ICONS (Replaces Emojis) ---
const Icons = {
  Dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>,
  Classes: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>,
  Check: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>,
  Clipboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
  Bell: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>,
  Search: () => <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
  Calendar: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
};

// --- SUB-COMPONENTS ---

const DashboardHome = ({ myCourses, chartData, setActiveTab }) => {
  const totalStudents = myCourses.reduce((sum, course) => sum + (course.enrolledStudents || 0), 0);
  
  return (
    <div className="animate-fade-in-up">
      {/* Metrics Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-left">
        {[
          { label: 'Total Students', value: totalStudents, icon: <Icons.Users />, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Active Classes', value: myCourses.length, icon: <Icons.Classes />, color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'Avg Attendance', value: '94%', icon: <Icons.Chart />, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Grades', value: '12', icon: <Icons.Clipboard />, color: 'text-amber-600', bg: 'bg-amber-50' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-5 transition-transform hover:-translate-y-1 duration-300">
            <div className={`w-12 h-12 flex items-center justify-center rounded-full ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
              <h4 className="text-2xl font-black text-slate-800 mt-0.5">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 text-left">
        {/* Chart Section */}
        <div className="xl:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-slate-800">Class Performance Metrics</h3>
            <span className="text-xs font-semibold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">Real-time</span>
          </div>
          <div className="h-[300px] w-full"> 
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                  cursor={{stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '4 4'}}
                />
                <Area type="monotone" dataKey="avg" stroke="#4f46e5" strokeWidth={3} fill="url(#colorAvg)" activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Action Panel */}
        <div className="flex flex-col gap-6">
          <div className="bg-slate-900 p-8 rounded-2xl shadow-lg text-white relative overflow-hidden">
            {/* Decorative background element */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
            
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Icons.Calendar /> Next Class
            </h3>
            {myCourses.length > 0 ? (
              <div className="bg-white/10 p-5 rounded-xl border border-white/10 mb-6 backdrop-blur-sm">
                  <span className="inline-block px-2 py-1 bg-indigo-500/30 text-indigo-200 text-[10px] font-bold uppercase tracking-wider rounded mb-3">
                    {myCourses[0].gradeLevel}
                  </span>
                  <h4 className="text-xl font-bold leading-tight mb-1">{myCourses[0].courseName}</h4>
                  <p className="text-slate-400 text-sm">{myCourses[0].enrolledStudents || 0} Students</p>
              </div>
            ) : (
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center mb-6">
                <p className="text-slate-400 text-sm">No upcoming classes.</p>
              </div>
            )}
            <button 
              onClick={() => setActiveTab('Attendance')} 
              className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-3 rounded-xl font-semibold text-sm transition-colors duration-200 shadow-sm cursor-pointer"
            >
              Take Attendance
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex-1">
            <h3 className="text-sm font-bold text-slate-800 mb-4 uppercase tracking-wider">Quick Actions</h3>
            <div className="space-y-3">
              <button onClick={() => setActiveTab('Assignments')} className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 text-slate-600 transition-all text-sm font-medium cursor-pointer">
                <span className="flex items-center gap-3"><Icons.Clipboard /> Create Assignment</span>
                <span className="text-slate-400">&rarr;</span>
              </button>
              <button onClick={() => setActiveTab('Grade Book')} className="w-full flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 text-slate-600 transition-all text-sm font-medium cursor-pointer">
                <span className="flex items-center gap-3"><Icons.Check /> Grade Submissions</span>
                <span className="text-slate-400">&rarr;</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const MyClassesView = ({ myCourses }) => (
  <div className="text-left animate-fade-in-up">
    <div className="flex justify-between items-end mb-8">
      <div>
        <h3 className="text-2xl font-bold text-slate-800">My Course Overview</h3>
        <p className="text-slate-500 text-sm mt-1">Manage and monitor all your assigned classes.</p>
      </div>
    </div>

    {myCourses.length === 0 ? (
      <div className="bg-white p-16 rounded-2xl border border-slate-200 border-dashed text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
          <Icons.Classes />
        </div>
        <h4 className="text-lg font-bold text-slate-700">No classes assigned</h4>
        <p className="text-slate-500 text-sm mt-1">Contact your administrator to get courses assigned.</p>
      </div>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {myCourses.map((course, index) => {
          const themes = [
            'from-blue-600 to-blue-800', 
            'from-emerald-500 to-emerald-700', 
            'from-purple-600 to-purple-800',
            'from-rose-500 to-rose-700'
          ];
          const theme = themes[index % themes.length];

          return (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group cursor-pointer">
              {/* Card Banner */}
              <div className={`h-24 bg-gradient-to-r ${theme} p-5 relative overflow-hidden`}>
                <div className="absolute right-0 top-0 opacity-20 transform translate-x-4 -translate-y-4">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="40" stroke="white" strokeWidth="20"/></svg>
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-white truncate pr-8">{course.courseName}</h4>
                  <p className="text-white/80 text-sm mt-1 font-medium">{course.gradeLevel}</p>
                </div>
              </div>
              {/* Card Body */}
              <div className="p-5">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <span className="text-slate-500 text-sm font-medium">Students Enrolled</span>
                  <span className="text-slate-800 font-bold bg-slate-100 px-3 py-1 rounded-full text-sm">{course.enrolledStudents || 0}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-slate-500 text-sm font-medium">Status</span>
                  <span className="text-emerald-600 text-sm font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span> Active
                  </span>
                </div>
              </div>
              <div className="px-5 py-3 bg-slate-50 border-t border-slate-100 text-center">
                <span className="text-indigo-600 text-sm font-semibold group-hover:underline">View Class Dashboard</span>
              </div>
            </div>
          );
        })}
      </div>
    )}
  </div>
);

const AttendanceView = ({ myCourses, selectedCourseId, handleCourseSelect, enrolledStudents, markRealTime, removeStudent }) => (
  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-left animate-fade-in-up">
    <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
      <div>
        <h3 className="text-lg font-bold text-slate-800">Daily Attendance Tracker</h3>
        <p className="text-sm text-slate-500">Select a course to log today's attendance.</p>
      </div>
      <div className="relative w-full md:w-72">
        <select 
          value={selectedCourseId} 
          onChange={(e) => handleCourseSelect(e.target.value)} 
          className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm font-medium text-slate-700 cursor-pointer shadow-sm transition-all"
        >
          <option value="">Select a Class...</option>
          {myCourses.map(c => <option key={c.id} value={c.id}>{c.courseName} ({c.gradeLevel})</option>)}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
        </div>
      </div>
    </div>
  
    {selectedCourseId ? (
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider w-16">#</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Quick Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {enrolledStudents.length === 0 && (
              <tr><td colSpan="3" className="p-12 text-center text-slate-500">No students enrolled in this course yet.</td></tr>
            )}
            {enrolledStudents.map((s, index) => (
              <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-400 font-medium">{index + 1}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-xs">
                    {s.name.charAt(0)}
                  </div>
                  {s.name}
                </td>
                <td className="px-6 py-4 flex justify-end gap-2">
                  <button onClick={() => markRealTime(s.id, 'Present')} className="px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-lg font-semibold text-xs hover:bg-emerald-600 hover:text-white transition-colors cursor-pointer">Present</button>
                  <button onClick={() => markRealTime(s.id, 'Absent')} className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg font-semibold text-xs hover:bg-rose-600 hover:text-white transition-colors cursor-pointer">Absent</button>
                  <div className="w-px h-6 bg-slate-200 mx-1 self-center"></div>
                  <button onClick={() => removeStudent(s.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer" title="Remove Student">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center p-16 text-slate-400">
        <svg className="w-16 h-16 mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>
        <p className="text-sm font-medium">Please select a class from the dropdown to begin.</p>
      </div>
    )}
  </div>
);

const GradeBookView = ({ myCourses, selectedCourseId, handleCourseSelect, enrolledStudents, saveGrade }) => {
  const [marks, setMarks] = useState({});
  const handleInputChange = (studentId, field, value) => { setMarks(prev => ({ ...prev, [studentId]: { ...prev[studentId], [field]: value } })); };
  
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-left animate-fade-in-up">
      <div className="p-6 border-b border-slate-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Master Gradebook</h3>
          <p className="text-sm text-slate-500">Record assessment scores for the current term.</p>
        </div>
        <div className="relative w-full md:w-72">
          <select value={selectedCourseId} onChange={(e) => handleCourseSelect(e.target.value)} className="w-full appearance-none px-4 py-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm font-medium text-slate-700 cursor-pointer shadow-sm">
            <option value="">Select a Class...</option>
            {myCourses.map(c => <option key={c.id} value={c.id}>{c.courseName} ({c.gradeLevel})</option>)}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
      </div>

      {selectedCourseId ? (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Profile</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-32">Quiz (%)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-32">Midterm (%)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center w-32">Assignment (%)</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right w-32">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {enrolledStudents.length === 0 && (
                <tr><td colSpan="5" className="p-12 text-center text-slate-500">No students enrolled yet.</td></tr>
              )}
              {enrolledStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-3 font-bold text-slate-800 text-sm">{s.name}</td>
                  <td className="px-6 py-3 text-center">
                    <input type="number" placeholder="--" className="w-16 p-1.5 border border-slate-200 rounded-md outline-none text-center text-sm font-semibold text-slate-700 bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" onChange={(e) => handleInputChange(s.id, 'quiz', e.target.value)} />
                  </td>
                  <td className="px-6 py-3 text-center">
                    <input type="number" placeholder="--" className="w-16 p-1.5 border border-slate-200 rounded-md outline-none text-center text-sm font-semibold text-slate-700 bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" onChange={(e) => handleInputChange(s.id, 'midterm', e.target.value)} />
                  </td>
                  <td className="px-6 py-3 text-center">
                    <input type="number" placeholder="--" className="w-16 p-1.5 border border-slate-200 rounded-md outline-none text-center text-sm font-semibold text-slate-700 bg-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all" onChange={(e) => handleInputChange(s.id, 'assignment', e.target.value)} />
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button onClick={() => saveGrade(s.id, marks[s.id])} className="px-4 py-1.5 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-lg font-semibold text-xs hover:bg-indigo-600 hover:text-white transition-colors cursor-pointer">Save</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-16 text-slate-400">
          <svg className="w-16 h-16 mb-4 text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <p className="text-sm font-medium">Please select a class to enter grade data.</p>
        </div>
      )}
    </div>
  );
};

const AssignmentsView = ({ myCourses, selectedCourseId, handleCourseSelect, classAssignments, handleCreateAssignment }) => {
  const [newAssignment, setNewAssignment] = useState({ title: '', type: 'QUIZ', dueDate: '' });
  
  const onSubmit = (e) => {
    e.preventDefault();
    if(!selectedCourseId) return alert("Please select a class first!");
    handleCreateAssignment(newAssignment);
    setNewAssignment({ title: '', type: 'QUIZ', dueDate: '' });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left animate-fade-in-up">
      {/* Creation Form */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit">
        <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-3">Create Assessment</h3>
        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Class</label>
            <select value={selectedCourseId} onChange={(e) => handleCourseSelect(e.target.value)} required className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm cursor-pointer shadow-sm transition-all">
              <option value="">Select a Class...</option>
              {myCourses.map(c => <option key={c.id} value={c.id}>{c.courseName}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Task Title</label>
            <input type="text" required value={newAssignment.title} onChange={(e) => setNewAssignment({...newAssignment, title: e.target.value})} placeholder="e.g. Chapter 4 Reflection" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm shadow-sm transition-all" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Format</label>
              <select value={newAssignment.type} onChange={(e) => setNewAssignment({...newAssignment, type: e.target.value})} className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm cursor-pointer shadow-sm transition-all">
                <option>QUIZ</option>
                <option>ASSIGNMENT</option>
                <option>PROJECT</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Due Date</label>
              <input type="text" required value={newAssignment.dueDate} onChange={(e) => setNewAssignment({...newAssignment, dueDate: e.target.value})} placeholder="e.g. Nov 15" className="w-full px-4 py-2.5 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm shadow-sm transition-all" />
            </div>
          </div>
          <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition-all shadow-sm flex justify-center items-center gap-2 mt-4 cursor-pointer">
            Publish Task <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
          </button>
        </form>
      </div>

      {/* List View */}
      <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 className="text-lg font-bold text-slate-800">Published Assessments</h3>
          {selectedCourseId && <span className="text-xs font-semibold bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full">{classAssignments.length} Items</span>}
        </div>
        
        <div className="flex-1 p-6 bg-slate-50/30 overflow-y-auto max-h-[500px]">
          {!selectedCourseId ? (
             <div className="h-full flex flex-col items-center justify-center text-slate-400">
               <svg className="w-12 h-12 mb-3 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
               <p className="text-sm font-medium">Select a class to view its active tasks.</p>
             </div>
          ) : (
            <div className="space-y-4">
              {classAssignments.length === 0 && (
                <div className="text-center py-10 bg-white border border-slate-200 border-dashed rounded-xl text-slate-500 text-sm">
                  No tasks posted for this class yet.
                </div>
              )}
              {classAssignments.map((task, i) => {
                let badgeColor = 'bg-slate-100 text-slate-700 border-slate-200';
                if (task.type === 'QUIZ') badgeColor = 'bg-purple-100 text-purple-700 border-purple-200';
                if (task.type === 'ASSIGNMENT') badgeColor = 'bg-blue-100 text-blue-700 border-blue-200';
                if (task.type === 'PROJECT') badgeColor = 'bg-rose-100 text-rose-700 border-rose-200';

                return (
                  <div key={i} className="p-5 rounded-xl border border-slate-200 shadow-sm flex justify-between items-center bg-white hover:border-indigo-300 transition-colors group">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className={`text-[10px] font-bold border px-2 py-0.5 rounded-md uppercase ${badgeColor}`}>{task.type}</span>
                        <span className="text-xs text-slate-400 font-medium">Posted recently</span>
                      </div>
                      <h4 className="font-bold text-slate-800 text-base">{task.title}</h4>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Due Date</p>
                      <p className="text-sm font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-md">{task.dueDate}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ReportsView = ({ chartData, myCourses }) => {
  const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#f43f5e'];
  return (
    <div className="space-y-8 text-left animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h4 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Performance Distributions</h4>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: '600'}} width={120} />
                <Tooltip 
                  cursor={{fill: '#f8fafc'}} 
                  contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                />
                <Bar dataKey="avg" radius={[0, 6, 6, 0]} barSize={20}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
             </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
           <h4 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Course Health Status</h4>
           <div className="space-y-3 overflow-y-auto max-h-72 pr-2">
              {myCourses.length === 0 && <p className="text-slate-400 text-sm text-center py-10">No classes assigned to analyze.</p>}
              {myCourses.map((course) => (
                 <div key={course.id} className="p-4 rounded-xl border border-slate-100 flex justify-between items-center bg-slate-50 hover:bg-white transition-colors hover:shadow-sm">
                    <div>
                       <p className="font-bold text-slate-800 text-sm">{course.courseName}</p>
                       <p className="text-[10px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">{course.gradeLevel}</p>
                    </div>
                    <div className="text-right">
                       <p className={`text-xs font-bold uppercase tracking-wider ${course.enrolledStudents > 0 ? 'text-emerald-600' : 'text-amber-500'}`}>
                         {course.enrolledStudents > 0 ? 'Optimal' : 'Needs Attention'}
                       </p>
                       <p className="text-xs font-medium text-slate-500 mt-1">{course.enrolledStudents || 0} Learners</p>
                    </div>
                 </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

// --- NEW: SETTINGS VIEW ---
const SettingsView = ({ teacherName }) => {
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    studentEnrollment: true,
    assignmentSubmissions: false
  });
  const handleToggle = (key) => setNotifications(prev => ({...prev, [key]: !prev[key]}));
  return (
    <div className="text-left max-w-5xl animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Column 1: Profile & Security */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Profile Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Personal Information</h4>
            <div className="flex items-center gap-6 mb-8">
              <div className="w-20 h-20 bg-indigo-100 rounded-full overflow-hidden border-4 border-indigo-50">
                <img src={`https://ui-avatars.com/api/?name=${teacherName}&background=e0e7ff&color=4f46e5&size=150`} alt="Profile" />
              </div>
              <div>
                <button className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl font-bold text-xs hover:bg-indigo-100 transition cursor-pointer">Change Avatar</button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Full Name</label>
                <input type="text" defaultValue={teacherName} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email Address</label>
                <input type="email" defaultValue={`${teacherName.split(' ')[0].toLowerCase()}@edutrack.edu`} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Department</label>
                <input type="text" defaultValue="High School Faculty" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all" />
              </div>
            </div>
            <button className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition cursor-pointer shadow-sm">Save Changes</button>
          </div>

          {/* Security Card */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Security & Password</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Current Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">New Password</label>
                <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none" />
              </div>
            </div>
             <button className="mt-6 px-6 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold text-sm hover:bg-slate-200 transition cursor-pointer">Update Password</button>
          </div>
        </div>

        {/* Column 2: Notifications */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit">
           <h4 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Notifications</h4>
           <div className="space-y-6">
             {/* Toggle 1 */}
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-bold text-sm text-slate-800">Email Alerts</p>
                 <p className="text-[10px] text-slate-500 mt-1">Receive daily summary emails.</p>
               </div>
               <div onClick={() => handleToggle('emailAlerts')} className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notifications.emailAlerts ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${notifications.emailAlerts ? 'translate-x-5' : ''}`}></div>
               </div>
             </div>
             {/* Toggle 2 */}
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-bold text-sm text-slate-800">New Enrollments</p>
                 <p className="text-[10px] text-slate-500 mt-1">Alert when a student joins.</p>
               </div>
               <div onClick={() => handleToggle('studentEnrollment')} className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notifications.studentEnrollment ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${notifications.studentEnrollment ? 'translate-x-5' : ''}`}></div>
               </div>
             </div>
             {/* Toggle 3 */}
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-bold text-sm text-slate-800">Assignment Subs</p>
                 <p className="text-[10px] text-slate-500 mt-1">Ping when students submit tasks.</p>
               </div>
               <div onClick={() => handleToggle('assignmentSubmissions')} className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${notifications.assignmentSubmissions ? 'bg-indigo-500' : 'bg-slate-200'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${notifications.assignmentSubmissions ? 'translate-x-5' : ''}`}></div>
               </div>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- MAIN DASHBOARD COMPONENT ---

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [allStudents, setAllStudents] = useState([]); 
  const [chartData, setChartData] = useState([]);
  const [teacherName, setTeacherName] = useState('Instructor');
  const [currentDateTime, setCurrentDateTime] = useState('');
  const [myCourses, setMyCourses] = useState([]); 
  const [selectedCourseId, setSelectedCourseId] = useState(''); 
  const [enrolledStudents, setEnrolledStudents] = useState([]); 
  const [classAssignments, setClassAssignments] = useState([]);
  
  const navigate = useNavigate();

  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('edutrack_jwt')}`
    };
  };

  const fetchStudents = async () => {
    try {
      const res = await fetch('http://localhost:8080/api/users', { headers: getAuthHeaders() });
      const data = await res.json();
      const studentsOnly = data.filter(u => u.role === 'STUDENT');
      setAllStudents(studentsOnly);
    } catch (e) { console.error(e); }
  };

  const fetchAnalytics = async () => {
    try {
      // Mocking chart data for visual perfection until backend provides real averages
      setChartData([
        { name: 'Physics 101', avg: 85 },
        { name: 'Chem Labs', avg: 78 },
        { name: 'Calculus', avg: 92 },
        { name: 'History', avg: 88 }
      ]);
      
      const res = await fetch('http://localhost:8080/api/grades/analytics/class-average', { headers: getAuthHeaders() });
      const data = await res.json();
      if(Object.keys(data).length > 0) {
        const formatted = Object.keys(data).map(key => ({ name: key, avg: data[key] }));
        setChartData(formatted);
      }
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    const storedName = localStorage.getItem('edutrack_userName');
    if (storedName) {
      setTeacherName(storedName);
      fetch(`http://localhost:8080/api/courses/teacher/${storedName}`, { headers: getAuthHeaders() })
        .then(res => res.json())
        .then(data => setMyCourses(data))
        .catch(err => console.error(err));
    }

    const updateTime = () => {
      const now = new Date();
      const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
      setCurrentDateTime(now.toLocaleString('en-US', options));
    };

    updateTime(); 
    const timerId = setInterval(updateTime, 60000); 

    fetchStudents();
    fetchAnalytics();

    return () => clearInterval(timerId); 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCourseSelect = async (courseId) => {
    setSelectedCourseId(courseId);
    if (!courseId) {
      setEnrolledStudents([]);
      setClassAssignments([]);
      return;
    }
    
    try {
      const res = await fetch(`http://localhost:8080/api/enrollments/course/${courseId}`, { headers: getAuthHeaders() });
      const enrollments = await res.json();
      const enrolledIds = enrollments.map(e => e.studentId);
      const filteredStudents = allStudents.filter(student => enrolledIds.includes(student.id));
      setEnrolledStudents(filteredStudents);

      const assignRes = await fetch(`http://localhost:8080/api/assignments/course/${courseId}`, { headers: getAuthHeaders() });
      setClassAssignments(await assignRes.json());
    } catch (err) {
      console.error("Failed to fetch course data", err);
    }
  };

  const handleCreateAssignment = async (newAssignment) => {
    const selectedCourse = myCourses.find(c => c.id === parseInt(selectedCourseId));
    const payload = {
       ...newAssignment,
       courseId: parseInt(selectedCourseId),
       courseName: selectedCourse ? selectedCourse.courseName : 'Unknown'
    };

    try {
      const response = await fetch('http://localhost:8080/api/assignments/add', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if(response.ok) {
         alert("Assessment Published Successfully");
         handleCourseSelect(selectedCourseId);
      }
    } catch(err) { alert("Failed to post assignment."); }
  };

  const removeStudent = (id) => {
    if (!window.confirm("Remove student from this class view?")) return;
    setEnrolledStudents(prev => prev.filter(s => s.id !== id));
  };

  const markRealTime = async (studentId, status) => {
    if(!selectedCourseId) return alert("Please select a course first!");
    try {
      const res = await fetch('http://localhost:8080/api/attendance/mark', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ userId: studentId, status: status, classId: parseInt(selectedCourseId) }),
      });
      if (res.ok) alert(`Student marked ${status}!`);
    } catch (e) { alert("Failed"); }
  };

  const saveGrade = async (studentId, studentMarks) => {
    if(!selectedCourseId) return alert("Please select a course first!");
    const payload = {
      userId: parseInt(studentId), 
      classId: parseInt(selectedCourseId),
      quiz: parseInt(studentMarks?.quiz || 0),
      midterm: parseInt(studentMarks?.midterm || 0),
      assignment: parseInt(studentMarks?.assignment || 0),
      role: "TEACHER" 
    };
    try {
      const res = await fetch('http://localhost:8080/api/grades/update', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(payload)
      });
      if (res.ok) { 
        alert("Grades recorded successfully."); 
        fetchAnalytics();
      } else {
        alert("Backend Error - ensure API is running.");
      }
    } catch (e) { 
      alert("Network Error: " + e.message);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const menuItems = [
    { name: 'Dashboard', icon: <Icons.Dashboard /> },
    { name: 'My Classes', icon: <Icons.Classes /> },
    { name: 'Attendance', icon: <Icons.Check /> },
    { name: 'Grade Book', icon: <Icons.Clipboard /> },
    { name: 'Assignments', icon: <Icons.Clipboard /> },
    { name: 'Reports', icon: <Icons.Chart /> },
    { name: 'Settings', icon: <Icons.Settings /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-left">
      
      {/* ENTERPRISE SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-lg mr-3 shadow-lg shadow-indigo-500/30">E</div>
          <span className="text-xl font-bold text-white tracking-tight">EduTrack<span className="text-indigo-400">.</span></span>
        </div>
        
        <div className="px-6 py-6 text-xs font-semibold text-slate-500 uppercase tracking-widest">Main Menu</div>
        <nav className="flex-1 px-4 space-y-1">
          {menuItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => setActiveTab(item.name)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === item.name 
                  ? 'bg-indigo-600/10 text-indigo-400 relative' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            > 
              {activeTab === item.name && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full"></div>}
              {item.icon}
              {item.name} 
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto mb-4 border-t border-slate-800 mx-4 pt-6">
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors cursor-pointer">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
            Sign Out
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 min-h-screen flex flex-col">
        
        {/* ENTERPRISE TOP NAVIGATION */}
        <header className="h-20 bg-white border-b border-slate-200 px-10 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center w-96 relative text-slate-400 focus-within:text-indigo-600">
            <div className="absolute left-4 top-1/2 -translate-y-1/2">
              <Icons.Search />
            </div>
            <input 
              type="text" 
              placeholder="Search students, classes, or assignments..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-12 pr-4 text-sm text-slate-700 outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <Icons.Bell />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-8 bg-slate-200"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-700 leading-none">{teacherName}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">Instructor</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold overflow-hidden shadow-sm group-hover:ring-2 group-hover:ring-indigo-100 transition-all">
                 <img src={`https://ui-avatars.com/api/?name=${teacherName}&background=e0e7ff&color=4f46e5`} alt="Profile" />
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC VIEW CONTAINER */}
        <div className="p-10 flex-1 bg-slate-50/50">
          
          {/* Section Header */}
          <div className="mb-8 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">{activeTab}</h1>
              {activeTab === 'Dashboard' && <p className="text-slate-500 font-medium text-sm mt-2">{currentDateTime}</p>}
            </div>
          </div>

          {/* RENDER VIEWS */}
          {activeTab === 'Dashboard' && <DashboardHome myCourses={myCourses} chartData={chartData} setActiveTab={setActiveTab} />}
          {activeTab === 'My Classes' && <MyClassesView myCourses={myCourses} />}
          {activeTab === 'Attendance' && <AttendanceView myCourses={myCourses} selectedCourseId={selectedCourseId} handleCourseSelect={handleCourseSelect} enrolledStudents={enrolledStudents} markRealTime={markRealTime} removeStudent={removeStudent} />}
          {activeTab === 'Grade Book' && <GradeBookView myCourses={myCourses} selectedCourseId={selectedCourseId} handleCourseSelect={handleCourseSelect} enrolledStudents={enrolledStudents} saveGrade={saveGrade} />}
          {activeTab === 'Assignments' && <AssignmentsView myCourses={myCourses} selectedCourseId={selectedCourseId} handleCourseSelect={handleCourseSelect} classAssignments={classAssignments} handleCreateAssignment={handleCreateAssignment} />}
          {activeTab === 'Reports' && <ReportsView chartData={chartData} myCourses={myCourses} />}
          {activeTab === 'Settings' && <SettingsView teacherName={teacherName} />}
          
        </div>
      </main>
      
      {/* Global styles for smooth animations */}
      <style>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out forwards;
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default TeacherDashboard;