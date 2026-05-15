import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';

// --- ENTERPRISE SVG ICONS ---
const Icons = {
  Dashboard: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>,
  Users: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>,
  Teachers: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>,
  Courses: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path></svg>,
  Chart: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>,
  Settings: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>,
  Bell: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>,
  Search: () => <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>,
  Trash: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>,
  Server: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path></svg>,
  Activity: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>,
  Database: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path></svg>,
  Plus: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>,
  Upload: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>,
  Download: () => <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>,
  Close: () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>,
  AlertTriangle: () => <svg className="w-10 h-10 text-rose-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
};

// --- GITHUB STYLE DANGER ZONE MODAL ---
// --- GITHUB STYLE DANGER ZONE MODAL ---
// --- MODERN STARTUP-STYLE DANGER ZONE MODAL ---
// --- CALM & MINIMALIST DELETE MODAL ---
const DangerZoneDeleteModal = ({ config, onClose, onConfirm }) => {
  const [step, setStep] = useState(1);
  const [inputText, setInputText] = useState('');

  if (!config.isOpen) return null;

  const handleClose = () => {
    setStep(1);
    setInputText('');
    onClose();
  };

  const isMatch = inputText === config.name;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Soft overlay */}
      <div className="absolute inset-0 bg-slate-800/20 backdrop-blur-sm transition-opacity" onClick={handleClose}></div>
      
      {/* Clean Modal Surface */}
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-2xl shadow-xl overflow-hidden font-sans animate-fade-in-up">
        
        {/* Simple Header */}
        <div className="px-6 py-4 flex justify-between items-center border-b border-slate-100">
          <h3 className="text-sm font-semibold text-slate-800">
            Remove {config.role === 'STUDENT' ? 'Student' : 'Faculty'} Record
          </h3>
          <button onClick={handleClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <Icons.Close />
          </button>
        </div>

        <div className="p-8">
          
          {/* Step 1: Initial Warning */}
          {step === 1 && (
            <div className="text-center animate-fade-in-up">
              <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 mx-auto mb-5 border border-slate-200">
                <Icons.Trash />
              </div>
              <h4 className="text-lg font-bold text-slate-800 mb-2">Remove {config.name}?</h4>
              <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                You are about to remove this {config.role.toLowerCase()} from the platform. This action is permanent.
              </p>
              <div className="flex gap-3">
                <button onClick={handleClose} className="flex-1 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer">
                  Cancel
                </button>
                <button onClick={() => setStep(2)} className="flex-1 py-2.5 bg-rose-50 border border-rose-100 hover:bg-rose-100 text-rose-600 font-medium rounded-lg transition-colors cursor-pointer">
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Context/Consequences */}
          {step === 2 && (
            <div className="animate-fade-in-up">
              <h4 className="text-base font-bold text-slate-800 mb-3">Please note the following:</h4>
              <div className="bg-slate-50 border border-slate-100 rounded-xl p-4 mb-8">
                <ul className="space-y-3">
                  <li className="flex gap-3 text-sm text-slate-600">
                    <span className="text-slate-400">•</span> All associated grading and attendance data will be unlinked.
                  </li>
                  <li className="flex gap-3 text-sm text-slate-600">
                    <span className="text-slate-400">•</span> The user's active sessions will be terminated immediately.
                  </li>
                </ul>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setStep(1)} className="flex-1 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer">
                  Back
                </button>
                <button onClick={() => setStep(3)} className="flex-1 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-lg transition-colors cursor-pointer">
                  I understand
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Verification */}
          {step === 3 && (
            <div className="animate-fade-in-up">
              <label className="block text-sm text-slate-600 mb-3 text-center">
                Type <span className="font-bold text-slate-900 select-all">{config.name}</span> to verify
              </label>
              <input 
                type="text" 
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-center text-sm font-medium text-slate-800 outline-none focus:border-slate-400 focus:bg-white transition-all mb-6"
                placeholder="Enter name"
                autoComplete="off"
                spellCheck="false"
              />
              <div className="flex gap-3">
                <button onClick={() => setStep(2)} className="flex-1 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium rounded-lg transition-colors cursor-pointer">
                  Back
                </button>
                <button 
                  onClick={onConfirm} 
                  disabled={!isMatch}
                  className={`flex-1 py-2.5 font-medium rounded-lg transition-colors border cursor-pointer ${isMatch ? 'bg-rose-600 text-white border-rose-600 hover:bg-rose-700' : 'bg-slate-50 text-slate-400 border-slate-200 cursor-not-allowed'}`}
                >
                  Confirm Removal
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};


// --- BULK IMPORT MODAL COMPONENT ---
const BulkImportModal = ({ isOpen, onClose, roleType }) => {
  const [step, setStep] = useState(1); 
  const [isUploading, setIsUploading] = useState(false);

  const mockParsedData = [
    { name: 'Rahul Sharma', email: 'rahul.s@example.com', dept: 'CS Engineering' },
    { name: 'Priya Patel', email: 'priya.p@example.com', dept: 'Information Science' },
    { name: 'Amit Kumar', email: 'amit.k@example.com', dept: 'CS Engineering' }
  ];

  if (!isOpen) return null;

  const handleFileUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      setStep(2);
    }, 1500);
  };

  const handleConfirmImport = async () => {
    setStep(3); 
    
    const token = localStorage.getItem('edutrack_jwt');
    let errorOccurred = false;
    let errorMessage = "";
    
    for (let i = 0; i < mockParsedData.length; i++) {
      const person = mockParsedData[i];
      
      const payload = {
        fullName: person.name,          
        email: person.email,
        password: "password123", 
        role: roleType === 'Faculty' ? 'TEACHER' : 'STUDENT',
        accessCode: "EDU2026"           
      };

      try {
        const response = await fetch('http://localhost:8080/api/users/register', { 
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });

        if (!response.ok) {
           errorOccurred = true;
           errorMessage = await response.text();
           break; 
        }
      } catch (err) {
        errorOccurred = true;
        errorMessage = err.message;
        break;
      }
    }

    if (errorOccurred) {
      alert(`🚨 Import Failed!\n\nBackend Error: ${errorMessage}`);
      setStep(2); 
    } else {
      setTimeout(() => {
        window.location.reload(); 
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in-up">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col">
        
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Bulk Onboard {roleType}s</h3>
            <p className="text-xs font-medium text-slate-500 mt-0.5">Upload a CSV or Excel file to batch import records.</p>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:bg-slate-200 hover:text-slate-700 rounded-lg transition-colors cursor-pointer">
            <Icons.Close />
          </button>
        </div>

        {step === 1 && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-bold text-slate-700">1. Prepare your data</span>
              <button className="text-xs font-bold text-indigo-600 bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-lg flex items-center gap-2 transition-colors cursor-pointer">
                <Icons.Download /> Download .CSV Template
              </button>
            </div>
            
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-indigo-50 hover:border-indigo-300 transition-all group">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <div className="w-12 h-12 mb-3 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:scale-110 transition-all">
                  <Icons.Upload />
                </div>
                <p className="mb-2 text-sm text-slate-500 font-medium"><span className="font-bold text-indigo-600">Click to upload</span> or drag and drop</p>
                <p className="text-xs text-slate-400">CSV, XLS, or XLSX (MAX. 10MB)</p>
              </div>
              <input type="file" className="hidden" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" onChange={handleFileUpload} />
            </label>

            {isUploading && (
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-xs font-bold text-slate-500">
                  <span>Parsing Document...</span>
                  <span>68%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <div className="bg-indigo-500 h-2 rounded-full w-[68%] animate-pulse"></div>
                </div>
              </div>
            )}
          </div>
        )}

        {step === 2 && (
          <div className="p-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-slate-700">2. Review Parsed Data</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded border border-emerald-100">3 Records Found</span>
            </div>
            <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider text-xs">Full Name</th>
                    <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider text-xs">Email</th>
                    <th className="px-4 py-3 font-bold text-slate-500 uppercase tracking-wider text-xs">Department</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mockParsedData.map((row, idx) => (
                    <tr key={idx} className="bg-white">
                      <td className="px-4 py-3 font-bold text-slate-800">{row.name}</td>
                      <td className="px-4 py-3 text-slate-500">{row.email}</td>
                      <td className="px-4 py-3 text-slate-500">{row.dept}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-6">
              <button onClick={() => setStep(1)} className="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-500 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer">Cancel</button>
              <button onClick={handleConfirmImport} className="px-6 py-2.5 rounded-xl font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-colors cursor-pointer">Confirm & Import</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="p-12 text-center flex flex-col items-center">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-500 mb-6">
               <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">Import Successful!</h3>
            <p className="text-slate-500 font-medium">Successfully provisioned accounts and dispatched welcome emails.</p>
          </div>
        )}

      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

const StudentsView = ({ students, onImportClick, onDeleteClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-left animate-fade-in-up relative">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Student Directory</h3>
          <p className="text-sm text-slate-500">Manage enrolled learners across the institution.</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onImportClick} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer">
            <Icons.Upload /> Bulk Import
          </button>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">{students.length} Total</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">System ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Student Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {students.length === 0 ? <tr><td colSpan="4" className="text-center p-8 text-slate-400 text-sm">No students registered yet.</td></tr> : null}
            {students.map((student) => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-400">#EDU-{student.id}</td>
                <td className="px-6 py-4 text-sm font-bold text-slate-800 flex items-center gap-3">
                   <div className="w-8 h-8 rounded-full overflow-hidden bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold text-xs">
                      {student.name.charAt(0)}
                   </div>
                   {student.name}
                </td>
                <td className="px-6 py-4 text-sm text-slate-500">{student.email}</td>
                <td className="px-6 py-4 flex justify-end gap-2 items-center">
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-md text-[10px] font-bold uppercase tracking-wider">Active</span>
                  <button onClick={() => onDeleteClick(student.id, student.name, 'STUDENT')} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer" title="Remove Student">
                    <Icons.Trash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const TeachersView = ({ teachers, courses, onImportClick, onDeleteClick }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden text-left animate-fade-in-up relative">
      <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Faculty Directory</h3>
          <p className="text-sm text-slate-500">Manage instructors and their assignments.</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onImportClick} className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-lg text-xs font-bold shadow-sm hover:bg-slate-50 flex items-center gap-2 transition-colors cursor-pointer">
            <Icons.Upload /> Bulk Import
          </button>
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">{teachers.length} Total</span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">System ID</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Teacher Name</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Course Load</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {teachers.length === 0 ? <tr><td colSpan="4" className="text-center p-8 text-slate-400 text-sm">No teachers registered yet.</td></tr> : null}
            {teachers.map((teacher) => {
              const assignedCount = courses.filter(c => c.teacherName === teacher.name).length;
              return (
                <tr key={teacher.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-400">#FAC-{teacher.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-slate-800 flex items-center gap-3">
                     <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-xs">
                      {teacher.name.charAt(0)}
                     </div>
                     {teacher.name}
                  </td>
                  <td className="px-6 py-4">
                     {assignedCount > 0 ? (
                        <span className="px-2.5 py-1 bg-indigo-50 text-indigo-700 border border-indigo-200 rounded-md text-[10px] font-bold uppercase tracking-wider">{assignedCount} Classes</span>
                     ) : (
                        <span className="px-2.5 py-1 bg-slate-100 text-slate-500 border border-slate-200 rounded-md text-[10px] font-bold uppercase tracking-wider">Unassigned</span>
                     )}
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2 items-center">
                     <button onClick={() => onDeleteClick(teacher.id, teacher.name, 'TEACHER')} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer" title="Remove Faculty">
                       <Icons.Trash />
                     </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const AdminReportsView = ({ enrollmentData, performanceData }) => {
  const COLORS = ['#4f46e5', '#0ea5e9', '#10b981', '#f59e0b', '#f43f5e'];
  return (
    <div className="space-y-8 text-left animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h4 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Global Enrollment Trends</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={250}>
              <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Area type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={3} fill="url(#colorVal)" activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h4 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Department Average GPA</h4>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%" minHeight={250}>
              <BarChart data={performanceData} layout="vertical" margin={{ top: 0, right: 10, left: 0, bottom: 0 }}>
                <XAxis type="number" hide domain={[0, 100]} />
                <YAxis dataKey="subject" type="category" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b', fontWeight: '600'}} width={100} />
                <Tooltip cursor={{fill: '#f8fafc'}} contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0'}} />
                <Bar dataKey="score" radius={[0, 6, 6, 0]} barSize={20}>
                  {performanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 p-8 rounded-2xl shadow-lg text-white grid grid-cols-1 md:grid-cols-3 gap-6 relative overflow-hidden">
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500 rounded-full blur-3xl opacity-20"></div>
        <div>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Icons.Server /> Server Status</p>
           <h4 className="text-2xl font-black text-emerald-400 flex items-center gap-3">
            <span className="relative flex h-3 w-3"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span></span>
            Operational
           </h4>
        </div>
        <div>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Icons.Database /> Database Load</p>
           <h4 className="text-2xl font-black text-white">12.4 MB</h4>
        </div>
        <div>
           <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2"><Icons.Activity /> API Requests (24h)</p>
           <h4 className="text-2xl font-black text-white">1,402</h4>
        </div>
      </div>
    </div>
  );
};

const AdminSettingsView = ({ adminName }) => {
  const [toggles, setToggles] = useState({ maintenance: false, openEnrollment: true, autoGrade: true });
  const handleToggle = (key) => setToggles(prev => ({...prev, [key]: !prev[key]}));
  
  return (
    <div className="text-left max-w-5xl animate-fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Platform Configuration</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Institution Name</label>
                <input type="text" defaultValue="EduTrack Global Academy" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all focus:bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Support Email</label>
                <input type="email" defaultValue="admin@edutrack.edu" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all focus:bg-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Academic Year</label>
                <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all cursor-pointer">
                  <option>2025 - 2026</option>
                  <option>2026 - 2027</option>
                </select>
              </div>
            </div>
            <button className="mt-6 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition cursor-pointer shadow-sm">Save Configuration</button>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h4 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Administrator Profile</h4>
            <div className="flex items-center gap-6">
              <div className="w-16 h-16 bg-indigo-100 text-indigo-700 font-bold text-xl rounded-full flex items-center justify-center border-2 border-indigo-200">
                {adminName.substring(0, 2).toUpperCase()}
              </div>
              <div className="flex-1">
                <input type="text" defaultValue={adminName} className="w-full mb-3 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-700 outline-none focus:bg-white transition-all focus:border-indigo-500" />
                <button className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg font-bold text-xs hover:bg-slate-200 transition cursor-pointer">Update Password</button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit">
           <h4 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">System Controls</h4>
           <div className="space-y-6">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-bold text-sm text-slate-800">Maintenance Mode</p>
                 <p className="text-[10px] text-slate-500 mt-1">Lock access for updates.</p>
               </div>
               <div onClick={() => handleToggle('maintenance')} className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggles.maintenance ? 'bg-rose-500' : 'bg-slate-200'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${toggles.maintenance ? 'translate-x-5' : ''}`}></div>
               </div>
             </div>
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-bold text-sm text-slate-800">Open Enrollment</p>
                 <p className="text-[10px] text-slate-500 mt-1">Allow students to join classes.</p>
               </div>
               <div onClick={() => handleToggle('openEnrollment')} className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${toggles.openEnrollment ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                  <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform duration-300 ${toggles.openEnrollment ? 'translate-x-5' : ''}`}></div>
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
  
  // Modals Config
  const [isImportModalOpen, setImportModalOpen] = useState(false);
  const [importRole, setImportRole] = useState('Student');
  const [deleteModalConfig, setDeleteModalConfig] = useState({ isOpen: false, id: null, name: '', role: '' });
  
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [newCourse, setNewCourse] = useState({ courseName: '', teacherName: '', gradeLevel: 'Sem 1' });

  const getAuthHeaders = () => {
    const token = localStorage.getItem('edutrack_jwt');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  const fetchAllData = async () => {
    try {
      const userRes = await fetch('http://localhost:8080/api/users', { headers: getAuthHeaders() });
      const users = await userRes.json();
      
      const realStudents = users.filter(u => u.role === 'STUDENT');
      const realTeachers = users.filter(u => u.role === 'TEACHER');
      
      setStudents(realStudents);
      setTeachers(realTeachers);

      const courseRes = await fetch('http://localhost:8080/api/courses', { headers: getAuthHeaders() });
      const courseData = await courseRes.json();
      setCourses(courseData);

    } catch (err) {
      console.error("Error fetching admin data:", err);
    }
  };

  useEffect(() => {
    const storedName = localStorage.getItem('edutrack_userName');
    if (storedName) setAdminName(storedName);
    fetchAllData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddCourse = async (e) => {
    e.preventDefault();
    if (!newCourse.courseName || !newCourse.teacherName || !newCourse.gradeLevel) return alert("Please fill all fields");
    try {
      const response = await fetch('http://localhost:8080/api/courses/add', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(newCourse)
      });
      if (response.ok) {
        alert("Course provisioned successfully!");
        setNewCourse({ courseName: '', teacherName: '', gradeLevel: 'Sem 1' });
        fetchAllData();
      } else {
        alert("Failed to provision course: Backend Error");
      }
    } catch (err) { alert("Failed to add course."); }
  };

  const handleDeleteCourse = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course from the system?")) return;
    try {
      await fetch(`http://localhost:8080/api/courses/delete/${id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders() 
      });
      fetchAllData();
    } catch (err) { alert("Delete failed"); }
  };

  // OPEN DELETE MODAL
  const openDeleteModal = (id, name, role) => {
    setDeleteModalConfig({ isOpen: true, id, name, role });
  };

  // EXECUTE FINAL DELETE FROM GITHUB-STYLE MODAL
  const executeDeleteUser = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/users/delete/${deleteModalConfig.id}`, { 
        method: 'DELETE',
        headers: getAuthHeaders() 
      });
      
      if (response.ok) {
        setDeleteModalConfig({ isOpen: false, id: null, name: '', role: '' });
        fetchAllData(); 
      } else {
        alert("Failed to delete user from the database.");
      }
    } catch (err) { 
      alert("Network error: Could not reach the server to delete."); 
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  const openImportModal = (role) => {
    setImportRole(role);
    setImportModalOpen(true);
  };

  // Mock Data for Charts
  const enrollmentData = [
    { name: 'Jan', val: 1050 }, { name: 'Feb', val: 1080 }, { name: 'Mar', val: 1100 },
    { name: 'Apr', val: 1130 }, { name: 'May', val: 1160 }, { name: 'Jun', val: 1180 },
    { name: 'Jul', val: 1200 }, { name: 'Aug', val: 1240 }
  ];
  const performanceData = [
    { subject: 'Data Structures', score: 78 },
    { subject: 'Cloud Computing', score: 82 },
    { subject: 'Java OOP', score: 71 },
    { subject: 'DBMS', score: 80 },
    { subject: 'Web Dev', score: 91 }
  ];

  const menuItems = [
    { name: 'Dashboard', icon: <Icons.Dashboard /> },
    { name: 'Students', icon: <Icons.Users /> },
    { name: 'Teachers', icon: <Icons.Teachers /> },
    { name: 'Courses', icon: <Icons.Courses /> },
    { name: 'Reports', icon: <Icons.Chart /> },
    { name: 'Settings', icon: <Icons.Settings /> },
  ];

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-left relative">
      
      {/* GLOBAL MODALS */}
      <BulkImportModal 
        isOpen={isImportModalOpen} 
        onClose={() => setImportModalOpen(false)} 
        roleType={importRole} 
      />

      <DangerZoneDeleteModal 
        config={deleteModalConfig}
        onClose={() => setDeleteModalConfig({ isOpen: false, id: null, name: '', role: '' })}
        onConfirm={executeDeleteUser}
      />

      {/* ENTERPRISE SIDEBAR */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col fixed h-full z-20 shadow-2xl">
        <div className="h-20 flex items-center px-8 border-b border-slate-800">
          <div className="w-8 h-8 bg-indigo-600 rounded flex items-center justify-center text-white font-bold text-lg mr-3 shadow-lg shadow-indigo-500/30">E</div>
          <span className="text-xl font-bold text-white tracking-tight">EduTrack<span className="text-indigo-400">.</span></span>
        </div>
        
        <div className="px-6 py-6 text-xs font-semibold text-slate-500 uppercase tracking-widest">Administration</div>
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
              placeholder="Search users, courses, or settings..." 
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
                <p className="text-sm font-bold text-slate-700 leading-none">{adminName}</p>
                <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">Super Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-indigo-700 font-bold overflow-hidden shadow-sm group-hover:ring-2 group-hover:ring-indigo-100 transition-all">
                 {adminName.substring(0, 2).toUpperCase()}
              </div>
            </div>
          </div>
        </header>

        {/* DYNAMIC VIEW CONTAINER */}
        <div className="p-10 flex-1 bg-slate-50/50">
          
          <div className="mb-8">
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">{activeTab}</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Manage platform {activeTab.toLowerCase()} and settings.</p>
          </div>

          {activeTab === 'Dashboard' && (
            <div className="animate-fade-in-up">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                 {[
                   { label: 'Total Students', value: students.length, color: 'text-blue-600', bg: 'bg-blue-50', icon: <Icons.Users /> },
                   { label: 'Total Faculty', value: teachers.length, color: 'text-indigo-600', bg: 'bg-indigo-50', icon: <Icons.Teachers /> },
                   { label: 'Active Courses', value: courses.length, color: 'text-emerald-600', bg: 'bg-emerald-50', icon: <Icons.Courses /> },
                   { label: 'System Alerts', value: '2', color: 'text-rose-600', bg: 'bg-rose-50', icon: <Icons.Bell /> }
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

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
                      <h3 className="text-lg font-bold text-slate-800">Student Enrollment Trend</h3>
                    </div>
                    <div className="h-[250px] w-full">
                      <ResponsiveContainer width="100%" height="100%" minHeight={250}>
                        <AreaChart data={enrollmentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                          <defs><linearGradient id="colorValAdmin" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#4f46e5" stopOpacity={0.2}/><stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/></linearGradient></defs>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                          <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                          <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                          <Tooltip contentStyle={{borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                          <Area type="monotone" dataKey="val" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorValAdmin)" activeDot={{ r: 6, strokeWidth: 0, fill: '#4f46e5' }} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                 </div>
                 <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Department GPA</h3>
                    <div className="space-y-4">
                       {performanceData.map((item, i) => (
                          <div key={i}>
                             <div className="flex justify-between items-center mb-1.5">
                               <p className="text-sm font-bold text-slate-700">{item.subject}</p>
                               <p className="text-xs font-bold text-slate-500">{item.score}%</p>
                             </div>
                             <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                               <div className="h-full rounded-full bg-indigo-500" style={{ width: `${item.score}%` }}></div>
                             </div>
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
            </div>
          )}

          {/* DYNAMIC VIEWS */}
          {activeTab === 'Students' && <StudentsView students={students} onImportClick={() => openImportModal('Student')} onDeleteClick={openDeleteModal} />}
          {activeTab === 'Teachers' && <TeachersView teachers={teachers} courses={courses} onImportClick={() => openImportModal('Faculty')} onDeleteClick={openDeleteModal} />}
          {activeTab === 'Reports' && <AdminReportsView enrollmentData={enrollmentData} performanceData={performanceData} />}
          {activeTab === 'Settings' && <AdminSettingsView adminName={adminName} />}
          
          {activeTab === 'Courses' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 h-fit">
                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b border-slate-100 pb-4">Provision New Course</h3>
                <form onSubmit={handleAddCourse} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Course Title</label>
                    <select required value={newCourse.courseName} onChange={(e) => setNewCourse({...newCourse, courseName: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none cursor-pointer transition-all focus:bg-white">
                      <option value="">Select a Course...</option>
                      <option value="Data Structures and Algorithms">Data Structures and Algorithms</option>
                      <option value="Database Management Systems">Database Management Systems</option>
                      <option value="Object-Oriented Programming (Java)">Object-Oriented Programming (Java)</option>
                      <option value="Operating Systems">Operating Systems</option>
                      <option value="Computer Networks">Computer Networks</option>
                      <option value="Software Engineering">Software Engineering</option>
                      <option value="Full Stack Web Development">Full Stack Web Development</option>
                      <option value="Artificial Intelligence">Artificial Intelligence</option>
                      <option value="Cloud Computing">Cloud Computing</option>
                      <option value="Cyber Security">Cyber Security</option>
                      <option value="Discrete Mathematics">Discrete Mathematics</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Assign Instructor</label>
                    <select required value={newCourse.teacherName} onChange={(e) => setNewCourse({...newCourse, teacherName: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none cursor-pointer transition-all focus:bg-white">
                      <option value="">Select a Teacher...</option>
                      {teachers.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Target Semester</label>
                    <select value={newCourse.gradeLevel} onChange={(e) => setNewCourse({...newCourse, gradeLevel: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 outline-none cursor-pointer transition-all focus:bg-white">
                      <option value="Sem 1">Semester 1</option>
                      <option value="Sem 2">Semester 2</option>
                      <option value="Sem 3">Semester 3</option>
                      <option value="Sem 4">Semester 4</option>
                      <option value="Sem 5">Semester 5</option>
                      <option value="Sem 6">Semester 6</option>
                      <option value="Sem 7">Semester 7</option>
                      <option value="Sem 8">Semester 8</option>
                    </select>
                  </div>
                  <button type="submit" className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 transition cursor-pointer mt-4 shadow-sm flex justify-center items-center gap-2">
                    Create Course <Icons.Plus />
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-slate-50/50">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Active Course Directory</h3>
                  </div>
                  <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-xs font-bold border border-indigo-100">{courses.length} Active</span>
                </div>
                <div className="overflow-x-auto max-h-[600px]">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200">
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Course Name</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Instructor</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-center">Semester</th>
                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {courses.length === 0 ? <tr><td colSpan="4" className="text-center p-8 text-slate-400 text-sm">No courses created yet.</td></tr> : null}
                      {courses.map((course) => (
                        <tr key={course.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-6 py-4 text-sm font-bold text-slate-800">{course.courseName}</td>
                          <td className="px-6 py-4 text-sm font-medium text-slate-500">{course.teacherName}</td>
                          <td className="px-6 py-4 text-center">
                            <span className="px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-bold uppercase tracking-wider border border-slate-200">{course.gradeLevel}</span>
                          </td>
                          <td className="px-6 py-4 flex justify-end">
                            <button onClick={() => handleDeleteCourse(course.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer" title="Delete Course">
                              <Icons.Trash />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
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

export default AdminDashboard;