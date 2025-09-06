"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import DoctorDashboard from './doctor/page';
import AdminDashboard from './admin/page';
import PatientDashboard from './patient/page';

function DashboardController() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  useEffect(() => {
    if (!role) {
      // Default to patient if no role is specified, or redirect to login
      router.push('/dashboard?role=patient');
    }
  }, [role, router]);

  if (role === 'doctor') {
    return <DoctorDashboard />;
  }

  if (role === 'admin') {
    return <AdminDashboard />;
  }
  
  // Default to patient dashboard
  return <PatientDashboard />;
}


export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardController />
        </Suspense>
    )
}
