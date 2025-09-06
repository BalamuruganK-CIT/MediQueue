
export type Doctor = {
  id: string;
  name: string;
  specialization: string;
}

export const doctors: Doctor[] = [
  { id: 'doc1', name: 'Dr. Evelyn Reed', specialization: 'Cardiology' },
  { id: 'doc2', name: 'Dr. Marcus Thorne', specialization: 'Neurology' },
  { id: 'doc3', name: 'Dr. Samantha Cruz', specialization: 'Pediatrics' },
]


export type Appointment = {
  id: string;
  patientName: string;
  doctorId: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  date: string;
  time: string;
  status: 'Pending' | 'Accepted' | 'Rejected' | 'Completed';
};

export const appointments: Appointment[] = [
  { id: '1', patientName: 'John Doe', doctorId: 'doc1', age: 45, gender: 'Male', date: '2025-09-20', time: '10:00 AM', status: 'Pending' },
  { id: '2', patientName: 'Jane Smith', doctorId: 'doc2', age: 34, gender: 'Female', date: '2025-09-20', time: '11:00 AM', status: 'Accepted' },
  { id: '3', patientName: 'Robert Brown', doctorId: 'doc1', age: 52, gender: 'Male', date: '2025-09-21', time: '09:00 AM', status: 'Pending' },
  { id: '4', patientName: 'Emily White', doctorId: 'doc3', age: 28, gender: 'Female', date: '2025-09-21', time: '10:30 AM', status: 'Completed' },
  { id: '5', patientName: 'Michael Green', doctorId: 'doc2', age: 61, gender: 'Male', date: '2025-09-22', time: '02:30 PM', status: 'Rejected' },
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

export type Billing = {
  id: string;
  service: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
};

export const billingHistory: Billing[] = [
  { id: 'b1', service: 'Consultation', date: '2024-07-20', amount: 150, status: 'Paid' },
  { id: 'b2', service: 'X-Ray', date: '2024-07-20', amount: 300, status: 'Paid' },
  { id: 'b3', service: 'Blood Test', date: '2024-08-01', amount: 120, status: 'Pending' },
  { id: 'b4', service: 'Annual Checkup', date: '2023-11-12', amount: 200, status: 'Overdue' },
];
