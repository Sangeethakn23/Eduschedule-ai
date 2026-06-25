import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  department: string;
  faculty: string;
  type: 'core' | 'elective';
}

export interface TimeSlot {
  id: string;
  courseId: string;
  courseName: string;
  faculty: string;
  room: string;
  day: string;
  startTime: string;
  endTime: string;
  students: number;
  department: string;
}

export interface TimetableData {
  courses: Course[];
  timeSlots: TimeSlot[];
  conflicts: Array<{
    id: string;
    type: 'room' | 'faculty' | 'student';
    description: string;
    affected: string[];
    resolved: boolean;
  }>;
  blockchainHash: string;
  lastUpdated: Date;
}

interface TimetableContextType {
  timetableData: TimetableData;
  updateTimetable: (data: Partial<TimetableData>) => void;
  generateTimetable: () => Promise<void>;
  resolveConflicts: () => void;
}

const TimetableContext = createContext<TimetableContextType | undefined>(undefined);

export const TimetableProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [timetableData, setTimetableData] = useState<TimetableData>({
    courses: [
      { id: '1', name: 'Machine Learning', code: 'CS501', credits: 3, department: 'Computer Science', faculty: 'Dr. Johnson', type: 'core' },
      { id: '2', name: 'Database Systems', code: 'CS502', credits: 3, department: 'Computer Science', faculty: 'Prof. Williams', type: 'core' },
      { id: '3', name: 'Digital Marketing', code: 'MG301', credits: 2, department: 'Management', faculty: 'Dr. Brown', type: 'elective' },
      { id: '4', name: 'Data Structures', code: 'CS201', credits: 4, department: 'Computer Science', faculty: 'Prof. Davis', type: 'core' },
      { id: '5', name: 'Web Development', code: 'CS401', credits: 3, department: 'Computer Science', faculty: 'Dr. Miller', type: 'elective' }
    ],
    timeSlots: [
      { id: '1', courseId: '1', courseName: 'Machine Learning', faculty: 'Dr. Johnson', room: 'CS-101', day: 'Monday', startTime: '09:00', endTime: '10:30', students: 45, department: 'Computer Science' },
      { id: '2', courseId: '2', courseName: 'Database Systems', faculty: 'Prof. Williams', room: 'CS-102', day: 'Monday', startTime: '11:00', endTime: '12:30', students: 38, department: 'Computer Science' },
      { id: '3', courseId: '3', courseName: 'Digital Marketing', faculty: 'Dr. Brown', room: 'MG-201', day: 'Tuesday', startTime: '14:00', endTime: '15:30', students: 32, department: 'Management' },
      { id: '4', courseId: '4', courseName: 'Data Structures', faculty: 'Prof. Davis', room: 'CS-103', day: 'Wednesday', startTime: '09:00', endTime: '11:00', students: 42, department: 'Computer Science' },
      { id: '5', courseId: '5', courseName: 'Web Development', faculty: 'Dr. Miller', room: 'CS-104', day: 'Thursday', startTime: '13:00', endTime: '14:30', students: 35, department: 'Computer Science' }
    ],
    conflicts: [
      { id: '1', type: 'room', description: 'Room CS-101 double booked on Friday 2PM', affected: ['CS501', 'CS401'], resolved: false }
    ],
    blockchainHash: '0x1a2b3c4d5e6f7890abcdef',
    lastUpdated: new Date()
  });

  const updateTimetable = (data: Partial<TimetableData>) => {
    setTimetableData(prev => ({
      ...prev,
      ...data,
      lastUpdated: new Date()
    }));
  };

  const generateTimetable = async () => {
    // Simulate AI timetable generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate new blockchain hash
    const newHash = '0x' + Math.random().toString(16).substr(2, 16);
    
    updateTimetable({
      blockchainHash: newHash,
      conflicts: [], // AI resolved all conflicts
      lastUpdated: new Date()
    });
  };

  const resolveConflicts = () => {
    setTimetableData(prev => ({
      ...prev,
      conflicts: prev.conflicts.map(conflict => ({ ...conflict, resolved: true })),
      lastUpdated: new Date()
    }));
  };

  return (
    <TimetableContext.Provider value={{ timetableData, updateTimetable, generateTimetable, resolveConflicts }}>
      {children}
    </TimetableContext.Provider>
  );
};

export const useTimetable = () => {
  const context = useContext(TimetableContext);
  if (context === undefined) {
    throw new Error('useTimetable must be used within a TimetableProvider');
  }
  return context;
};