// import React from 'react'

// const dashBoardLayout = ({ children }) => {
//   return (
//     <div>

// <main>{children}</main>

//     </div>
//   )
// }

// export default dashBoardLayout

// // app/dashboard/layout.js
// 'use client';

// import { useAuth } from '@/contexts/AuthContext';
// import { useRouter } from 'next/navigation';
// import { useEffect, useState } from 'react';
// // import Sidebar from '@/components/dashboard/Sidebar';
// // import LoadingSpinner from '@/components/ui/LoadingSpinner';
// import Sidebar from '@/Components/Sidebar';

// export default function DashboardLayout({ children }) {
//   const { user, loading } = useAuth();
//   const router = useRouter();
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   useEffect(() => {
//     if (!loading && !user && isClient) {
//       router.push('/login');
//     }
//   }, [user, loading, router, isClient]);

//   if (loading || !isClient) {
//     return (
//       <div className="flex h-screen items-center justify-center bg-gray-50">
//         {/* <LoadingSpinner /> */}
//       </div>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   return (
//     <div className="flex h-screen bg-gray-50 overflow-hidden">
//       {/* <Sidebar user={user} /> */}
//       <Sidebar user={user} />
//       <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
//         <div className="max-w-7xl mx-auto">
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// }