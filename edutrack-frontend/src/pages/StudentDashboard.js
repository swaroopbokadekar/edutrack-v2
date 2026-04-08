import React from 'react';

const StudentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-black text-indigo-950 tracking-tight">My Progress</h1>
            <p className="text-gray-500 font-bold mt-2">Keep up the great work, Student!</p>
          </div>
          <div className="bg-white px-6 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
             <div className="text-right">
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Attendance</p>
                <p className="text-lg font-black text-green-600">92.4%</p>
             </div>
             <div className="w-10 h-10 bg-indigo-600 rounded-xl"></div>
          </div>
        </header>

        {/* Quick Alerts */}
        <div className="bg-indigo-600 rounded-[2rem] p-8 text-white mb-10 flex justify-between items-center shadow-xl shadow-indigo-200">
           <div>
              <h2 className="text-2xl font-black mb-2">New Assignment: Math Quiz</h2>
              <p className="text-indigo-100 font-medium">Due in 2 days • Topic: Linear Equations</p>
           </div>
           <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-black hover:bg-indigo-50 transition">View Task</button>
        </div>

        {/* Grades & Schedule Grid */}
        <div className="grid grid-cols-3 gap-10">
           <div className="col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-black mb-8 text-indigo-950">Recent Grades</h3>
              <div className="space-y-6">
                 {[
                   { subject: 'English Literature', score: '94/100', grade: 'A' },
                   { subject: 'Advanced Physics', score: '82/100', grade: 'B' },
                   { subject: 'World History', score: '76/100', grade: 'C' }
                 ].map((g, i) => (
                   <div key={i} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-2xl transition">
                      <span className="font-bold text-gray-700">{g.subject}</span>
                      <div className="flex items-center gap-6">
                         <span className="text-gray-400 font-medium">{g.score}</span>
                         <span className="w-10 h-10 flex items-center justify-center bg-indigo-50 text-indigo-600 rounded-lg font-black">{g.grade}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-gray-100">
              <h3 className="text-xl font-black mb-8 text-indigo-950">Schedule</h3>
              <div className="space-y-6">
                 <div className="border-l-4 border-indigo-600 pl-4">
                    <p className="text-xs font-black text-gray-400 uppercase">09:00 AM</p>
                    <p className="font-bold text-indigo-950">Biology Lab</p>
                 </div>
                 <div className="border-l-4 border-gray-200 pl-4">
                    <p className="text-xs font-black text-gray-400 uppercase">11:30 AM</p>
                    <p className="font-bold text-indigo-950">Pure Mathematics</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;