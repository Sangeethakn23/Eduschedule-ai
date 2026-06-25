import React, { useState } from 'react';
import { Building, MapPin, Users, Monitor, Wifi, Projector, CheckCircle, AlertTriangle, Plus, CreditCard as Edit, Eye, BarChart3 } from 'lucide-react';

interface Resource {
  id: string;
  name: string;
  type: 'classroom' | 'lab' | 'auditorium' | 'library';
  capacity: number;
  location: string;
  equipment: string[];
  status: 'available' | 'occupied' | 'maintenance';
  utilization: number;
  bookings: number;
}

const ResourceManagement: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const resources: Resource[] = [
    {
      id: '1',
      name: 'CS-101',
      type: 'classroom',
      capacity: 50,
      location: 'Computer Science Building, Floor 1',
      equipment: ['Projector', 'WiFi', 'Whiteboard', 'AC'],
      status: 'available',
      utilization: 75,
      bookings: 6
    },
    {
      id: '2',
      name: 'CS-Lab-A',
      type: 'lab',
      capacity: 30,
      location: 'Computer Science Building, Floor 2',
      equipment: ['30 PCs', 'Projector', 'WiFi', 'Server Access'],
      status: 'occupied',
      utilization: 90,
      bookings: 8
    },
    {
      id: '3',
      name: 'Main Auditorium',
      type: 'auditorium',
      capacity: 300,
      location: 'Central Building, Ground Floor',
      equipment: ['Sound System', 'Projector', 'WiFi', 'Recording Setup'],
      status: 'available',
      utilization: 45,
      bookings: 3
    },
    {
      id: '4',
      name: 'MG-201',
      type: 'classroom',
      capacity: 40,
      location: 'Management Building, Floor 2',
      equipment: ['Smart Board', 'WiFi', 'AC'],
      status: 'maintenance',
      utilization: 0,
      bookings: 0
    },
    {
      id: '5',
      name: 'Central Library',
      type: 'library',
      capacity: 150,
      location: 'Library Building, All Floors',
      equipment: ['WiFi', 'Study Pods', 'Digital Resources'],
      status: 'available',
      utilization: 65,
      bookings: 12
    },
    {
      id: '6',
      name: 'ENG-Lab-B',
      type: 'lab',
      capacity: 25,
      location: 'Engineering Building, Floor 3',
      equipment: ['Specialized Equipment', 'Safety Systems', 'WiFi'],
      status: 'available',
      utilization: 80,
      bookings: 5
    }
  ];

  const resourceTypes = [
    { value: 'all', label: 'All Resources', count: resources.length },
    { value: 'classroom', label: 'Classrooms', count: resources.filter(r => r.type === 'classroom').length },
    { value: 'lab', label: 'Labs', count: resources.filter(r => r.type === 'lab').length },
    { value: 'auditorium', label: 'Auditoriums', count: resources.filter(r => r.type === 'auditorium').length },
    { value: 'library', label: 'Libraries', count: resources.filter(r => r.type === 'library').length }
  ];

  const filteredResources = selectedType === 'all' 
    ? resources 
    : resources.filter(resource => resource.type === selectedType);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-400 bg-green-500 bg-opacity-20';
      case 'occupied': return 'text-yellow-400 bg-yellow-500 bg-opacity-20';
      case 'maintenance': return 'text-red-400 bg-red-500 bg-opacity-20';
      default: return 'text-gray-400 bg-gray-500 bg-opacity-20';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4" />;
      case 'occupied': return <Users className="h-4 w-4" />;
      case 'maintenance': return <AlertTriangle className="h-4 w-4" />;
      default: return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'classroom': return <Building className="h-6 w-6" />;
      case 'lab': return <Monitor className="h-6 w-6" />;
      case 'auditorium': return <Users className="h-6 w-6" />;
      case 'library': return <Building className="h-6 w-6" />;
      default: return <Building className="h-6 w-6" />;
    }
  };

  const getEquipmentIcon = (equipment: string) => {
    if (equipment.toLowerCase().includes('projector')) return <Projector className="h-4 w-4" />;
    if (equipment.toLowerCase().includes('wifi')) return <Wifi className="h-4 w-4" />;
    if (equipment.toLowerCase().includes('pc') || equipment.toLowerCase().includes('computer')) return <Monitor className="h-4 w-4" />;
    return <CheckCircle className="h-4 w-4" />;
  };

  const totalCapacity = resources.reduce((sum, resource) => sum + resource.capacity, 0);
  const avgUtilization = resources.reduce((sum, resource) => sum + resource.utilization, 0) / resources.length;
  const availableResources = resources.filter(r => r.status === 'available').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center">
              <Building className="h-8 w-8 mr-3 text-blue-400" />
              Smart Resource Management
            </h1>
            <p className="text-white text-opacity-80 mt-2">
              AI-optimized classroom and facility allocation system
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors hover-lift">
            <Plus className="h-4 w-4 mr-2" />
            Add Resource
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-opacity-80 text-sm">Total Resources</p>
                <p className="text-2xl font-bold text-white">{resources.length}</p>
              </div>
              <Building className="h-8 w-8 text-blue-400" />
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-opacity-80 text-sm">Available Now</p>
                <p className="text-2xl font-bold text-green-400">{availableResources}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-400" />
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-opacity-80 text-sm">Total Capacity</p>
                <p className="text-2xl font-bold text-white">{totalCapacity.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-purple-400" />
            </div>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white text-opacity-80 text-sm">Avg Utilization</p>
                <p className="text-2xl font-bold text-white">{avgUtilization.toFixed(0)}%</p>
              </div>
              <BarChart3 className="h-8 w-8 text-orange-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {resourceTypes.map(type => (
              <button
                key={type.value}
                onClick={() => setSelectedType(type.value)}
                className={`px-4 py-2 rounded-lg transition-colors hover-lift ${
                  selectedType === type.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-white bg-opacity-10 text-white hover:bg-opacity-20'
                }`}
              >
                {type.label} ({type.count})
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'grid' ? 'bg-blue-500 text-white' : 'bg-white bg-opacity-10 text-white'
              }`}
            >
              <Building className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-lg transition-colors ${
                viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white bg-opacity-10 text-white'
              }`}
            >
              <BarChart3 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Resources Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="glass-morphism p-6 rounded-xl border border-white border-opacity-20 hover-lift"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  {getTypeIcon(resource.type)}
                  <h3 className="text-lg font-semibold text-white ml-2">{resource.name}</h3>
                </div>
                <div className={`flex items-center px-2 py-1 rounded-full text-xs ${getStatusColor(resource.status)}`}>
                  {getStatusIcon(resource.status)}
                  <span className="ml-1 capitalize">{resource.status}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-white text-opacity-80">
                  <MapPin className="h-4 w-4 mr-2" />
                  <span className="text-sm">{resource.location}</span>
                </div>
                <div className="flex items-center text-white text-opacity-80">
                  <Users className="h-4 w-4 mr-2" />
                  <span className="text-sm">Capacity: {resource.capacity}</span>
                </div>

                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-white text-opacity-80">Utilization</span>
                    <span className="text-sm text-white font-medium">{resource.utilization}%</span>
                  </div>
                  <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        resource.utilization > 80 ? 'bg-red-500' :
                        resource.utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${resource.utilization}%` }}
                    ></div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-white text-opacity-80 mb-2">Equipment:</p>
                  <div className="flex flex-wrap gap-2">
                    {resource.equipment.slice(0, 3).map((item, index) => (
                      <span
                        key={index}
                        className="flex items-center text-xs bg-white bg-opacity-10 px-2 py-1 rounded-full text-white"
                      >
                        {getEquipmentIcon(item)}
                        <span className="ml-1">{item}</span>
                      </span>
                    ))}
                    {resource.equipment.length > 3 && (
                      <span className="text-xs bg-white bg-opacity-10 px-2 py-1 rounded-full text-white">
                        +{resource.equipment.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-white border-opacity-20">
                  <span className="text-sm text-white text-opacity-80">
                    {resource.bookings} bookings today
                  </span>
                  <div className="flex items-center space-x-2">
                    <button className="p-1 rounded text-white hover:bg-white hover:bg-opacity-10 transition-colors">
                      <Eye className="h-4 w-4" />
                    </button>
                    <button className="p-1 rounded text-white hover:bg-white hover:bg-opacity-10 transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="glass-morphism rounded-xl border border-white border-opacity-20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-white bg-opacity-10">
                <tr>
                  <th className="text-left py-4 px-6 text-white font-medium">Resource</th>
                  <th className="text-left py-4 px-6 text-white font-medium">Type</th>
                  <th className="text-left py-4 px-6 text-white font-medium">Capacity</th>
                  <th className="text-left py-4 px-6 text-white font-medium">Status</th>
                  <th className="text-left py-4 px-6 text-white font-medium">Utilization</th>
                  <th className="text-left py-4 px-6 text-white font-medium">Bookings</th>
                  <th className="text-left py-4 px-6 text-white font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredResources.map((resource) => (
                  <tr key={resource.id} className="border-t border-white border-opacity-10 hover:bg-white hover:bg-opacity-5">
                    <td className="py-4 px-6">
                      <div>
                        <div className="text-white font-medium">{resource.name}</div>
                        <div className="text-white text-opacity-60 text-sm">{resource.location}</div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        {getTypeIcon(resource.type)}
                        <span className="text-white capitalize ml-2">{resource.type}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white">{resource.capacity}</td>
                    <td className="py-4 px-6">
                      <div className={`flex items-center px-2 py-1 rounded-full text-xs w-fit ${getStatusColor(resource.status)}`}>
                        {getStatusIcon(resource.status)}
                        <span className="ml-1 capitalize">{resource.status}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center">
                        <div className="w-16 bg-white bg-opacity-20 rounded-full h-2 mr-2">
                          <div
                            className={`h-2 rounded-full ${
                              resource.utilization > 80 ? 'bg-red-500' :
                              resource.utilization > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${resource.utilization}%` }}
                          ></div>
                        </div>
                        <span className="text-white text-sm">{resource.utilization}%</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-white">{resource.bookings}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <button className="p-1 rounded text-white hover:bg-white hover:bg-opacity-10 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="p-1 rounded text-white hover:bg-white hover:bg-opacity-10 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* AI Suggestions */}
      <div className="glass-morphism p-6 rounded-xl border border-white border-opacity-20">
        <h3 className="text-lg font-semibold text-white mb-4">AI Optimization Suggestions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-blue-500 bg-opacity-20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <BarChart3 className="h-5 w-5 text-blue-400 mr-2" />
              <h4 className="text-white font-medium">Resource Optimization</h4>
            </div>
            <p className="text-white text-opacity-80 text-sm">
              CS-101 has 75% utilization. Consider moving some classes to MG-201 after maintenance.
            </p>
          </div>
          <div className="bg-green-500 bg-opacity-20 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <h4 className="text-white font-medium">Equipment Suggestion</h4>
            </div>
            <p className="text-white text-opacity-80 text-sm">
              Add recording equipment to CS-Lab-A for better hybrid learning support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceManagement;