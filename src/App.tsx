import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import TimetableGenerator from './pages/TimetableGenerator';
import ResourceManagement from './pages/ResourceManagement';
import FacultyManagement from './pages/FacultyManagement';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Login from './pages/Login';
import { UserProvider, useUser } from './context/UserContext';
import { NotificationProvider } from './context/NotificationContext';
import { TimetableProvider } from './context/TimetableContext';
import './App.css';

function AppRoutes() {
  const { user } = useUser();

  if (!user) {
    return <Login />;
  }

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/timetable" element={<TimetableGenerator />} />
        <Route path="/resources" element={<ResourceManagement />} />
        <Route path="/faculty" element={<FacultyManagement />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <UserProvider>
      <NotificationProvider>
        <TimetableProvider>
          <Router>
            <div className="App">
              <AppRoutes />
            </div>
          </Router>
        </TimetableProvider>
      </NotificationProvider>
    </UserProvider>
  );
}

export default App;