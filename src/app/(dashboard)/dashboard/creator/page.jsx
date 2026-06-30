// // "use client";

// // import React, { useState } from 'react';
// // import { 
// //   LineChart, Line, BarChart, Bar, 
// //   XAxis, YAxis, Tooltip, 
// //   ResponsiveContainer, CartesianGrid 
// // } from 'recharts';

// // // Swapped lucide-react for react-icons
// // import { FaTerminal, FaRegCopy, FaRegBookmark } from 'react-icons/fa';

// // // Mock Data
// // const summaryData = {
// //   totalPrompts: 142,
// //   totalCopies: 4820,
// //   totalBookmarks: 890,
// // };

// // const analyticsData = [
// //   { name: 'Jan', copies: 400, prompts: 12 },
// //   { name: 'Feb', copies: 800, prompts: 25 },
// //   { name: 'Mar', copies: 1200, prompts: 42 },
// //   { name: 'Apr', copies: 1900, prompts: 60 },
// //   { name: 'May', copies: 2800, prompts: 95 },
// //   { name: 'Jun', copies: 4820, prompts: 142 },
// // ];

// // // ✅ FIXED: Added the 'default' keyword back
// // export default function CreatorDashboard() {
// //   return (
    
// // //     <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen">
      
// // //   {/* Header */}
// // //   <div>
// // //     <h1 className="text-3xl font-bold text-white dark:text-white">Creator Dashboard</h1>
// // //     <p className="text-gray-500 dark:text-gray-400 mt-1">Track your prompt performance and growth metrics.</p>
// // //   </div>

// // //   {/* --- Summary Cards Section --- */}
// // //   {/* Removed bg-white and border-gray-100, added a semi-transparent border or backdrop if needed */}
// // //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
// // //     {/* Total Prompts Card */}
// // //     <div className="p-6 rounded-xl border border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between backdrop-blur-sm">
// // //       <div>
// // //         <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Prompts</p>
// // //         <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{summaryData.totalPrompts}</h3>
// // //       </div>
// // //       <div className="p-3 bg-blue-500/10 rounded-lg text-blue-600 dark:text-blue-400">
// // //         <FaTerminal className="w-6 h-6" />
// // //       </div>
// // //     </div>

// // //     {/* Total Copies Card */}
// // //     <div className="p-6 rounded-xl border border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between backdrop-blur-sm">
// // //       <div>
// // //         <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Copies</p>
// // //         <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{summaryData.totalCopies.toLocaleString()}</h3>
// // //       </div>
// // //       <div className="p-3 bg-green-500/10 rounded-lg text-green-600 dark:text-green-400">
// // //         <FaRegCopy className="w-6 h-6" />
// // //       </div>
// // //     </div>

// // //     {/* Total Bookmarks Card */}
// // //     <div className="p-6 rounded-xl border border-gray-200/50 dark:border-gray-800/50 flex items-center justify-between backdrop-blur-sm">
// // //       <div>
// // //         <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Bookmarks</p>
// // //         <h3 className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{summaryData.totalBookmarks.toLocaleString()}</h3>
// // //       </div>
// // //       <div className="p-3 bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
// // //         <FaRegBookmark className="w-6 h-6" />
// // //       </div>
// // //     </div>

// // //   </div>

// // //   {/* --- Analytics Charts Section --- */}
// // //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
// // //     {/* Chart 1: Total Copies (Bar Chart) */}
// // //     <div className="p-6 rounded-xl border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
// // //       <div className="mb-4">
// // //         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Total Copies Over Time</h3>
// // //         <p className="text-sm text-gray-500 dark:text-gray-400">Monthly breakdown of how many times your prompts were copied.</p>
// // //       </div>
// // //       <div className="h-80 w-full">
// // //         <ResponsiveContainer width="100%" height="100%">
// // //           <BarChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
// // //             {/* Made grid lines softer using opacity */}
// // //             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10 text-gray-500" />
// // //             <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
// // //             <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
// // //             <Tooltip 
// // //               contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }}
// // //             />
// // //             <Bar dataKey="copies" fill="#10b981" radius={[4, 4, 0, 0]} name="Copies" />
// // //           </BarChart>
// // //         </ResponsiveContainer>
// // //       </div>
// // //     </div>

