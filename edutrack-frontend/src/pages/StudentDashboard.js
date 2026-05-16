import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, ReferenceLine } from 'recharts';

// --- ENTERPRISE SVG ICONS ---
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

// --- Helper Components ---
const CircularProgress = ({ value, color, max = 100 }) => {
  const radius = 24;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(value / max, 1);
  const strokeDashoffset = circumference - percentage * circumference;
  
  return (
    <div className="relative flex items-center justify-center">
      <svg width="60" height="60" viewBox="0 0 60 60" className="transform -rotate-90">
        <circle cx="30" cy="30" r={radius} stroke="#f1f5f9" strokeWidth="5" fill="none" />
        <circle cx="30" cy="30" r={radius} stroke={color} strokeWidth="5" fill="none" strokeDasharray={circumference} strokeDashoffset={strokeDashoffset} strokeLinecap="round" className="transition-all duration-1000 ease-out" />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-slate-700">
        {Math.round((value/max)*100)}%
      </div>
    </div>
  );
};

const getBorderColor = (type) => {
  if (type === 'QUIZ') return 'border-indigo-500';
  if (type === 'ASSIGNMENT') return 'border-emerald-500';
  return 'border-rose-500';
};

const getTextColor = (type) => {
  if (type === 'QUIZ') return 'text-indigo-700 bg-indigo-50 border-indigo-100';
  if (type === 'ASSIGNMENT') return 'text-emerald-700 bg-emerald-50 border-emerald-100';
  return 'text-rose-700 bg-rose-50 border-rose-100';
};

const THEMES = [
  'from-blue-600 to-indigo-800', 
  'from-emerald-500 to-teal-700', 
  'from-purple-600 to-fuchsia-800',
  'from-rose-500 to-red-700',
  'from-amber-500 to-orange-700'
];

