import React from 'react';
import { 
  Calendar, 
  Users, 
  Building, 
  BookOpen, 
  TrendingUp, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Zap,
  Shield
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTimetable } from '../context/TimetableContext';
import { useNotifications } from '../context/NotificationContext';

const Dashboard: React.FC = () => {
  const { user } = useUser();
  const { timetableData } = useTimetable();
  const { notifications } = useNotifications();

  const stats = [
    {
      name: 'Total Courses',
      value: timetableData.courses.length,
      icon: BookOpen,
      change: '+12%',
      changeType: 'positive' as const,
      color: 'blue'
    },
    {
      name: 'Active Faculty',
      value: '24',
      icon: Users,
      change: '+5%',
      changeType: 'positive' as const,
      color: 'green'
    },
    {
      name: 'Classrooms',
      value: '18',
      icon: Building,
      change: '0%',
      changeType: 'neutral' as const,
      color: 'purple'
    },
    {
      name: 'Students Enrolled',
      value: '1,247',
      icon: TrendingUp,
      change: '+8%',
      changeType: 'positive' as const,
      color: 'orange'
    }
  ];

  const recentActivity = [
    { id: 1, action: 'AI generated new timetable', time: '2 hours ago', type: 'success' },
    { id: 2, action: 'Blockchain verification completed', time: '4 hours ago', type: 'success' },
    { id: 3, action: 'Conflict resolved automatically', time: '6 hours ago', type: 'warning' },
    { id: 4, action: 'Faculty workload balanced', time: '1 day ago', type: 'info' }
  ];

  const upcomingClasses = timetableData.timeSlots.slice(0, 5).map(slot => ({
    ...slot,
    time: `${slot.startTime} - ${slot.endTime}`,
    date: 'Today'
  }));

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500 text-blue-100';
      case 'green': return 'bg-green-500 text-green-100';
      case 'purple': return 'bg-purple-500 text-purple-100';
      case 'orange': return 'bg-orange-500 text-orange-100';
      default: return 'bg-gray-500 text-gray-100';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-400" />;
      default: return <Clock className="h-4 w-4 text-blue-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg rounded-xl p-6 border border-white border-opacity-20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-white text-opacity-80 mt-1">
              Here's what's happening with your timetable system today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-green-500 bg-opacity-20 px-3 py-1 rounded-full">
              <Shield className="h-4 w-4 text-green-400 mr-2" />
              <span className="text-green-300 text-sm">Blockchain Secured</span>
            </div>
            <div className="flex items-center bg-blue-500 bg-opacity-20 px-3 py-1 rounded-full">
              <Zap className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-blue-300 text-sm">AI Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="glass-morphism p-6 rounded-xl border border-white border-opacity-20 hover-lift"
          >
            <div className="flex items-center">
              <div className={`p-2 rounded-lg ${getColorClasses(stat.color)}`}>
                <stat.icon className="h-6 w-6" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-white text-opacity-80">{stat.name}</p>
              <p className="text-2xl font-semibold text-white">{stat.value}</p>
            </div>
            <div className={`flex items-center mt-2 ${
              stat.changeType === 'positive' ? 'text-green-400' :
              stat.changeType === 'negative' ? 'text-red-400' : 'text-gray-400'
            }`}>
              <TrendingUp className="h-4 w-4 mr-1" />
              <span className="text-sm">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Classes */}
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Upcoming Classes</h3>
            <Calendar className="h-5 w-5 text-white text-opacity-60" />
          </div>
          <div className="space-y-4">
            {upcomingClasses.map((class_) => (
              <div
                key={class_.id}
                className="flex items-center justify-between p-4 bg-white bg-opacity-5 rounded-lg hover-lift"
              >
                <div>
                  <p className="font-medium text-white">{class_.courseName}</p>
                  <p className="text-sm text-white text-opacity-60">{class_.faculty}</p>
                  <p className="text-sm text-white text-opacity-60">{class_.room}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-white">{class_.time}</p>
                  <p className="text-sm text-white text-opacity-60">{class_.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
            <Clock className="h-5 w-5 text-white text-opacity-60" />
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center p-4 bg-white bg-opacity-5 rounded-lg hover-lift"
              >
                <div className="flex-shrink-0 mr-4">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white">{activity.action}</p>
                  <p className="text-xs text-white text-opacity-60">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <h3 className="text-lg font-semibold text-white mb-6">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="flex items-center justify-center p-4 bg-blue-500 bg-opacity-20 rounded-lg text-white hover:bg-opacity-30 transition-colors hover-lift">
            <Zap className="h-5 w-5 mr-2" />
            Generate New Timetable
          </button>
          <button className="flex items-center justify-center p-4 bg-green-500 bg-opacity-20 rounded-lg text-white hover:bg-opacity-30 transition-colors hover-lift">
            <Shield className="h-5 w-5 mr-2" />
            Verify Blockchain
          </button>
          <button className="flex items-center justify-center p-4 bg-purple-500 bg-opacity-20 rounded-lg text-white hover:bg-opacity-30 transition-colors hover-lift">
            <Users className="h-5 w-5 mr-2" />
            Balance Faculty Load
          </button>
        </div>
      </div>

      {/* System Status */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <h3 className="text-lg font-semibold text-white mb-6">System Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-medium text-white">AI Engine</p>
            <p className="text-xs text-green-400">Online</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-medium text-white">Blockchain</p>
            <p className="text-xs text-green-400">Verified</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-medium text-white">Database</p>
            <p className="text-xs text-green-400">Connected</p>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <AlertTriangle className="h-6 w-6 text-white" />
            </div>
            <p className="text-sm font-medium text-white">Notifications</p>
            <p className="text-xs text-yellow-400">{notifications.filter(n => !n.read).length} Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;