// // //     {/* Chart 2: Prompt Growth (Line Chart) */}
// // //     <div className="p-6 rounded-xl border border-gray-200/50 dark:border-gray-800/50 backdrop-blur-sm">
// // //       <div className="mb-4">
// // //         <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Prompt Growth</h3>
// // //         <p className="text-sm text-gray-500 dark:text-gray-400">Cumulative total of published prompts on your profile.</p>
// // //       </div>
// // //       <div className="h-80 w-full">
// // //         <ResponsiveContainer width="100%" height="100%">
// // //           <LineChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
// // //             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="opacity-10 text-gray-500" />
// // //             <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
// // //             <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
// // //             <Tooltip 
// // //               contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(8px)', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.1)' }}
// // //             />
// // //             <Line 
// // //               type="monotone" 
// // //               dataKey="prompts" 
// // //               stroke="#3b82f6" 
// // //               strokeWidth={3} 
// // //               dot={{ r: 4, strokeWidth: 2 }} 
// // //               activeDot={{ r: 6 }}
// // //               name="Total Prompts" 
// // //             />
// // //           </LineChart>
// // //         </ResponsiveContainer>
// // //       </div>
// // //     </div>

// // //   </div>

// // // </div>
// // <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen">
      
// //   {/* Header */}
// //   <div>
// //     {/* text-gray-900 পরিবর্তন করে text-white করা হয়েছে */}
// //     <h1 className="text-3xl font-bold text-white">Creator Dashboard</h1>
// //     <p className="text-gray-400 mt-1">Track your prompt performance and growth metrics.</p>
// //   </div>

// //   {/* --- Summary Cards Section --- */}
// //   {/* ডার্ক ব্যাকগ্রাউন্ডের সাথে মানানসই বর্ডার কালার (border-purple-900/40) ব্যবহার করা হয়েছে */}
// //   <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    
// //     {/* Total Prompts Card */}
// //     <div className="p-6 rounded-xl border border-purple-900/40 flex items-center justify-between backdrop-blur-sm bg-purple-950/10">
// //       <div>
// //         <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Prompts</p>
// //         <h3 className="text-3xl font-bold text-white mt-2">{summaryData.totalPrompts}</h3>
// //       </div>
// //       <div className="p-3 bg-blue-500/10 rounded-lg text-blue-400">
// //         <FaTerminal className="w-6 h-6" />
// //       </div>
// //     </div>

// //     {/* Total Copies Card */}
// //     <div className="p-6 rounded-xl border border-purple-900/40 flex items-center justify-between backdrop-blur-sm bg-purple-950/10">
// //       <div>
// //         <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Copies</p>
// //         <h3 className="text-3xl font-bold text-white mt-2">{summaryData.totalCopies.toLocaleString()}</h3>
// //       </div>
// //       <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400">
// //         <FaRegCopy className="w-6 h-6" />
// //       </div>
// //     </div>

// //     {/* Total Bookmarks Card */}
// //     <div className="p-6 rounded-xl border border-purple-900/40 flex items-center justify-between backdrop-blur-sm bg-purple-950/10">
// //       <div>
// //         <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Total Bookmarks</p>
// //         <h3 className="text-3xl font-bold text-white mt-2">{summaryData.totalBookmarks.toLocaleString()}</h3>
// //       </div>
// //       <div className="p-3 bg-purple-500/10 rounded-lg text-purple-400">
// //         <FaRegBookmark className="w-6 h-6" />
// //       </div>
// //     </div>

// //   </div>

