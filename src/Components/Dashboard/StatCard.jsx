// // components/dashboard/StatCard.js
// "use client";

// import { FaTerminal, FaRegCopy, FaRegBookmark, FaEye, FaArrowUp, FaArrowDown } from 'react-icons/fa';

// // Static Data
// export const STATIC_SUMMARY_DATA = {
//   totalPrompts: 142,
//   totalCopies: 4820,
//   totalBookmarks: 890,
//   totalViews: 1247,
//   revenue: 342.50,
// };

// // Individual Stat Card Component
// export const StatCard = ({ 
//   title, 
//   value, 
//   icon: Icon, 
//   color = "purple",
//   subtitle,
//   growth,
//   isLoading = false,
//   prefix = "",
//   suffix = "",
//   onClick,
//   className = ""
// }) => {
//   const isPositive = growth > 0;
  
//   return (
//     <div 
//       onClick={onClick}
//       className={`
//         p-6 rounded-xl border border-purple-900/40 
//         flex items-center justify-between 
//         backdrop-blur-sm bg-purple-950/10 
//         hover:shadow-xl hover:shadow-purple-500/10 
//         transition-all group
//         ${onClick ? 'cursor-pointer' : ''}
//         ${className}
//       `}
//     >
//       <div className="flex-1 min-w-0">
//         <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</p>
//         {isLoading ? (
//           <div className="h-9 w-24 bg-white/5 rounded-lg animate-pulse mt-2" />
//         ) : (
//           <>
//             <h3 className="text-3xl font-bold text-white mt-2 truncate">
//               {prefix}{typeof value === 'number' ? value.toLocaleString() : value}{suffix}
//             </h3>
//             {subtitle && (
//               <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
//             )}
//           </>
//         )}
//       </div>
//       <div className={`p-3 bg-${color}-500/10 rounded-lg text-${color}-400 flex-shrink-0 ml-3`}>
//         <Icon className="w-6 h-6" />
//       </div>
//     </div>
//   );
// };

// // Stats Grid with Static Data
// export const StatsGrid = ({ 
//   data = STATIC_SUMMARY_DATA,
//   isLoading = false,
//   showGrowth = true,
//   className = ""
// }) => {
//   const stats = [
//     {
//       id: 'prompts',
//       title: 'Total Prompts',
//       value: data.totalPrompts,
//       icon: FaTerminal,
//       color: 'blue',
//       growth: showGrowth ? 8.5 : undefined,
//     },
//     {
//       id: 'copies',
//       title: 'Total Copies',
//       value: data.totalCopies,
//       icon: FaRegCopy,
//       color: 'emerald',
//       growth: showGrowth ? 15.2 : undefined,
//     },
//     {
//       id: 'bookmarks',
//       title: 'Total Bookmarks',
//       value: data.totalBookmarks,
//       icon: FaRegBookmark,
//       color: 'purple',
//       growth: showGrowth ? -3.1 : undefined,
//     },
//     {
//       id: 'views',
//       title: 'Total Views',
//       value: data.totalViews || 0,
//       icon: FaEye,
//       color: 'yellow',
//       growth: showGrowth ? 22.7 : undefined,
//     },
//   ];

//   return (
//     <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 ${className}`}>
//       {stats.map((stat) => (
//         <StatCard
//           key={stat.id}
//           title={stat.title}
//           value={stat.value}
//           icon={stat.icon}
//           color={stat.color}
//           growth={stat.growth}
//           isLoading={isLoading}
//         />
//       ))}
//     </div>
//   );
// };

// // Mini Stats Card (Compact Version)
// export const MiniStatCard = ({ title, value, icon: Icon, color = "purple", isLoading = false }) => {
//   return (
//     <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:bg-white/10 transition-colors">
//       <div className="flex items-center justify-between">
//         <div>
//           <p className="text-xs text-gray-400">{title}</p>
//           {isLoading ? (
//             <div className="h-6 w-16 bg-white/5 rounded animate-pulse mt-1" />
//           ) : (
//             <p className="text-lg font-semibold text-white">{value.toLocaleString()}</p>
//           )}
//         </div>
//         <div className={`p-2 rounded-lg bg-${color}-500/10 text-${color}-400`}>
//           <Icon className="w-4 h-4" />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Stats Row (Horizontal Layout)
// export const StatsRow = ({ data = STATIC_SUMMARY_DATA, isLoading = false }) => {
//   return (
//     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//       <MiniStatCard 
//         title="Total Prompts" 
//         value={data.totalPrompts} 
//         icon={FaTerminal}
//         color="blue"
//         isLoading={isLoading}
//       />
//       <MiniStatCard 
//         title="Total Copies" 
//         value={data.totalCopies} 
//         icon={FaRegCopy}
//         color="emerald"
//         isLoading={isLoading}
//       />
//       <MiniStatCard 
//         title="Total Bookmarks" 
//         value={data.totalBookmarks} 
//         icon={FaRegBookmark}
//         color="purple"
//         isLoading={isLoading}
//       />
//       <MiniStatCard 
//         title="Total Views" 
//         value={data.totalViews || 0} 
//         icon={FaEye}
//         color="yellow"
//         isLoading={isLoading}
//       />
//     </div>
//   );
// };

// // Default export
// export default StatCard;


import React from 'react'

const StatCard = () => {
  return (
    <div>StatCard</div>
  )
}

export default StatCard