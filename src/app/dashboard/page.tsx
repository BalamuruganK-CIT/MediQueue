"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, Suspense } from 'react';
import DoctorDashboard from './doctor/page';
import AdminDashboard from './admin/page';

function DashboardController() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get('role');

  useEffect(() => {
    if (!role) {
      // Default to admin if no role is specified, or redirect to login
      router.push('/dashboard?role=admin');
    }
  }, [role, router]);

  if (role === 'doctor') {
    return <DoctorDashboard />;
  }
  
  // Default to admin dashboard
  return <AdminDashboard />;
}


export default function DashboardPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <DashboardController />
        </Suspense>
    )
}