// //   {/* --- Analytics Charts Section --- */}
// //   <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    
// //     {/* Chart 1: Total Copies (Bar Chart) */}
// //     <div className="p-6 rounded-xl border border-purple-900/40 backdrop-blur-sm bg-purple-950/10">
// //       <div className="mb-4">
// //         <h3 className="text-lg font-semibold text-white">Total Copies Over Time</h3>
// //         <p className="text-sm text-gray-400">Monthly breakdown of how many times your prompts were copied.</p>
// //       </div>
// //       <div className="h-80 w-full">
// //         <ResponsiveContainer width="100%" height="100%">
// //           <BarChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
// //             {/* গ্রিড লাইন হালকা দেখানোর জন্য opacity-20 এবং সাদা রঙের কাছাকাছি কালার দেওয়া হয়েছে */}
// //             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" className="opacity-40" />
// //             <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
// //             <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
// //             {/* ডার্ক ব্যাকগ্রাউন্ডের সাথে মানানসই করে Tooltip-এর ব্যাকগ্রাউন্ড ডার্ক করা হয়েছে */}
// //             <Tooltip 
// //               contentStyle={{ backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #374151', color: '#fff' }}
// //               itemStyle={{ color: '#fff' }}
// //             />
// //             {/* আপনার ইমেজের বার কালারের সাথে মিলিয়ে Neon-Green কালার (#10b981) রাখা হয়েছে */}
// //             <Bar dataKey="copies" fill="#10b981" radius={[4, 4, 0, 0]} name="Copies" />
// //           </BarChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>

// //     {/* Chart 2: Prompt Growth (Line Chart) */}
// //     <div className="p-6 rounded-xl border border-purple-900/40 backdrop-blur-sm bg-purple-950/10">
// //       <div className="mb-4">
// //         <h3 className="text-lg font-semibold text-white">Prompt Growth</h3>
// //         <p className="text-sm text-gray-400">Cumulative total of published prompts on your profile.</p>
// //       </div>
// //       <div className="h-80 w-full">
// //         <ResponsiveContainer width="100%" height="100%">
// //           <LineChart data={analyticsData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
// //             <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" className="opacity-40" />
// //             <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
// //             <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
// //             <Tooltip 
// //               contentStyle={{ backgroundColor: '#111827', borderRadius: '8px', border: '1px solid #374151', color: '#fff' }}
// //               itemStyle={{ color: '#fff' }}
// //             />
// //             {/* লাইন চার্টের জন্য আপনার ইমেজের সাথে মিল রেখে Sky Blue কালার ব্যবহার করা হয়েছে */}
// //             <Line 
// //               type="monotone" 
// //               dataKey="prompts" 
// //               stroke="#60a5fa" 
// //               strokeWidth={3} 
// //               dot={{ r: 4, strokeWidth: 2, fill: '#111827' }} 
// //               activeDot={{ r: 6 }}
// //               name="Total Prompts" 
// //             />
// //           </LineChart>
// //         </ResponsiveContainer>
// //       </div>
// //     </div>

// //   </div>

// // </div>
// //   );
// // }




// // app/dashboard/creator/page.js
// "use client";

// import React, { useState } from 'react';
// import { 
//   LineChart, Line, BarChart, Bar, 
//   XAxis, YAxis, Tooltip, 
//   ResponsiveContainer, CartesianGrid 
// } from 'recharts';
// import { FaCalendarAlt, FaDownload } from 'react-icons/fa';

// // Import StatCard components
// import { 
//   StatsGrid, 
//   STATIC_SUMMARY_DATA 
// } from '@/components/dashboard/StatCard';

// // Static Analytics Data
// const STATIC_ANALYTICS_DATA = [
//   { name: 'Jan', copies: 400, prompts: 12 },
//   { name: 'Feb', copies: 800, prompts: 25 },
//   { name: 'Mar', copies: 1200, prompts: 42 },
//   { name: 'Apr', copies: 1900, prompts: 60 },
//   { name: 'May', copies: 2800, prompts: 95 },
//   { name: 'Jun', copies: 4820, prompts: 142 },
// ];

// export default function CreatorDashboard() {
//   const [isLoading, setIsLoading] = useState(false);
//   const [timeRange, setTimeRange] = useState('month');

//   return (
//     <div className="p-6 max-w-7xl mx-auto space-y-8 min-h-screen">
      
