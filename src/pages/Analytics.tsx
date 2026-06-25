import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  PieChart, 
  Activity, 
  Clock,
  Users,
  Building,
  Calendar,
  Download,
  Filter,
  Zap,
  Target
} from 'lucide-react';

const Analytics: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('week');
  const [selectedMetric, setSelectedMetric] = useState('utilization');

  const periods = [
    { value: 'day', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'semester', label: 'This Semester' }
  ];

  const metrics = [
    { value: 'utilization', label: 'Room Utilization' },
    { value: 'workload', label: 'Faculty Workload' },
    { value: 'attendance', label: 'Attendance Rates' },
    { value: 'conflicts', label: 'Schedule Conflicts' }
  ];

  // Mock data for analytics
  const utilizationData = [
    { name: 'CS-101', utilization: 85, capacity: 50, hours: 34 },
    { name: 'CS-102', utilization: 72, capacity: 45, hours: 29 },
    { name: 'MG-201', utilization: 68, capacity: 40, hours: 24 },
    { name: 'ENG-301', utilization: 91, capacity: 60, hours: 42 },
    { name: 'Lab-A', utilization: 78, capacity: 30, hours: 28 },
    { name: 'Lab-B', utilization: 65, capacity: 25, hours: 22 },
  ];

  const facultyWorkload = [
    { name: 'Dr. Johnson', workload: 85, courses: 3, hours: 18 },
    { name: 'Prof. Chen', workload: 72, courses: 2, hours: 14 },
    { name: 'Dr. Brown', workload: 68, courses: 2, hours: 12 },
    { name: 'Prof. Wilson', workload: 91, courses: 3, hours: 20 },
    { name: 'Dr. Miller', workload: 45, courses: 1, hours: 8 },
  ];

  const timeSlotData = [
    { time: '09:00-10:30', utilization: 95, conflicts: 0 },
    { time: '11:00-12:30', utilization: 88, conflicts: 1 },
    { time: '13:00-14:30', utilization: 72, conflicts: 0 },
    { time: '15:00-16:30', utilization: 65, conflicts: 2 },
    { time: '17:00-18:30', utilization: 45, conflicts: 0 },
  ];

  const departmentStats = [
    { department: 'Computer Science', courses: 12, faculty: 8, students: 450, utilization: 82 },
    { department: 'Management', courses: 8, faculty: 5, students: 320, utilization: 68 },
    { department: 'Engineering', courses: 10, faculty: 7, students: 380, utilization: 75 },
    { department: 'Mathematics', courses: 6, faculty: 4, students: 240, utilization: 71 },
  ];

  const conflictTrends = [
    { week: 'Week 1', conflicts: 12, resolved: 11 },
    { week: 'Week 2', conflicts: 8, resolved: 8 },
    { week: 'Week 3', conflicts: 15, resolved: 13 },
    { week: 'Week 4', conflicts: 6, resolved: 6 },
  ];

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return 'bg-red-500';
    if (utilization >= 75) return 'bg-yellow-500';
    if (utilization >= 50) return 'bg-green-500';
    return 'bg-blue-500';
  };

  const totalRooms = utilizationData.length;
  const avgUtilization = utilizationData.reduce((sum, room) => sum + room.utilization, 0) / totalRooms;
  const overUtilized = utilizationData.filter(room => room.utilization >= 90).length;
  const totalConflicts = conflictTrends.reduce((sum, week) => sum + week.conflicts, 0);
  const resolvedConflicts = conflictTrends.reduce((sum, week) => sum + week.resolved, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <BarChart3 className="h-8 w-8 mr-3 text-blue-400" />
              Institution Analytics Dashboard
            </h1>
            <p className="text-white text-opacity-80 mt-2">
              AI-powered insights for resource optimization and strategic planning
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors hover-lift">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </button>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value} className="bg-gray-800 text-white">
                {period.label}
              </option>
            ))}
          </select>
          <select
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
            className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {metrics.map(metric => (
              <option key={metric.value} value={metric.value} className="bg-gray-800 text-white">
                {metric.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-80 text-sm">Avg Utilization</p>
              <p className="text-2xl font-bold text-white">{avgUtilization.toFixed(0)}%</p>
              <p className="text-green-400 text-sm flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                +5% vs last week
              </p>
            </div>
            <Activity className="h-8 w-8 text-blue-400" />
          </div>
        </div>
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-80 text-sm">Over-Utilized</p>
              <p className="text-2xl font-bold text-red-400">{overUtilized}</p>
              <p className="text-red-400 text-sm">Rooms need attention</p>
            </div>
            <Building className="h-8 w-8 text-red-400" />
          </div>
        </div>
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-80 text-sm">Conflicts Resolved</p>
              <p className="text-2xl font-bold text-green-400">{resolvedConflicts}/{totalConflicts}</p>
              <p className="text-green-400 text-sm">{((resolvedConflicts/totalConflicts)*100).toFixed(0)}% success rate</p>
            </div>
            <Target className="h-8 w-8 text-green-400" />
          </div>
        </div>
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white text-opacity-80 text-sm">AI Efficiency</p>
              <p className="text-2xl font-bold text-purple-400">98.5%</p>
              <p className="text-purple-400 text-sm">Optimization rate</p>
            </div>
            <Zap className="h-8 w-8 text-purple-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Room Utilization */}
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Building className="h-6 w-6 mr-2" />
            Room Utilization Heatmap
          </h3>
          <div className="space-y-3">
            {utilizationData.map((room) => (
              <div key={room.name} className="flex items-center">
                <div className="w-20 text-white text-sm">{room.name}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-4 relative">
                    <div
                      className={`h-full rounded-full ${getUtilizationColor(room.utilization)}`}
                      style={{ width: `${room.utilization}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {room.utilization}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-16 text-white text-sm text-right">{room.hours}h</div>
              </div>
            ))}
          </div>
        </div>

        {/* Faculty Workload */}
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Users className="h-6 w-6 mr-2" />
            Faculty Workload Distribution
          </h3>
          <div className="space-y-3">
            {facultyWorkload.map((faculty) => (
              <div key={faculty.name} className="flex items-center">
                <div className="w-24 text-white text-sm truncate">{faculty.name}</div>
                <div className="flex-1 mx-4">
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-4 relative">
                    <div
                      className={`h-full rounded-full ${getUtilizationColor(faculty.workload)}`}
                      style={{ width: `${faculty.workload}%` }}
                    ></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-xs text-white font-medium">
                        {faculty.workload}%
                      </span>
                    </div>
                  </div>
                </div>
                <div className="w-12 text-white text-sm text-right">{faculty.courses}c</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Time Slot Analysis */}
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Clock className="h-6 w-6 mr-2" />
            Peak Hours Analysis
          </h3>
          <div className="space-y-4">
            {timeSlotData.map((slot) => (
              <div key={slot.time} className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{slot.time}</span>
                  <div className="flex items-center space-x-4">
                    <span className="text-white text-sm">{slot.utilization}% busy</span>
                    <span className={`text-sm ${slot.conflicts > 0 ? 'text-red-400' : 'text-green-400'}`}>
                      {slot.conflicts} conflicts
                    </span>
                  </div>
                </div>
                <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                  <div
                    className={`h-full rounded-full ${getUtilizationColor(slot.utilization)}`}
                    style={{ width: `${slot.utilization}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Comparison */}
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <PieChart className="h-6 w-6 mr-2" />
            Department Overview
          </h3>
          <div className="space-y-4">
            {departmentStats.map((dept) => (
              <div key={dept.department} className="bg-white bg-opacity-5 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-medium">{dept.department}</span>
                  <span className="text-white text-sm">{dept.utilization}% utilization</span>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-blue-400">{dept.courses}</p>
                    <p className="text-xs text-white text-opacity-60">Courses</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-green-400">{dept.faculty}</p>
                    <p className="text-xs text-white text-opacity-60">Faculty</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-purple-400">{dept.students}</p>
                    <p className="text-xs text-white text-opacity-60">Students</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conflict Resolution Trends */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Activity className="h-6 w-6 mr-2" />
          AI Conflict Resolution Trends
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {conflictTrends.map((week) => (
            <div key={week.week} className="bg-white bg-opacity-5 rounded-lg p-4 text-center">
              <h4 className="text-white font-medium mb-2">{week.week}</h4>
              <div className="space-y-2">
                <div>
                  <p className="text-2xl font-bold text-red-400">{week.conflicts}</p>
                  <p className="text-xs text-white text-opacity-60">Conflicts Detected</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">{week.resolved}</p>
                  <p className="text-xs text-white text-opacity-60">Auto-Resolved</p>
                </div>
                <div className="pt-2">
                  <span className={`text-sm ${week.conflicts === week.resolved ? 'text-green-400' : 'text-yellow-400'}`}>
                    {((week.resolved / week.conflicts) * 100).toFixed(0)}% Success
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Predictive Analytics */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Zap className="h-6 w-6 mr-2 text-yellow-400" />
          AI Predictive Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-blue-400" />
              Resource Demand Forecast
            </h4>
            <p className="text-white text-opacity-80 text-sm">
              CS department will need 2 additional classrooms next semester based on enrollment trends.
            </p>
          </div>
          <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2 flex items-center">
              <Target className="h-4 w-4 mr-2 text-green-400" />
              Optimization Opportunity
            </h4>
            <p className="text-white text-opacity-80 text-sm">
              Shifting 3 courses to off-peak hours could improve overall utilization by 12%.
            </p>
          </div>
          <div className="bg-purple-500 bg-opacity-20 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2 flex items-center">
              <Users className="h-4 w-4 mr-2 text-purple-400" />
              Faculty Planning
            </h4>
            <p className="text-white text-opacity-80 text-sm">
              Consider hiring 1 additional CS faculty member to maintain optimal workload balance.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;