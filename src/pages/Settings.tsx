import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Shield, 
  Bell, 
  Palette, 
  Globe,
  Database,
  Smartphone,
  Moon,
  Sun,
  Save,
  RefreshCw,
  Key,
  Lock,
  Zap
} from 'lucide-react';
import { useUser } from '../context/UserContext';

const Settings: React.FC = () => {
  const { user } = useUser();
  const [activeTab, setActiveTab] = useState('profile');
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    conflicts: true,
    scheduleChanges: true,
    aiUpdates: false,
    weeklyReports: true
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'ai', name: 'AI Settings', icon: Zap },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'appearance', name: 'Appearance', icon: Palette },
    { id: 'integration', name: 'Integrations', icon: Smartphone },
  ];

  const handleSave = () => {
    // Save settings logic here
    console.log('Settings saved');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <SettingsIcon className="h-8 w-8 mr-3 text-blue-400" />
              Settings & Configuration
            </h1>
            <p className="text-white text-opacity-80 mt-2">
              Customize your EduSchedule AI experience
            </p>
          </div>
          <button
            onClick={handleSave}
            className="flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors hover-lift"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <div className="lg:col-span-1">
          <div className="glass-morphism p-4 rounded-xl border border-white border-opacity-20">
            <nav className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors hover-lift ${
                    activeTab === tab.id
                      ? 'bg-blue-500 bg-opacity-30 text-white border border-blue-500 border-opacity-50'
                      : 'text-white text-opacity-80 hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  <tab.icon className="h-5 w-5 mr-3" />
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Full Name</label>
                    <input
                      type="text"
                      defaultValue={user?.name}
                      className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Email</label>
                    <input
                      type="email"
                      defaultValue={user?.email}
                      className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Role</label>
                    <select className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="admin" className="bg-gray-800">Administrator</option>
                      <option value="faculty" className="bg-gray-800">Faculty</option>
                      <option value="student" className="bg-gray-800">Student</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white mb-2">Department</label>
                    <select className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="cs" className="bg-gray-800">Computer Science</option>
                      <option value="mgmt" className="bg-gray-800">Management</option>
                      <option value="eng" className="bg-gray-800">Engineering</option>
                      <option value="math" className="bg-gray-800">Mathematics</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-white mb-2">Bio</label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about yourself..."
                    className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-blue-500 bg-opacity-20 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Profile Verification</h3>
                    <p className="text-white text-opacity-70 text-sm">Verify your profile for enhanced security</p>
                  </div>
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    Verify
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Notification Preferences</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Email Notifications</h3>
                      <p className="text-white text-opacity-70 text-sm">Receive updates via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.email}
                        onChange={(e) => setNotifications(prev => ({...prev, email: e.target.checked}))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Push Notifications</h3>
                      <p className="text-white text-opacity-70 text-sm">Get instant mobile notifications</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.push}
                        onChange={(e) => setNotifications(prev => ({...prev, push: e.target.checked}))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Schedule Conflicts</h3>
                      <p className="text-white text-opacity-70 text-sm">Alert when conflicts are detected</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.conflicts}
                        onChange={(e) => setNotifications(prev => ({...prev, conflicts: e.target.checked}))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Schedule Changes</h3>
                      <p className="text-white text-opacity-70 text-sm">Notify about timetable updates</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.scheduleChanges}
                        onChange={(e) => setNotifications(prev => ({...prev, scheduleChanges: e.target.checked}))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">AI Updates</h3>
                      <p className="text-white text-opacity-70 text-sm">Get AI optimization suggestions</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.aiUpdates}
                        onChange={(e) => setNotifications(prev => ({...prev, aiUpdates: e.target.checked}))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
                    <div>
                      <h3 className="text-white font-medium">Weekly Reports</h3>
                      <p className="text-white text-opacity-70 text-sm">Receive weekly analytics reports</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.weeklyReports}
                        onChange={(e) => setNotifications(prev => ({...prev, weeklyReports: e.target.checked}))}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'ai' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">AI Configuration</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Optimization Level</h3>
                    <select className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="conservative" className="bg-gray-800">Conservative</option>
                      <option value="balanced" className="bg-gray-800">Balanced</option>
                      <option value="aggressive" className="bg-gray-800">Aggressive</option>
                    </select>
                    <p className="text-white text-opacity-70 text-xs mt-2">How aggressively AI optimizes schedules</p>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Auto-Resolution</h3>
                    <select className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="manual" className="bg-gray-800">Manual Approval</option>
                      <option value="auto" className="bg-gray-800">Automatic</option>
                      <option value="hybrid" className="bg-gray-800">Hybrid</option>
                    </select>
                    <p className="text-white text-opacity-70 text-xs mt-2">How conflicts are resolved</p>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Learning Mode</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <p className="text-white text-opacity-70 text-xs mt-2">Allow AI to learn from patterns</p>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Predictive Analytics</h3>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                    <p className="text-white text-opacity-70 text-xs mt-2">Enable future prediction features</p>
                  </div>
                </div>

                <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-medium">AI Model Update</h3>
                      <p className="text-white text-opacity-70 text-sm">Current version: v2.1.0</p>
                    </div>
                    <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Update
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'security' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Security Settings</h2>
                
                <div className="space-y-4">
                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-white font-medium">Two-Factor Authentication</h3>
                        <p className="text-white text-opacity-70 text-sm">Add an extra layer of security</p>
                      </div>
                      <button className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors">
                        Enable 2FA
                      </button>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-4">Change Password</h3>
                    <div className="space-y-4">
                      <input
                        type="password"
                        placeholder="Current Password"
                        className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="New Password"
                        className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                        Update Password
                      </button>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-white font-medium">Blockchain Key</h3>
                        <p className="text-white text-opacity-70 text-sm">Your unique blockchain identifier</p>
                      </div>
                      <button className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors">
                        <Key className="h-4 w-4 mr-2" />
                        View Key
                      </button>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Active Sessions</h3>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm">Current Session</p>
                          <p className="text-white text-opacity-60 text-xs">Chrome on Windows • Now</p>
                        </div>
                        <span className="text-green-400 text-sm">Active</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-white text-sm">Mobile App</p>
                          <p className="text-white text-opacity-60 text-xs">iPhone • 2 hours ago</p>
                        </div>
                        <button className="text-red-400 hover:text-red-300 text-sm">Revoke</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'appearance' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Appearance Settings</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg">
                    <div className="flex items-center">
                      {darkMode ? <Moon className="h-5 w-5 text-blue-400 mr-3" /> : <Sun className="h-5 w-5 text-yellow-400 mr-3" />}
                      <div>
                        <h3 className="text-white font-medium">Dark Mode</h3>
                        <p className="text-white text-opacity-70 text-sm">Switch between light and dark themes</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={darkMode}
                        onChange={(e) => setDarkMode(e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-4">Color Theme</h3>
                    <div className="grid grid-cols-4 gap-4">
                      {[
                        { name: 'Blue', color: 'bg-blue-500' },
                        { name: 'Purple', color: 'bg-purple-500' },
                        { name: 'Green', color: 'bg-green-500' },
                        { name: 'Orange', color: 'bg-orange-500' }
                      ].map((theme) => (
                        <button
                          key={theme.name}
                          className={`p-4 rounded-lg ${theme.color} hover:opacity-80 transition-opacity`}
                        >
                          <div className="text-white text-sm font-medium">{theme.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Language</h3>
                    <select className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="en" className="bg-gray-800">English</option>
                      <option value="es" className="bg-gray-800">Spanish</option>
                      <option value="fr" className="bg-gray-800">French</option>
                      <option value="de" className="bg-gray-800">German</option>
                      <option value="hi" className="bg-gray-800">Hindi</option>
                    </select>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <h3 className="text-white font-medium mb-2">Timezone</h3>
                    <select className="w-full px-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="utc" className="bg-gray-800">UTC</option>
                      <option value="est" className="bg-gray-800">Eastern Time</option>
                      <option value="pst" className="bg-gray-800">Pacific Time</option>
                      <option value="ist" className="bg-gray-800">India Standard Time</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integration' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-white mb-4">Integrations</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center mr-3">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Google Calendar</h3>
                          <p className="text-white text-opacity-70 text-xs">Sync schedules</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-sm transition-colors">
                        Connect
                      </button>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center mr-3">
                          <Globe className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Microsoft Teams</h3>
                          <p className="text-white text-opacity-70 text-xs">Video conferencing</p>
                        </div>
                      </div>
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition-colors">
                        Connect
                      </button>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                          <Smartphone className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Mobile App</h3>
                          <p className="text-white text-opacity-70 text-xs">Push notifications</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-500 text-white rounded text-sm">
                        Connected
                      </span>
                    </div>
                  </div>

                  <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                          <Database className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-white font-medium">Student Portal</h3>
                          <p className="text-white text-opacity-70 text-xs">Data sync</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-purple-500 text-white rounded text-sm">
                        Connected
                      </span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
                  <h3 className="text-white font-medium mb-2">API Access</h3>
                  <p className="text-white text-opacity-80 text-sm mb-4">
                    Generate API keys for custom integrations
                  </p>
                  <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                    <Key className="h-4 w-4 mr-2" />
                    Generate API Key
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;