//       {/* Header */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between">
//         <div>
//           <h1 className="text-3xl font-bold text-white">Creator Dashboard</h1>
//           <p className="text-gray-400 mt-1">Track your prompt performance and growth metrics.</p>
//         </div>
//         <div className="flex items-center gap-3 mt-4 md:mt-0">
//           <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
//             <FaCalendarAlt className="text-purple-400" />
//             <select 
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//               className="bg-transparent text-white text-sm outline-none cursor-pointer"
//             >
//               <option value="week">Last 7 Days</option>
//               <option value="month">Last 30 Days</option>
//               <option value="quarter">Last 90 Days</option>
//               <option value="year">Last Year</option>
//             </select>
//           </div>
//           <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white text-sm font-medium hover:shadow-lg hover:shadow-purple-500/25 transition-all">
//             <FaDownload className="inline mr-2" />
//             Export
//           </button>
//         </div>
//       </div>

//       {/* Option 1: Full Stats Grid with Growth */}
//       <StatsGrid 
//         data={STATIC_SUMMARY_DATA} 
//         isLoading={isLoading}
//         showGrowth={true}
//       />

//       {/* Option 2: Stats Grid without Growth */}
//       {/* <StatsGrid 
//         data={STATIC_SUMMARY_DATA} 
//         isLoading={isLoading}
//         showGrowth={false}
//       /> */}

//       {/* Option 3: Stats Row (Compact) */}
//       {/* <StatsRow data={STATIC_SUMMARY_DATA} isLoading={isLoading} /> */}

//       {/* Option 4: Individual Stat Cards */}
//       {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <MiniStatCard 
//           title="Total Prompts" 
//           value={STATIC_SUMMARY_DATA.totalPrompts} 
//           icon={FaTerminal}
//           color="blue"
//         />
//         <MiniStatCard 
//           title="Total Copies" 
//           value={STATIC_SUMMARY_DATA.totalCopies} 
//           icon={FaRegCopy}
//           color="emerald"
//         />
//         <MiniStatCard 
//           title="Total Bookmarks" 
//           value={STATIC_SUMMARY_DATA.totalBookmarks} 
//           icon={FaRegBookmark}
//           color="purple"
//         />
//       </div> */}

//       {/* Analytics Charts Section */}
//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
//         {/* Chart 1: Total Copies (Bar Chart) */}
//         <div className="p-6 rounded-xl border border-purple-900/40 backdrop-blur-sm bg-purple-950/10">
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-white">Total Copies Over Time</h3>
//             <p className="text-sm text-gray-400">Monthly breakdown of how many times your prompts were copied.</p>
//           </div>
//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={STATIC_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" className="opacity-40" />
//                 <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
//                 <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#111827', 
//                     borderRadius: '8px', 
//                     border: '1px solid #374151', 
//                     color: '#fff' 
//                   }}
//                   itemStyle={{ color: '#fff' }}
//                 />
//                 <Bar 
//                   dataKey="copies" 
//                   fill="#10b981" 
//                   radius={[4, 4, 0, 0]} 
//                   name="Copies"
//                   animationDuration={1000}
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//         {/* Chart 2: Prompt Growth (Line Chart) */}
//         <div className="p-6 rounded-xl border border-purple-900/40 backdrop-blur-sm bg-purple-950/10">
//           <div className="mb-4">
//             <h3 className="text-lg font-semibold text-white">Prompt Growth</h3>
//             <p className="text-sm text-gray-400">Cumulative total of published prompts on your profile.</p>
//           </div>
//           <div className="h-80 w-full">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={STATIC_ANALYTICS_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
//                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" className="opacity-40" />
//                 <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
//                 <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#111827', 
//                     borderRadius: '8px', 
//                     border: '1px solid #374151', 
//                     color: '#fff' 
//                   }}
//                   itemStyle={{ color: '#fff' }}
//                 />
//                 <Line 
//                   type="monotone" 
//                   dataKey="prompts" 
//                   stroke="#60a5fa" 
//                   strokeWidth={3} 
//                   dot={{ r: 4, strokeWidth: 2, fill: '#111827' }} 
//                   activeDot={{ r: 6 }}
//                   name="Total Prompts"
//                   animationDuration={1000}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

import StatCard from '@/Components/Dashboard/StatCard'
import React from 'react'

const CreatorMainpage = () => {
  return (
    <div>
<StatCard></StatCard>
    </div>
  )
}

export default CreatorMainpage