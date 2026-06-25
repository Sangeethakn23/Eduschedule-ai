import React, { useState } from 'react';
import { BookOpen, Mail, Lock, User, Building } from 'lucide-react';
import { useUser } from '../context/UserContext';

const Login: React.FC = () => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'faculty' | 'student'>('admin');
  const { login } = useUser();

  const roles = [
    { value: 'admin', label: 'Administrator', icon: Building, description: 'Full system access' },
    { value: 'faculty', label: 'Faculty', icon: User, description: 'Teaching & scheduling' },
    { value: 'student', label: 'Student', icon: BookOpen, description: 'View schedules & courses' }
  ];

  const handleLogin = () => {
    const userData = {
      id: '1',
      name: selectedRole === 'admin' ? 'Dr. Sarah Johnson' : 
            selectedRole === 'faculty' ? 'Prof. Michael Chen' : 'Alex Thompson',
      email: selectedRole === 'admin' ? 'admin@university.edu' :
             selectedRole === 'faculty' ? 'faculty@university.edu' : 'student@university.edu',
      role: selectedRole,
      department: 'Computer Science'
    };
    login(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="glass-morphism p-8 rounded-2xl fade-in">
          {/* Logo and Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <BookOpen className="h-12 w-12 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">EduSchedule AI</h2>
            <p className="mt-2 text-white text-opacity-80">AI-Powered Timetable Management</p>
          </div>

          {/* Role Selection */}
          <div className="space-y-4 mb-6">
            <label className="block text-sm font-medium text-white">Select Your Role</label>
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.value}
                  type="button"
                  onClick={() => setSelectedRole(role.value as 'admin' | 'faculty' | 'student')}
                  className={`w-full flex items-center p-3 rounded-lg transition-all hover-lift ${
                    selectedRole === role.value
                      ? 'bg-white bg-opacity-20 ring-2 ring-white ring-opacity-50'
                      : 'bg-white bg-opacity-10 hover:bg-opacity-15'
                  }`}
                >
                  <role.icon className="h-5 w-5 text-white mr-3" />
                  <div className="flex-1 text-left">
                    <div className="text-white font-medium">{role.label}</div>
                    <div className="text-white text-opacity-60 text-sm">{role.description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Demo Login Form */}
          <div className="space-y-4 mb-6">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Mail className="h-5 w-5 text-white text-opacity-60" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={selectedRole === 'admin' ? 'admin@university.edu' :
                        selectedRole === 'faculty' ? 'faculty@university.edu' : 'student@university.edu'}
                  className="appearance-none relative block w-full px-10 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 placeholder-white placeholder-opacity-60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <Lock className="h-5 w-5 text-white text-opacity-60" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value="••••••••"
                  className="appearance-none relative block w-full px-10 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 placeholder-white placeholder-opacity-60 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors hover-lift hover-glow"
          >
            Sign in as {roles.find(r => r.value === selectedRole)?.label}
          </button>

          {/* Demo Notice */}
          <div className="mt-6 text-center">
            <p className="text-sm text-white text-opacity-60">
              This is a demo. Click any role to explore the system.
            </p>
          </div>

          {/* Features Preview */}
          <div className="mt-8 grid grid-cols-2 gap-4 text-center">
            <div className="bg-white bg-opacity-10 p-3 rounded-lg">
              <div className="text-2xl font-bold text-white">AI</div>
              <div className="text-xs text-white text-opacity-80">Powered</div>
            </div>
            <div className="bg-white bg-opacity-10 p-3 rounded-lg">
              <div className="text-2xl font-bold text-white">🔐</div>
              <div className="text-xs text-white text-opacity-80">Blockchain</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;