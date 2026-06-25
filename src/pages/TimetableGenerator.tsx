import React, { useState } from 'react';
import { 
  Zap, 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Brain, 
  Shield,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  Download,
  Upload
} from 'lucide-react';
import { useTimetable } from '../context/TimetableContext';
import { useNotifications } from '../context/NotificationContext';

const TimetableGenerator: React.FC = () => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const { timetableData, generateTimetable, resolveConflicts } = useTimetable();
  const { addNotification } = useNotifications();

  const departments = ['all', 'Computer Science', 'Management', 'Engineering', 'Mathematics'];
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = ['09:00-10:30', '11:00-12:30', '13:00-14:30', '15:00-16:30', '17:00-18:30'];

  const handleGenerateTimetable = async () => {
    setIsGenerating(true);
    try {
      await generateTimetable();
      addNotification({
        type: 'success',
        title: 'Timetable Generated',
        message: 'AI has successfully generated a conflict-free timetable and secured it on blockchain.'
      });
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Generation Failed',
        message: 'Failed to generate timetable. Please try again.'
      });
    }
    setIsGenerating(false);
  };

  const handleResolveConflicts = () => {
    resolveConflicts();
    addNotification({
      type: 'success',
      title: 'Conflicts Resolved',
      message: 'All timetable conflicts have been automatically resolved by AI.'
    });
  };

  const filteredTimeSlots = selectedDepartment === 'all' 
    ? timetableData.timeSlots 
    : timetableData.timeSlots.filter(slot => slot.department === selectedDepartment);

  const getTimeSlotForDayTime = (day: string, time: string) => {
    const [startTime] = time.split('-');
    return filteredTimeSlots.find(slot => slot.day === day && slot.startTime === startTime);
  };

  const getConflictColor = (conflicts: number) => {
    if (conflicts === 0) return 'text-green-400';
    if (conflicts <= 2) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <Brain className="h-8 w-8 mr-3 text-blue-400" />
              AI Timetable Generator
            </h1>
            <p className="text-white text-opacity-80 mt-2">
              Generate conflict-free timetables with AI-powered optimization
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="flex items-center bg-green-500 bg-opacity-20 px-3 py-1 rounded-full text-green-300 text-sm">
              <Shield className="h-4 w-4 mr-2" />
              Blockchain Secured: {timetableData.blockchainHash}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4">
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {departments.map(dept => (
              <option key={dept} value={dept} className="bg-gray-800 text-white">
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>

          <button
            onClick={handleGenerateTimetable}
            disabled={isGenerating}
            className="flex items-center px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors hover-lift disabled:opacity-50"
          >
            {isGenerating ? (
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <Zap className="h-4 w-4 mr-2" />
            )}
            {isGenerating ? 'Generating...' : 'Generate AI Timetable'}
          </button>

          <button
            onClick={handleResolveConflicts}
            className="flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors hover-lift"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            Resolve Conflicts ({timetableData.conflicts.filter(c => !c.resolved).length})
          </button>

          <button className="flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors hover-lift">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>

          <button className="flex items-center px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors hover-lift">
            <Upload className="h-4 w-4 mr-2" />
            Import
          </button>
        </div>
      </div>

      {/* Conflicts Panel */}
      {timetableData.conflicts.filter(c => !c.resolved).length > 0 && (
        <div className="glass-morphism p-6 rounded-xl border border-red-500 border-opacity-50">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-red-400 mr-3" />
            <h3 className="text-lg font-semibold text-white">Detected Conflicts</h3>
          </div>
          <div className="space-y-3">
            {timetableData.conflicts.filter(c => !c.resolved).map(conflict => (
              <div key={conflict.id} className="bg-red-500 bg-opacity-20 p-4 rounded-lg">
                <p className="text-white font-medium">{conflict.description}</p>
                <p className="text-red-300 text-sm mt-1">
                  Affected: {conflict.affected.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20 text-center">
          <Brain className="h-8 w-8 text-blue-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white">AI Efficiency</h3>
          <p className="text-2xl font-bold text-blue-400">98.5%</p>
          <p className="text-sm text-white text-opacity-60">Optimization Rate</p>
        </div>
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20 text-center">
          <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white">Conflicts Resolved</h3>
          <p className="text-2xl font-bold text-green-400">
            {timetableData.conflicts.filter(c => c.resolved).length}
          </p>
          <p className="text-sm text-white text-opacity-60">Auto-fixed</p>
        </div>
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20 text-center">
          <Clock className="h-8 w-8 text-purple-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white">Generation Time</h3>
          <p className="text-2xl font-bold text-purple-400">2.3s</p>
          <p className="text-sm text-white text-opacity-60">Last Run</p>
        </div>
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20 text-center">
          <Shield className="h-8 w-8 text-green-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white">Blockchain</h3>
          <p className="text-2xl font-bold text-green-400">Verified</p>
          <p className="text-sm text-white text-opacity-60">Tamper-proof</p>
        </div>
      </div>

      {/* Timetable Grid */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-white">Generated Timetable</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-white text-opacity-60">
              Last updated: {timetableData.lastUpdated.toLocaleString()}
            </span>
            <div className={`flex items-center ${getConflictColor(timetableData.conflicts.filter(c => !c.resolved).length)}`}>
              <AlertTriangle className="h-4 w-4 mr-1" />
              <span className="text-sm">
                {timetableData.conflicts.filter(c => !c.resolved).length} conflicts
              </span>
            </div>
          </div>
        </div>

        {/* Timetable */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white border-opacity-20">
                <th className="text-left py-3 px-4 text-white font-medium">Time / Day</th>
                {days.map(day => (
                  <th key={day} className="text-center py-3 px-4 text-white font-medium">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {timeSlots.map(time => (
                <tr key={time} className="border-b border-white border-opacity-10">
                  <td className="py-4 px-4 text-white font-medium">{time}</td>
                  {days.map(day => {
                    const slot = getTimeSlotForDayTime(day, time);
                    return (
                      <td key={`${day}-${time}`} className="py-2 px-2 text-center">
                        {slot ? (
                          <div className="bg-blue-500 bg-opacity-30 rounded-lg p-3 hover-lift cursor-pointer">
                            <div className="text-white font-medium text-sm">{slot.courseName}</div>
                            <div className="text-white text-opacity-80 text-xs">{slot.faculty}</div>
                            <div className="flex items-center justify-center mt-2 text-xs text-white text-opacity-60">
                              <MapPin className="h-3 w-3 mr-1" />
                              {slot.room}
                            </div>
                            <div className="flex items-center justify-center mt-1 text-xs text-white text-opacity-60">
                              <Users className="h-3 w-3 mr-1" />
                              {slot.students}
                            </div>
                          </div>
                        ) : (
                          <div className="h-20 bg-white bg-opacity-5 rounded-lg flex items-center justify-center">
                            <span className="text-white text-opacity-40 text-xs">Free</span>
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4">AI Optimization Features</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
              <span className="text-white">Automatic conflict detection</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
              <span className="text-white">Smart resource allocation</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
              <span className="text-white">Faculty workload balancing</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
              <span className="text-white">Multi-department integration</span>
            </div>
          </div>
        </div>

        <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
          <h3 className="text-lg font-semibold text-white mb-4">Blockchain Security</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-400 mr-3" />
              <span className="text-white">Tamper-proof records</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-400 mr-3" />
              <span className="text-white">Transparent audit trail</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-400 mr-3" />
              <span className="text-white">Immutable scheduling</span>
            </div>
            <div className="flex items-center">
              <Shield className="h-5 w-5 text-blue-400 mr-3" />
              <span className="text-white">Decentralized verification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimetableGenerator;