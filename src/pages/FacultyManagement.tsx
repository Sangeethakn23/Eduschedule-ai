import React, { useState } from 'react';
import { 
  Users, 
  Award, 
  Calendar, 
  Clock, 
  TrendingUp, 
  Star,
  Plus,
  Filter,
  Search,
  BookOpen,
  Target,
  Trophy,
  Zap
} from 'lucide-react';

interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  designation: string;
  workloadScore: number;
  courses: string[];
  totalHours: number;
  maxHours: number;
  rating: number;
  achievements: string[];
  status: 'active' | 'on-leave' | 'busy';
  avatar?: string;
}

const FacultyManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [sortBy, setSortBy] = useState('workload');

  const faculty: Faculty[] = [
    {
      id: '1',
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@university.edu',
      department: 'Computer Science',
      designation: 'Professor',
      workloadScore: 85,
      courses: ['Machine Learning', 'Data Mining', 'AI Ethics'],
      totalHours: 18,
      maxHours: 20,
      rating: 4.8,
      achievements: ['Best Teacher 2023', 'Research Excellence'],
      status: 'active'
    },
    {
      id: '2',
      name: 'Prof. Michael Chen',
      email: 'michael.chen@university.edu',
      department: 'Computer Science',
      designation: 'Associate Professor',
      workloadScore: 72,
      courses: ['Database Systems', 'Web Development'],
      totalHours: 14,
      maxHours: 18,
      rating: 4.6,
      achievements: ['Innovation Award', 'Student Choice'],
      status: 'active'
    },
    {
      id: '3',
      name: 'Dr. Emily Brown',
      email: 'emily.brown@university.edu',
      department: 'Management',
      designation: 'Professor',
      workloadScore: 68,
      courses: ['Digital Marketing', 'Business Strategy'],
      totalHours: 12,
      maxHours: 16,
      rating: 4.7,
      achievements: ['Leadership Excellence'],
      status: 'active'
    },
    {
      id: '4',
      name: 'Prof. David Wilson',
      email: 'david.wilson@university.edu',
      department: 'Computer Science',
      designation: 'Assistant Professor',
      workloadScore: 91,
      courses: ['Data Structures', 'Algorithms', 'Programming'],
      totalHours: 20,
      maxHours: 20,
      rating: 4.5,
      achievements: ['Rising Star'],
      status: 'busy'
    },
    {
      id: '5',
      name: 'Dr. Lisa Miller',
      email: 'lisa.miller@university.edu',
      department: 'Engineering',
      designation: 'Professor',
      workloadScore: 45,
      courses: ['Engineering Math'],
      totalHours: 8,
      maxHours: 16,
      rating: 4.9,
      achievements: ['Excellence in Teaching', 'Mentor of the Year'],
      status: 'on-leave'
    }
  ];

  const departments = ['all', 'Computer Science', 'Management', 'Engineering'];

  const filteredFaculty = faculty
    .filter(f => selectedDepartment === 'all' || f.department === selectedDepartment)
    .filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case 'workload': return b.workloadScore - a.workloadScore;
        case 'rating': return b.rating - a.rating;
        case 'name': return a.name.localeCompare(b.name);
        default: return 0;
      }
    });

  const getWorkloadColor = (score: number) => {
    if (score >= 90) return 'text-red-400 bg-red-500';
    if (score >= 75) return 'text-yellow-400 bg-yellow-500';
    if (score >= 50) return 'text-green-400 bg-green-500';
    return 'text-blue-400 bg-blue-500';
  };

  const getWorkloadLabel = (score: number) => {
    if (score >= 90) return 'Overloaded';
    if (score >= 75) return 'High Load';
    if (score >= 50) return 'Balanced';
    return 'Light Load';
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-500 bg-opacity-20';
      case 'busy': return 'text-yellow-400 bg-yellow-500 bg-opacity-20';
      case 'on-leave': return 'text-red-400 bg-red-500 bg-opacity-20';
      default: return 'text-gray-400 bg-gray-500 bg-opacity-20';
    }
  };

  const avgWorkload = faculty.reduce((sum, f) => sum + f.workloadScore, 0) / faculty.length;
  const avgRating = faculty.reduce((sum, f) => sum + f.rating, 0) / faculty.length;
  const overloadedFaculty = faculty.filter(f => f.workloadScore >= 90).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <Users className="h-8 w-8 mr-3 text-blue-400" />
              Gamified Faculty Load Balancer
            </h1>
            <p className="text-white text-opacity-80 mt-2">
              AI-powered faculty workload optimization with gamification
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            Add Faculty
          </button>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-opacity-80 text-sm">Total Faculty</p>
                <p className="text-2xl font-bold text-white">{faculty.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-opacity-80 text-sm">Avg Workload</p>
                <p className="text-2xl font-bold text-white">{avgWorkload.toFixed(0)}%</p>
              </div>
              <Target className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-opacity-80 text-sm">Avg Rating</p>
                <p className="text-2xl font-bold text-white">{avgRating.toFixed(1)}</p>
              </div>
              <Star className="h-8 w-8 text-yellow-400" />
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-opacity-80 text-sm">Overloaded</p>
                <p className="text-2xl font-bold text-red-400">{overloadedFaculty}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-red-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-white text-opacity-60" />
              <input
                type="text"
                placeholder="Search faculty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-white placeholder-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
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
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="workload" className="bg-gray-800 text-white">Sort by Workload</option>
            <option value="rating" className="bg-gray-800 text-white">Sort by Rating</option>
            <option value="name" className="bg-gray-800 text-white">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Faculty Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredFaculty.map((member) => (
          <div
            key={member.id}
            className="glass-morphism p-6 rounded-xl border border-white border-opacity-20 hover-lift"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-white">{member.name}</h3>
                  <p className="text-white text-opacity-60 text-sm">{member.designation}</p>
                  <p className="text-white text-opacity-60 text-sm">{member.department}</p>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs ${getStatusColor(member.status)}`}>
                {member.status.replace('-', ' ')}
              </div>
            </div>

            {/* Workload Gamification */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-white text-opacity-80 text-sm">Workload Score</span>
                <div className="flex items-center">
                  <Zap className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-white font-bold">{member.workloadScore}</span>
                  <span className="text-white text-opacity-60 text-sm ml-1">/100</span>
                </div>
              </div>
              <div className="w-full bg-white bg-opacity-20 rounded-full h-3 relative overflow-hidden">
                <div
                  className={`h-full rounded-full bg-opacity-30 ${getWorkloadColor(member.workloadScore)}`}
                  style={{ width: `${member.workloadScore}%` }}
                ></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xs text-white font-medium">
                    {getWorkloadLabel(member.workloadScore)}
                  </span>
                </div>
              </div>
            </div>

            {/* Teaching Load */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <Clock className="h-5 w-5 text-blue-400" />
                  <div className="text-right">
                    <p className="text-white text-sm">{member.totalHours}/{member.maxHours} hrs</p>
                    <p className="text-white text-opacity-60 text-xs">Weekly Load</p>
                  </div>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <div className="text-right">
                    <p className="text-white text-sm">{member.rating}/5.0</p>
                    <p className="text-white text-opacity-60 text-xs">Rating</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Courses */}
            <div className="mb-4">
              <p className="text-white text-opacity-80 text-sm mb-2">Current Courses:</p>
              <div className="flex flex-wrap gap-2">
                {member.courses.map((course, index) => (
                  <span
                    key={index}
                    className="flex items-center text-xs bg-blue-500 bg-opacity-20 px-2 py-1 rounded-full text-blue-300"
                  >
                    <BookOpen className="h-3 w-3 mr-1" />
                    {course}
                  </span>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="mb-4">
              <p className="text-white text-opacity-80 text-sm mb-2">Achievements:</p>
              <div className="flex flex-wrap gap-2">
                {member.achievements.map((achievement, index) => (
                  <span
                    key={index}
                    className="flex items-center text-xs bg-yellow-500 bg-opacity-20 px-2 py-1 rounded-full text-yellow-300"
                  >
                    <Trophy className="h-3 w-3 mr-1" />
                    {achievement}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-20">
              <div className="text-sm text-white text-opacity-60">
                Contact: {member.email}
              </div>
              <div className="flex items-center space-x-2">
                <button className="flex items-center px-3 py-1 bg-green-500 bg-opacity-20 text-green-300 rounded text-xs hover:bg-opacity-30 transition-colors">
                  <Award className="h-3 w-3 mr-1" />
                  Reward
                </button>
                <button className="flex items-center px-3 py-1 bg-blue-500 bg-opacity-20 text-blue-300 rounded text-xs hover:bg-opacity-30 transition-colors">
                  <Calendar className="h-3 w-3 mr-1" />
                  Schedule
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* AI Recommendations */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Zap className="h-6 w-6 mr-2 text-yellow-400" />
          AI Load Balancing Recommendations
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-red-500 bg-opacity-20 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2 flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-red-400" />
              Overload Alert
            </h4>
            <p className="text-white text-opacity-80 text-sm">
              Prof. David Wilson has 91% workload. Consider redistributing one course to maintain quality.
            </p>
          </div>
          <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
            <h4 className="text-white font-medium mb-2 flex items-center">
              <Target className="h-4 w-4 mr-2 text-green-400" />
              Optimization Opportunity
            </h4>
            <p className="text-white text-opacity-80 text-sm">
              Dr. Lisa Miller can take on 1-2 more courses after returning from leave.
            </p>
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Trophy className="h-6 w-6 mr-2 text-yellow-400" />
          Faculty Excellence Leaderboard
        </h3>
        <div className="space-y-3">
          {faculty
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 5)
            .map((member, index) => (
              <div key={member.id} className="flex items-center justify-between p-3 bg-white bg-opacity-5 rounded-lg">
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                    index === 0 ? 'bg-yellow-500 text-yellow-900' :
                    index === 1 ? 'bg-gray-400 text-gray-900' :
                    index === 2 ? 'bg-orange-600 text-orange-100' :
                    'bg-blue-500 bg-opacity-30 text-blue-300'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-white font-medium">{member.name}</p>
                    <p className="text-white text-opacity-60 text-sm">{member.department}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  <span className="text-white font-bold">{member.rating}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyManagement;