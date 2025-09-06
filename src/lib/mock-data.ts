export type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'Upcoming' | 'Completed' | 'Cancelled';
};

export const appointments: Appointment[] = [
  { id: '1', doctor: 'Dr. Evelyn Reed', specialty: 'Cardiology', date: '2025-09-20', time: '10:00 AM', status: 'Upcoming' },
  { id: '2', doctor: 'Dr. Marcus Holloway', specialty: 'Neurology', date: '2025-09-22', time: '02:30 PM', status: 'Upcoming' },
  { id: '3', doctor: 'Dr. Lena Petrova', specialty: 'Dermatology', date: '2025-08-10', time: '11:00 AM', status: 'Completed' },
];

export type Prescription = {
  id: string;
  medication: string;
  dosage: string;
  frequency: string;
  doctor: string;
  dateIssued: string;
};

export const prescriptions: Prescription[] = [
  { id: 'p1', medication: 'Lisinopril', dosage: '10mg', frequency: 'Once a day', doctor: 'Dr. Evelyn Reed', dateIssued: '2024-07-20' },
  { id: 'p2', medication: 'Metformin', dosage: '500mg', frequency: 'Twice a day', doctor: 'Dr. John Smith', dateIssued: '2024-06-10' },
];

export type LabResult = {
  id: string;
  testName: string;
  result: string;
  referenceRange: string;
  date: string;
};

export const labResults: LabResult[] = [
  { id: 'lr1', testName: 'Cholesterol Panel', result: 'HDL: 55 mg/dL, LDL: 90 mg/dL', referenceRange: 'HDL: >40, LDL: <100', date: '2024-07-22' },
  { id: 'lr2', testName: 'A1C', result: '5.5%', referenceRange: '< 5.7%', date: '2024-06-12' },
];

export type MedicalHistoryEvent = {
  id: string;
  event: string;
  date: string;
  doctor: string;
  notes: string;
};

export const medicalHistory: MedicalHistoryEvent[] = [
  { id: 'mh1', event: 'Annual Check-up', date: '2024-07-20', doctor: 'Dr. Evelyn Reed', notes: 'Patient in good health. Blood pressure normal.' },
  { id: 'mh2', event: 'Initial Consultation', date: '2023-05-15', doctor: 'Dr. John Smith', notes: 'Diagnosed with Type 2 Diabetes.' },
];

export type MedicationReminder = {
  id: string;
  medication: string;
  dosage: string;
  time: string;
};

export const medicationReminders: MedicationReminder[] = [
  { id: 'mr1', medication: 'Lisinopril', dosage: '10mg', time: '08:00 AM' },
  { id: 'mr2', medication: 'Metformin', dosage: '500mg', time: '09:00 AM' },
  { id: 'mr3', medication: 'Metformin', dosage: '500mg', time: '09:00 PM' },
];

export type Resource = {
  id: string;
  title: string;
  description: string;
  category: 'Article' | 'Video';
  imageUrl: string;
  link: string;
};

export const resourceLibrary: Resource[] = [
  { id: 'r1', title: 'Understanding Your Heart Health', description: 'A comprehensive guide to cardiovascular wellness.', category: 'Article', imageUrl: 'https://picsum.photos/600/400', link: '#' },
  { id: 'r2', title: 'Healthy Eating for a Healthy Life', description: 'Learn about nutrition and how it impacts your body.', category: 'Article', imageUrl: 'https://picsum.photos/600/400', link: '#' },
  { id: 'r3', title: 'Beginner Yoga for Stress Relief', description: 'Follow along with this 20-minute yoga session.', category: 'Video', imageUrl: 'https://picsum.photos/600/400', link: '#' },
  { id: 'r4', title: 'Managing Diabetes Effectively', description: 'Tips and tricks for daily diabetes management.', category: 'Article', imageUrl: 'https://picsum.photos/600/400', link: '#' },
  { id: 'r5', title: 'The Importance of Sleep', description: 'Discover how sleep affects your overall health.', category: 'Article', imageUrl: 'https://picsum.photos/600/400', link: '#' },
  { id: 'r6', title: 'Guided Meditation for Anxiety', description: 'A 10-minute guided meditation to calm your mind.', category: 'Video', imageUrl: 'https://picsum.photos/600/400', link: '#' },
];