// --- SUB-COMPONENTS ---
const CourseCatalogView = ({ allCourses, myEnrollments, handleJoinCourse }) => {
  return (
    <div className="text-left animate-fade-in-up">
      <h3 className="text-2xl font-black text-slate-800 mb-2">Available Courses</h3>
      <p className="text-slate-500 text-sm mb-8">Browse and enroll in new modules for the current semester.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {allCourses.map((course, index) => {
          const isEnrolled = myEnrollments.some(e => e.courseId === course.id);
          const theme = THEMES[index % THEMES.length];
          
          return (
            <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all group flex flex-col h-full transform hover:-translate-y-1">
              <div className={`h-28 bg-gradient-to-r ${theme} p-5 relative overflow-hidden`}>
                <div className="absolute right-0 top-0 opacity-20 transform translate-x-4 -translate-y-4">
                  <svg width="100" height="100" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" strokeWidth="20"/></svg>
                </div>
                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <h4 className="text-xl font-bold text-white truncate pr-4">{course.courseName}</h4>
                    <p className="text-white/80 text-sm mt-1 font-medium">{course.gradeLevel}</p>
                  </div>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 mb-4 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shadow-sm">{course.teacherName.charAt(0)}</span>
                    Prof. {course.teacherName}
                  </p>
                  <div className="flex justify-between items-center py-3 border-t border-slate-100">
                    <span className="text-slate-500 text-sm font-medium">Enrolled</span>
                    <span className="text-slate-800 font-bold bg-slate-100 px-3 py-1 rounded-full text-sm">{course.enrolledStudents || 0}</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-slate-100">
                  {isEnrolled ? (
                    <button disabled className="w-full py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                      <Icons.Check /> Enrolled
                    </button>
                  ) : (
                    <button onClick={() => handleJoinCourse(course.id)} className="w-full py-2.5 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors cursor-pointer shadow-md hover:shadow-lg">
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const GradesView = ({ courses }) => (
  <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden text-left animate-fade-in-up">
    <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
      <div>
        <h3 className="text-2xl font-black text-slate-800">Academic Transcript</h3>
        <p className="text-sm text-slate-500 mt-1">Your official performance across all enrolled courses.</p>
      </div>
      <span className="px-4 py-1.5 bg-white shadow-sm text-indigo-700 rounded-full text-sm font-bold border border-slate-200">Semester 8</span>
    </div>
    <div className="overflow-x-auto p-4">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">Subject</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center border-b border-slate-100">Quiz Avg</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center border-b border-slate-100">Midterm</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center border-b border-slate-100">Assignments</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-center border-b border-slate-100">Overall</th>
            <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right border-b border-slate-100">Grade</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {courses.map((c, i) => (
            <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
              <td className="px-6 py-5">
                <p className="font-bold text-slate-800 text-base">{c.subject}</p>
                <p className="text-xs text-slate-500 mt-1">{c.teacher}</p>
              </td>
              <td className="px-6 py-5 text-center font-medium text-slate-500">{c.score > 0 ? c.score : '-'}</td>
              <td className="px-6 py-5 text-center font-medium text-slate-500">{c.score > 0 ? c.score : '-'}</td>
              <td className="px-6 py-5 text-center font-medium text-slate-500">{c.score > 0 ? c.score : '-'}</td>
              <td className="px-6 py-5 text-center font-black text-slate-800 text-lg">{c.score}%</td>
              <td className="px-6 py-5 text-right">
                <span className={`w-10 py-2 inline-block rounded-lg text-center text-sm font-bold shadow-sm border ${c.bg} ${c.hex} border-${c.bg.replace('bg-', '')}`}>{c.grade}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const CalendarView = ({ myAssignments }) => (
  <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200 text-left max-w-4xl animate-fade-in-up">
    <h3 className="text-2xl font-black text-slate-800 mb-2">Schedule & Deadlines</h3>
    <p className="text-slate-500 mb-10 text-sm">Stay on top of your upcoming tasks across all enrolled courses.</p>
    
    {myAssignments.length === 0 ? (
      <div className="p-16 text-center text-slate-400 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/50">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-slate-100 text-indigo-300">
          <Icons.Calendar />
        </div>
        <p className="text-lg font-bold text-slate-600">No upcoming deadlines!</p>
        <p className="text-sm mt-2">Enjoy your free time, you're all caught up.</p>
      </div>
    ) : (
      <div className="relative border-l-2 border-slate-200 ml-6 space-y-8 py-2">
        {myAssignments.map((task, i) => {
          let dotColor = 'border-indigo-500 bg-indigo-100';
          if (task.type === 'ASSIGNMENT') dotColor = 'border-emerald-500 bg-emerald-100';
          if (task.type === 'PROJECT') dotColor = 'border-rose-500 bg-rose-100';
          return (
            <div key={i} className="relative pl-10 group">
              <div className={`absolute -left-[11px] top-6 w-5 h-5 rounded-full border-4 shadow-sm transition-transform group-hover:scale-125 ${dotColor}`}></div>
              <div className={`p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 ${getBorderColor(task.type)} bg-white hover:shadow-md hover:-translate-y-1 transition-all duration-300`}>
                <div className="flex justify-between items-start">
                  <div>
                    <span className={`text-[10px] font-bold border px-3 py-1 rounded-lg uppercase tracking-widest shadow-sm ${getTextColor(task.type)}`}>{task.type}</span>
                    <h4 className="font-bold text-slate-800 text-lg mt-3">{task.title}</h4>
                    <p className="text-sm font-medium text-slate-500 mt-2 flex items-center gap-2">
                      <span className="text-slate-400"><Icons.Classes /></span> {task.courseName}
                    </p>
                  </div>
                  <div className="text-right bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-inner">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-1">Due Date</p>
                    <p className="font-black text-slate-800 text-base">{task.dueDate}</p>
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
  <div className="space-y-8 text-left animate-fade-in-up">
    <h3 className="text-2xl font-black text-slate-800 mb-6">Attendance Records</h3>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h4 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">Monthly Overview</h4>
        <div className="h-72 min-h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={attendanceData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} domain={[60, 100]} />
              <Tooltip cursor={false} contentStyle={{borderRadius: '16px', border: '1px solid #e2e8f0', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
              <ReferenceLine y={75} stroke="#f43f5e" strokeDasharray="4 4" label={{ position: 'insideTopLeft', value: 'Min Req: 75%', fill: '#f43f5e', fontSize: 12, fontWeight: 'bold' }} />
              <Line type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={4} dot={{r: 5, fill: '#ffffff', stroke: '#4f46e5', strokeWidth: 2}} activeDot={{r: 8, fill: '#4f46e5', stroke: '#fff'}} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
        <h4 className="text-lg font-bold text-slate-800 mb-6 pb-4 border-b border-slate-100">By Subject</h4>
        <div className="space-y-4">
           {courses.map((c, i) => (
             <div key={i} className="flex justify-between items-center p-4 border border-slate-100 rounded-2xl bg-slate-50 hover:bg-white hover:shadow-md transition-all">
               <span className="font-bold text-sm text-slate-700">{c.subject}</span>
               <span className={`text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm border ${c.score > 0 ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-slate-100 border-slate-200 text-slate-500'}`}>
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
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-left max-w-3xl animate-fade-in-up">
    <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
      <h3 className="text-xl font-bold text-slate-800">System Alerts</h3>
      <span className="text-xs font-bold text-indigo-600 hover:text-indigo-800 transition-colors cursor-pointer bg-indigo-50 px-3 py-1.5 rounded-lg border border-indigo-100">Mark all as read</span>
    </div>
    <div className="space-y-4">
      <div className="p-5 rounded-2xl border border-indigo-100 bg-indigo-50/50 shadow-sm flex gap-4 items-start hover:bg-indigo-50 transition-colors">
        <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center shrink-0 border border-indigo-200">
          <Icons.Dashboard />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Attendance Update</h4>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">Your overall attendance is currently 87%, which is above the 75% minimum requirement. Keep up the good work!</p>
          <span className="text-[10px] font-bold text-indigo-500 mt-2 block uppercase tracking-wider">Just now</span>
        </div>
      </div>
      <div className="p-5 rounded-2xl border border-slate-200 bg-white flex gap-4 items-start opacity-80 hover:opacity-100 transition-opacity shadow-sm">
        <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center shrink-0 border border-emerald-100">
          <Icons.Check />
        </div>
        <div>
          <h4 className="font-bold text-slate-800 text-sm">Assignment Graded</h4>
          <p className="text-sm text-slate-600 mt-1 leading-relaxed">Prof. Sharma has graded your Java Full Stack Assignment. Check your Grades tab for details.</p>
          <span className="text-[10px] font-bold text-slate-400 mt-2 block uppercase tracking-wider">2 days ago</span>
        </div>
      </div>
    </div>
  </div>
);

const ProfileView = ({ studentName, studentId }) => {
  const [notifications, setNotifications] = useState(true);
  return (
    <div className="space-y-8 text-left max-w-6xl animate-fade-in-up">
       <h3 className="text-2xl font-black text-slate-800 mb-6">Student Profile & Settings</h3>

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="space-y-8">
             <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200 text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-28 bg-gradient-to-r from-blue-600 to-indigo-800"></div>
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl mb-5 relative z-10 bg-white">
                  <img src={`https://ui-avatars.com/api/?name=${studentName}&background=f8fafc&color=4f46e5&size=256&bold=true`} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <h4 className="text-2xl font-black text-slate-800 relative z-10">{studentName}</h4>
                <p className="text-sm font-bold text-indigo-600 mt-1">Computer Science & Engineering</p>
                <span className="inline-block mt-4 px-4 py-1.5 bg-slate-100 border border-slate-200 text-slate-600 rounded-lg text-xs font-bold tracking-widest uppercase shadow-inner">ID: #EDU-{studentId || '000'}</span>

                <div className="mt-8 text-left space-y-5 pt-6 border-t border-slate-100">
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                     <p className="font-semibold text-slate-800 text-sm mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">{`${studentName.toLowerCase().replace(/\s/g, '')}@student.edutrack.edu`}</p>
                   </div>
                   <div>
                     <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Phone Number</p>
                     <p className="font-semibold text-slate-800 text-sm mt-1 bg-slate-50 p-2.5 rounded-lg border border-slate-100">+91 98765 43210</p>
                   </div>
                </div>
                <button className="w-full mt-8 px-4 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition-colors shadow-md hover:shadow-lg cursor-pointer">Edit Profile</button>
             </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
             <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
                <h4 className="text-xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100">Academic Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Program</p>
                      <p className="font-bold text-slate-800 mt-2 text-base">B.E. Computer Science</p>
                   </div>
                   <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Semester</p>
                      <p className="font-bold text-slate-800 mt-2 text-base">Semester 8</p>
                   </div>
                   <div className="p-5 bg-slate-50 rounded-2xl border border-slate-100">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Enrollment Year</p>
                      <p className="font-bold text-slate-800 mt-2 text-base">2022 - 2026</p>
                   </div>
                   <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm">
                      <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">Academic Standing</p>
                      <p className="font-black text-emerald-800 mt-2 text-base">Good Standing (GPA: 8.2)</p>
                   </div>
                </div>
             </div>

             <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-200">
                <h4 className="text-xl font-bold text-slate-800 mb-8 pb-4 border-b border-slate-100">Preferences</h4>
                <div className="flex items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-100">
                  <div>
                    <p className="font-bold text-base text-slate-800">Assignment Reminders</p>
                    <p className="text-sm text-slate-500 mt-1">Get emails 24h before a deadline.</p>
                  </div>
                  <div onClick={() => setNotifications(!notifications)} className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer transition-colors shadow-inner ${notifications ? 'bg-indigo-500' : 'bg-slate-300'}`}>
                     <div className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform duration-300 ${notifications ? 'translate-x-6' : ''}`}></div>
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
  
  // REALISTIC ADMIN-MATCHED COURSES WITH VIBRANT THEMES
  const [courses, setCourses] = useState([
    { subject: 'Cloud Computing', teacher: 'Prof. Praveen', score: 0, grade: 'N/A', color: '#3b82f6', hex: 'text-blue-700', bg: 'bg-blue-50', gradient: 'from-blue-600 to-indigo-800' },
    { subject: 'Java Full Stack', teacher: 'Prof. Sharma', score: 0, grade: 'N/A', color: '#10b981', hex: 'text-emerald-700', bg: 'bg-emerald-50', gradient: 'from-emerald-500 to-teal-700' },
    { subject: 'Data Structures', teacher: 'Prof. Patel', score: 0, grade: 'N/A', color: '#8b5cf6', hex: 'text-purple-700', bg: 'bg-purple-50', gradient: 'from-purple-600 to-fuchsia-800' },
    { subject: 'Cyber Security', teacher: 'Prof. Kumar', score: 85, grade: 'B', color: '#f43f5e', hex: 'text-rose-700', bg: 'bg-rose-50', gradient: 'from-rose-500 to-red-700' },
    { subject: 'Operating Systems', teacher: 'Prof. Lee', score: 95, grade: 'A+', color: '#f59e0b', hex: 'text-amber-700', bg: 'bg-amber-50', gradient: 'from-amber-500 to-orange-700' }
  ]);

  const getAuthHeaders = () => {
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('edutrack_jwt')}`
    };
  };

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
      const headers = getAuthHeaders();
      const courseRes = await fetch('http://localhost:8080/api/courses', { headers });
      if (courseRes.ok) setAllCourses(await courseRes.json());

      const enrollRes = await fetch(`http://localhost:8080/api/enrollments/student/${id}`, { headers });
      if (enrollRes.ok) setMyEnrollments(await enrollRes.json());

      const assignRes = await fetch(`http://localhost:8080/api/assignments/student/${id}`, { headers });
      if (assignRes.ok) setMyAssignments(await assignRes.json());
      
      const gradeRes = await fetch(`http://localhost:8080/api/grades/${id}`, { headers });
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
      const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true };
      setCurrentDateTime(now.toLocaleString('en-US', options));
    };

    updateTime(); 
    const timerId = setInterval(updateTime, 60000); 
    return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleJoinCourse = async (courseId) => {
    try {
      const payload = { studentId: parseInt(studentId), courseId: parseInt(courseId) };
      const response = await fetch('http://localhost:8080/api/enrollments/join', {
        method: 'POST',
        headers: getAuthHeaders(),
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

  const menuItems = [
    { name: 'Dashboard', icon: <Icons.Dashboard /> },
    { name: 'My Courses', icon: <Icons.Classes /> },
    { name: 'Grades', icon: <Icons.Clipboard /> },
    { name: 'Attendance', icon: <Icons.Check /> },
    { name: 'Calendar', icon: <Icons.Calendar /> },
    { name: 'Alerts', icon: <Icons.Bell /> },
    { name: 'Profile', icon: <Icons.Users /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-left">
      
      {/* ENTERPRISE SIDEBAR (Dark Theme Sync) */}
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
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 cursor-pointer ${
                activeTab === item.name 
                  ? 'bg-indigo-600/10 text-indigo-400 relative' 
                  : 'hover:bg-slate-800 hover:text-white'
              }`}
            > 
              <div className="flex items-center gap-3">
                {activeTab === item.name && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-500 rounded-r-full"></div>}
                {item.icon}
                {item.name} 
              </div>
              {item.name === 'Alerts' && <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">2</span>}
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
              placeholder="Search courses, assignments, or grades..." 
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2.5 pl-12 pr-4 text-sm text-slate-700 outline-none focus:bg-white focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <button onClick={() => setActiveTab('Alerts')} className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer">
              <Icons.Bell />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-8 bg-slate-200"></div>
            <div onClick={() => setActiveTab('Profile')} className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right hidden md:block">
                <p className="text-sm font-bold text-slate-700 leading-none">{studentName}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">Student</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold overflow-hidden shadow-sm group-hover:ring-2 group-hover:ring-indigo-100 transition-all">
                 <img src={`https://ui-avatars.com/api/?name=${studentName}&background=e0e7ff&color=4f46e5`} alt="Profile" />
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

          {activeTab === 'Dashboard' && (
            <div className="animate-fade-in-up">
              {/* Metric Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex justify-between items-center transition-transform hover:-translate-y-1 duration-300">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Attendance</p>
                    <h4 className="text-3xl font-black text-slate-800 mt-0.5">87%</h4>
                  </div>
                  <CircularProgress value={87} color="#10b981" />
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex justify-between items-center transition-transform hover:-translate-y-1 duration-300">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">GPA</p>
                    <h4 className="text-3xl font-black text-slate-800 mt-0.5">8.2</h4>
                  </div>
                  <CircularProgress value={3.4} max={4.0} color="#3b82f6" />
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex justify-between items-center transition-transform hover:-translate-y-1 duration-300">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Rank</p>
                    <h4 className="text-3xl font-black text-slate-800 mt-0.5">#12</h4>
                  </div>
                  <CircularProgress value={73} color="#8b5cf6" />
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200 flex justify-between items-center transition-transform hover:-translate-y-1 duration-300">
                  <div>
                    <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-2">Tasks Due</p>
                    <h4 className="text-3xl font-black text-slate-800 mt-0.5">{myAssignments.length}</h4>
                  </div>
                  <CircularProgress value={myAssignments.length > 0 ? 100 : 0} color="#f43f5e" />
                </div>
              </div>

              {/* ACTIVE COURSES (Using Teacher Dashboard Card Design) */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-slate-800">My Active Modules</h3>
                  <span onClick={() => setActiveTab('My Courses')} className="text-indigo-600 text-xs font-bold cursor-pointer hover:bg-indigo-50 px-4 py-2 rounded-lg transition-colors">View Catalog</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.slice(0,3).map((course, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all group cursor-pointer flex flex-col h-full transform hover:-translate-y-1">
                      {/* Gradient Header */}
                      <div className={`h-28 bg-gradient-to-r ${course.gradient} p-6 relative overflow-hidden`}>
                        <div className="absolute right-0 top-0 opacity-20 transform translate-x-4 -translate-y-4">
                          <svg width="100" height="100" viewBox="0 0 100 100" fill="none"><circle cx="50" cy="50" r="40" stroke="white" strokeWidth="20"/></svg>
                        </div>
                        <div className="relative z-10">
                          <h4 className="text-xl font-bold text-white truncate">{course.subject}</h4>
                          <p className="text-white/80 text-sm mt-1 font-medium">{course.teacher}</p>
                        </div>
                      </div>
                      {/* Body */}
                      <div className="p-6 flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-center py-3 border-b border-slate-100">
                          <span className="text-slate-500 text-sm font-medium">Current Score</span>
                          <span className="text-slate-800 font-bold bg-slate-100 px-3 py-1 rounded-full text-sm">{course.score}%</span>
                        </div>
                        <div className="flex justify-between items-center py-3">
                          <span className="text-slate-500 text-sm font-medium">Status</span>
                          <span className="text-emerald-600 text-sm font-bold flex items-center gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200"></span> Active
                          </span>
                        </div>
                      </div>
                      {/* Footer */}
                      <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
                        <span className="text-indigo-600 text-sm font-semibold group-hover:underline">View Module Dashboard</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Next 7 Days */}
              <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-200">
                <div className="flex justify-between items-center mb-6 pb-4 border-b border-slate-100">
                  <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">Next 7 Days</h3>
                  <span onClick={() => setActiveTab('Calendar')} className="text-indigo-600 text-xs font-bold cursor-pointer hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors">Full Calendar</span>
                </div>
                
                <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
                   {myAssignments.length === 0 ? (
                     <div className="flex flex-col items-center justify-center text-slate-400 py-10">
                       <div className="w-14 h-14 mb-4 bg-slate-50 rounded-full flex items-center justify-center border border-slate-100 shadow-sm"><Icons.Check /></div>
                       <p className="text-base font-medium">You are all caught up.</p>
                     </div>
                   ) : (
                     myAssignments.map((item, i) => (
                       <div key={i} className={`p-5 rounded-xl border border-slate-100 border-l-4 shadow-sm flex justify-between items-center bg-white hover:bg-slate-50 transition-colors ${getBorderColor(item.type)}`}>
                          <div>
                            <p className="font-bold text-slate-800 text-base">{item.title}</p>
                            <p className="text-xs font-medium text-slate-500 mt-1.5 flex items-center gap-1.5"><span className="text-slate-400"><Icons.Classes /></span> {item.courseName} • Due {item.dueDate}</p>
                          </div>
                          <span className={`text-[10px] font-bold border px-3 py-1.5 rounded-lg tracking-wide uppercase shadow-sm ${getTextColor(item.type)}`}>{item.type}</span>
                       </div>
                     ))
                   )}
                </div>
              </div>
            </div>
          )}

          {/* --- DYNAMIC VIEWS --- */}
          {activeTab === 'My Courses' && <CourseCatalogView allCourses={allCourses} myEnrollments={myEnrollments} handleJoinCourse={handleJoinCourse} />}
          {activeTab === 'Grades' && <GradesView courses={courses} />}
          {activeTab === 'Calendar' && <CalendarView myAssignments={myAssignments} />}
          {activeTab === 'Attendance' && <AttendanceDetailsView attendanceData={attendanceData} courses={courses} />}
          {activeTab === 'Alerts' && <AlertsView />}
          {activeTab === 'Profile' && <ProfileView studentName={studentName} studentId={studentId} />}

        </div>
      </main>

      <style>{`
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;