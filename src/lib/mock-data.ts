export type Appointment = {
  id: string;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  date: string;
  time: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
};

export const appointments: Appointment[] = [
  { id: '1', patientName: 'John Doe', age: 45, gender: 'Male', date: '2025-09-20', time: '10:00 AM', status: 'Pending' },
  { id: '2', patientName: 'Jane Smith', age: 34, gender: 'Female', date: '2025-09-20', time: '11:00 AM', status: 'Accepted' },
  { id: '3', patientName: 'Robert Brown', age: 52, gender: 'Male', date: '2025-09-21', time: '09:00 AM', status: 'Pending' },
  { id: '4', patientName: 'Emily White', age: 28, gender: 'Female', date: '2025-09-21', time: '10:30 AM', status: 'Completed' },
  { id: '5', patientName: 'Michael Green', age: 61, gender: 'Male', date: '2025-09-22', time: '02:30 PM', status: 'Rejected' },
];


export type Prescription = {
  id: string;
  patientName: string;
  medication: string;
  dosage: string;
  frequency: string;
  dateIssued: string;
};

export const prescriptions: Prescription[] = [
  { id: 'p1', patientName: 'John Doe', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once a day', dateIssued: '2024-07-20' },
  { id: 'p2', patientName: 'Jane Smith', medication: 'Metformin', dosage: '500mg', frequency: 'Twice a day', dateIssued: '2024-06-10' },
  { id: 'p3', patientName: 'Emily White', medication: 'Amoxicillin', dosage: '250mg', frequency: 'Thrice a day', dateIssued: '2024-08-01' },
];

export type Patient = {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  lastVisit: string;
  status: 'Active' | 'Inactive';
};

export const patients: Patient[] = [
  { id: 'pt1', name: 'John Doe', age: 45, gender: 'Male', lastVisit: '2024-07-20', status: 'Active' },
  { id: 'pt2', name: 'Jane Smith', age: 34, gender: 'Female', lastVisit: '2024-06-10', status: 'Active' },
  { id: 'pt3', name: 'Emily White', age: 28, gender: 'Female', lastVisit: '2024-08-01', status: 'Active' },
  { id: 'pt4', name: 'Robert Brown', age: 52, gender: 'Male', lastVisit: '2023-11-12', status: 'Inactive' },
  { id: 'pt5', name: 'Jessica Davis', age: 41, gender: 'Female', lastVisit: '2024-08-15', status: 'Active' },
];
