import React, { useState } from 'react';
import { 
  Calendar, 
  BarChart3, 
  Users, 
  Settings, 
  Bell,
  Menu,
  X,
  BookOpen,
  Building,
  LogOut,
  User
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useNotifications } from '../context/NotificationContext';
import NotificationPanel from './NotificationPanel';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsPanelOpen, setNotificationsPanelOpen] = useState(false);
  const { user, logout } = useUser();
  const { notifications } = useNotifications();
  const location = useLocation();

  const unreadCount = notifications.filter(n => !n.read).length;

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: BarChart3 },
    { name: 'AI Timetable', href: '/timetable', icon: Calendar },
    { name: 'Resources', href: '/resources', icon: Building },
    { name: 'Faculty', href: '/faculty', icon: Users },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="h-screen flex overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Mobile sidebar */}
      <div className={`fixed inset-0 flex z-40 md:hidden ${sidebarOpen ? '' : 'pointer-events-none'}`}>
        <div className={`fixed inset-0 bg-gray-600 bg-opacity-75 transition-opacity ease-linear duration-300 ${sidebarOpen ? 'opacity-100' : 'opacity-0'}`} onClick={() => setSidebarOpen(false)} />
        
        <div className={`relative flex-1 flex flex-col max-w-xs w-full glass-morphism transform transition ease-in-out duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>
          <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
            <div className="flex-shrink-0 flex items-center px-4">
              <BookOpen className="h-8 w-8 text-white" />
              <span className="ml-2 text-white text-xl font-bold">EduSchedule AI</span>
            </div>
            <nav className="mt-5 px-2 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`group flex items-center px-2 py-2 text-base font-medium rounded-md transition-colors ${
                    isActive(item.href)
                      ? 'bg-white bg-opacity-20 text-white'
                      : 'text-white hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <item.icon className="mr-4 h-6 w-6" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-white border-opacity-20 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  <User className="h-5 w-5 text-white" />
                </div>
              </div>
              <div className="ml-3">
                <p className="text-base font-medium text-white">{user?.name}</p>
                <p className="text-sm font-medium text-white text-opacity-70 capitalize">{user?.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex flex-col h-0 flex-1 glass-morphism m-4 rounded-2xl">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <BookOpen className="h-8 w-8 text-white" />
                <span className="ml-2 text-white text-xl font-bold">EduSchedule AI</span>
              </div>
              <nav className="mt-5 flex-1 px-2 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors hover-lift ${
                      isActive(item.href)
                        ? 'bg-white bg-opacity-20 text-white'
                        : 'text-white hover:bg-white hover:bg-opacity-10'
                    }`}
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="flex-shrink-0 flex border-t border-white border-opacity-20 p-4">
              <div className="flex items-center w-full">
                <div className="flex-shrink-0">
                  <div className="h-8 w-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                    <User className="h-5 w-5 text-white" />
                  </div>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs font-medium text-white text-opacity-70 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="flex-shrink-0 p-1 rounded-full text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        <div className="md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3">
          <button
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        
        {/* Top bar */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border-b border-white border-opacity-20 md:mx-4 md:mt-4 md:rounded-t-2xl">
          <div className="flex-1 px-4 flex justify-between">
            <div className="flex-1 flex"></div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                className="relative bg-white bg-opacity-20 p-1 rounded-full text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover-lift"
                onClick={() => setNotificationsPanelOpen(true)}
              >
                <Bell className="h-6 w-6" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-xs text-white rounded-full flex items-center justify-center animate-pulse-gentle">
                    {unreadCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none md:mx-4 md:mb-4 bg-white bg-opacity-5 backdrop-filter backdrop-blur-lg md:rounded-b-2xl">
          <div className="py-6 px-4 sm:px-6 lg:px-8 h-full">
            <div className="fade-in h-full">
              {children}
            </div>
          </div>
        </main>
      </div>

      <NotificationPanel 
        isOpen={notificationsPanelOpen} 
        onClose={() => setNotificationsPanelOpen(false)} 
      />
    </div>
  );
};

export default Layout;