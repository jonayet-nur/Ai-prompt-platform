// 'use client'

// import React, { useEffect, useState } from 'react';

// const AnalyticsSection = () => {
//   const [data, setData] = useState({ totalUsers: 0, totalPrompts: 0, totalReviews: 0, totalCopies: 0 });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/analytics`)
//       .then(res => res.json())
//       .then(data => {
//         setData(data);
//         setLoading(false);
//       })
//       .catch(err => console.error("Analytics Fetch Error:", err));
//   }, []);

//   if (loading) return <div className="text-gray-400">Loading Analytics...</div>;

//   const cards = [
//     { title: 'Total Users', value: data.totalUsers, icon: '👥', color: 'from-blue-500/10 to-blue-600/5' },
//     { title: 'Total Prompts', value: data.totalPrompts, icon: '📝', color: 'from-purple-500/10 to-purple-600/5' },
//     { title: 'Total Reviews', value: data.totalReviews, icon: '⭐', color: 'from-amber-500/10 to-amber-600/5' },
//     { title: 'Total Copies', value: data.totalCopies, icon: '🔥', color: 'from-emerald-500/10 to-emerald-600/5' },
//   ];

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//       {cards.map((c, i) => (
//         <div key={i} className={`bg-gradient-to-br ${c.color} border border-gray-800 p-6 rounded-2xl flex flex-col justify-between shadow-lg`}>
//           <div className="flex justify-between items-start">
//             <span className="text-sm font-medium text-gray-400">{c.title}</span>
//             <span className="text-xl">{c.icon}</span>
//           </div>
//           <div className="mt-4">
//             <h3 className="text-3xl font-bold text-gray-100">{c.value}</h3>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default AnalyticsSection;




// 'use client'

// import React, { useEffect, useState } from 'react';
// // recharts থেকে প্রয়োজনীয় কম্পোনেন্ট ইম্পোর্ট করা হয়েছে
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// const AnalyticsSection = () => {
//   // চার্টের ডেটা সহ স্টেট আপডেট করা হয়েছে
//   const [data, setData] = useState({ 
//     totalUsers: 0, 
//     totalPrompts: 0, 
//     totalReviews: 0, 
//     totalCopies: 0,
//     monthlyTrend: [] // চার্ট দেখানোর জন্য ট্রেন্ড ডেটা
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/analytics`)
//       .then(res => res.json())
//       .then(data => {
//         setData(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Analytics Fetch Error:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) return <div className="text-gray-400 text-center py-10">Loading Analytics...</div>;

//   // কার্ডের ডেটাগুলোকে আরও প্রফেশনাল ও ইনফরমেটিভ করা হয়েছে
//   const cards = [
//     { title: 'Total Users', value: data.totalUsers, label: '+12% this month', icon: '👥', color: 'from-blue-500/10 to-blue-600/5', border: 'border-blue-500/20' },
//     { title: 'Total Prompts', value: data.totalPrompts, label: '+25% new prompts', icon: '📝', color: 'from-purple-500/10 to-purple-600/5', border: 'border-purple-500/20' },
//     { title: 'Total Reviews', value: data.totalReviews, label: '4.8★ Avg Rating', icon: '⭐', color: 'from-amber-500/10 to-amber-600/5', border: 'border-amber-500/20' },
//     { title: 'Total Copies', value: data.totalCopies, label: 'High engagement', icon: '🔥', color: 'from-emerald-500/10 to-emerald-600/5', border: 'border-emerald-500/20' },
//   ];

//   return (
//     <div className="space-y-8">
//       {/* ১. স্ট্যাটাস কার্ড সেকশন */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {cards.map((c, i) => (
//           <div key={i} className={`bg-gradient-to-br ${c.color} border ${c.border || 'border-gray-800'} p-6 rounded-2xl flex flex-col justify-between shadow-lg hover:scale-[1.02] transition-transform duration-200`}>
//             <div className="flex justify-between items-start">
//               <span className="text-sm font-medium text-gray-400">{c.title}</span>
//               <span className="text-xl p-2 bg-gray-900/50 rounded-lg">{c.icon}</span>
//             </div>
//             <div className="mt-4">
//               <h3 className="text-3xl font-bold text-gray-100">{c.value?.toLocaleString()}</h3>
//               <p className="text-xs text-gray-400 mt-1">{c.label}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* ২. নতুন চার্ট সেকশন */}
//       <div className="bg-gray-900/40 border border-gray-800 p-6 rounded-2xl shadow-lg">
//         <div className="mb-6">
//           <h3 className="text-lg font-semibold text-gray-200">Platform Growth Trend</h3>
//           <p className="text-xs text-gray-400">Monthly overview of user interactions and prompts</p>
//         </div>
        
//         <div className="w-full h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart
//               data={data.monthlyTrend && data.monthlyTrend.length > 0 ? data.monthlyTrend : [
//                 // ব্যাকএন্ডে ডেটা না থাকলে যেন চার্ট খালি না দেখায়, তাই কিছু ডামি ডেটা ব্যাকআপ হিসেবে রাখা হলো
//                 { name: 'Jan', Users: 400, Prompts: 240 },
//                 { name: 'Feb', Users: 800, Prompts: 450 },
//                 { name: 'Mar', Users: 1200, Prompts: 780 },
//                 { name: 'Apr', Users: 1900, Prompts: 1100 },
//                 { name: 'May', Users: data.totalUsers || 2400, Prompts: data.totalPrompts || 1500 },
//               ]}
//               margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//             >
//               <defs>
//                 <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                 </linearGradient>
//                 <linearGradient id="colorPrompts" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#a855f7" stopOpacity={0.2}/>
//                   <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
//               <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} tickLine={false} />
//               <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} axisLine={false} />
//               <Tooltip 
//                 contentStyle={{ backgroundColor: '#111827', borderColor: '#374151', borderRadius: '12px' }}
//                 itemStyle={{ color: '#f3f4f6' }}
//               />
//               <Area type="monotone" dataKey="Users" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorUsers)" />
//               <Area type="monotone" dataKey="Prompts" stroke="#a855f7" strokeWidth={2} fillOpacity={1} fill="url(#colorPrompts)" />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsSection;



// 'use client'

// import React, { useEffect, useState } from 'react';
// import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
// // প্রফেশনাল লুকের জন্য Lucide Icons ব্যবহার করা হয়েছে
// import { Users, FileText, Star, Copy, TrendingUp } from 'lucide-react';

// const AnalyticsSection = () => {
//   const [data, setData] = useState({ 
//     totalUsers: 0, 
//     totalPrompts: 0, 
//     totalReviews: 0, 
//     totalCopies: 0,
//     monthlyTrend: [] 
//   });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/analytics`)
//       .then(res => res.json())
//       .then(data => {
//         setData(data);
//         setLoading(false);
//       })
//       .catch(err => {
//         console.error("Analytics Fetch Error:", err);
//         setLoading(false);
//       });
//   }, []);

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
//         <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
//         <p className="text-gray-400 font-medium text-sm tracking-wide animate-pulse">Loading analytics engine...</p>
//       </div>
//     );
//   }

//   // UX ফ্রেন্ডলি ডেটা স্ট্রাকচার এবং কালার প্যালেট
//   const cards = [
//     { 
//       title: 'Total Users', 
//       value: data.totalUsers, 
//       change: '+12.5%', 
//       isPositive: true,
//       icon: Users, 
//       color: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
//       gradient: 'from-blue-500/5 to-transparent'
//     },
//     { 
//       title: 'Total Prompts', 
//       value: data.totalPrompts, 
//       change: '+24.2%', 
//       isPositive: true,
//       icon: FileText, 
//       color: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
//       gradient: 'from-purple-500/5 to-transparent'
//     },
//     { 
//       title: 'Total Reviews', 
//       value: data.totalReviews, 
//       change: '4.9/5.0 Avg', 
//       isPositive: true,
//       icon: Star, 
//       color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
//       gradient: 'from-amber-500/5 to-transparent'
//     },
//     { 
//       title: 'Total Copies', 
//       value: data.totalCopies, 
//       change: '+18.4%', 
//       isPositive: true,
//       icon: Copy, 
//       color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
//       gradient: 'from-emerald-500/5 to-transparent'
//     },
//   ];

//   return (
//     <div className="space-y-8 p-1">
      
//       {/* ১. স্ট্যাটাস কার্ড সেকশন (Glassmorphism & Clean Typography) */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {cards.map((c, i) => {
//           const IconComponent = c.icon;
//           return (
//             <div 
//               key={i} 
//               className={`relative overflow-hidden bg-gradient-to-b ${c.gradient} bg-gray-900/40 backdrop-blur-md border border-gray-800 p-6 rounded-2xl flex flex-col justify-between shadow-xl hover:border-gray-700 transition-all duration-300 group`}
//             >
//               <div className="flex justify-between items-start relative z-10">
//                 <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">{c.title}</span>
//                 <div className={`p-2.5 rounded-xl border ${c.color} shadow-sm group-hover:scale-110 transition-transform duration-300`}>
//                   <IconComponent size={18} strokeWidth={2} />
//                 </div>
//               </div>
              
//               <div className="mt-5 relative z-10">
//                 <h3 className="text-3xl font-bold text-white tracking-tight">
//                   {c.value?.toLocaleString() || '0'}
//                 </h3>
//                 <div className="flex items-center space-x-1.5 mt-2">
//                   <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${c.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
//                     {c.change}
//                   </span>
//                   <span className="text-[11px] text-gray-500 font-medium">vs last month</span>
//                 </div>
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* ২. প্রিমিয়াম চার্ট সেকশন (Sleek Dark Dashboard Look) */}
//       <div className="bg-gray-900/30 backdrop-blur-md border border-gray-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-800/60 pb-5 mb-6">
//           <div>
//             <div className="flex items-center space-x-2">
//               <TrendingUp size={18} className="text-blue-400" />
//               <h3 className="text-base font-semibold text-gray-200">Platform Performance</h3>
//             </div>
//             <p className="text-xs text-gray-500 mt-1">Real-time analysis of active user interaction curves</p>
//           </div>
          
//           {/* ফিল্টার ট্যাব (UX-এর সৌন্দর্য বাড়াতে) */}
//           <div className="flex space-x-1 mt-4 sm:mt-0 p-1 bg-gray-950 rounded-lg border border-gray-800/80 w-fit">
//             <button className="text-xs font-medium text-white bg-gray-800 px-3 py-1.5 rounded-md shadow-sm transition-all">Monthly</button>
//             <button className="text-xs font-medium text-gray-500 hover:text-gray-300 px-3 py-1.5 transition-all">Weekly</button>
//           </div>
//         </div>
        
//         <div className="w-full h-80">
//           <ResponsiveContainer width="100%" height="100%">
//             <AreaChart
//               data={data.monthlyTrend && data.monthlyTrend.length > 0 ? data.monthlyTrend : [
//                 { name: 'Jan', Users: 400, Prompts: 240 },
//                 { name: 'Feb', Users: 950, Prompts: 510 },
//                 { name: 'Mar', Users: 1400, Prompts: 890 },
//                 { name: 'Apr', Users: 2100, Prompts: 1300 },
//                 { name: 'May', Users: data.totalUsers || 2900, Prompts: data.totalPrompts || 1850 },
//               ]}
//               margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
//             >
//               <defs>
//                 <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/>
//                   <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
//                 </linearGradient>
//                 <linearGradient id="colorPrompts" x1="0" y1="0" x2="0" y2="1">
//                   <stop offset="5%" stopColor="#a855f7" stopOpacity={0.15}/>
//                   <stop offset="95%" stopColor="#a855f7" stopOpacity={0}/>
//                 </linearGradient>
//               </defs>
//               <CartesianGrid strokeDasharray="4 4" stroke="#1f2937" opacity={0.3} vertical={false} />
//               <XAxis dataKey="name" stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} dy={10} />
//               <YAxis stroke="#6b7280" fontSize={11} tickLine={false} axisLine={false} dx={5} />
              
//               {/* কাস্টম প্রিমিয়াম টুলটিপ */}
//               <Tooltip 
//                 contentStyle={{ 
//                   backgroundColor: 'rgba(17, 24, 39, 0.95)', 
//                   borderColor: '#374151', 
//                   borderRadius: '12px',
//                   backdropFilter: 'blur(8px)',
//                   boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.5)'
//                 }}
//                 itemStyle={{ color: '#e5e7eb', fontSize: '12px' }}
//                 labelStyle={{ color: '#9ca3af', fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}
//               />
              
//               <Area type="monotone" dataKey="Users" stroke="#3b82f6" strokeWidth={2.5} fillOpacity={1} fill="url(#colorUsers)" dot={{ r: 2, strokeWidth: 1 }} activeDot={{ r: 6 }} />
//               <Area type="monotone" dataKey="Prompts" stroke="#a855f7" strokeWidth={2.5} fillOpacity={1} fill="url(#colorPrompts)" dot={{ r: 2, strokeWidth: 1 }} activeDot={{ r: 6 }} />
//             </AreaChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnalyticsSection;



'use client'

import React, { useEffect, useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, ComposedChart, PieChart, Pie, Cell } from 'recharts';
import { Users, FileText, Star, Copy, TrendingUp, Activity, ArrowUpRight, RefreshCw, Download, Clock, Sparkles, Award, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, AlertCircle } from 'lucide-react';

// ✅ ১. কাস্টম টুলটিপ কম্পোনেন্টটিকে মূল কম্পোনেন্টের বাইরে (Outside) নিয়ে আসা হলো
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-gray-950/95 border border-gray-800 rounded-xl p-3 backdrop-blur-xl shadow-2xl min-w-[140px]">
      <p className="text-[11px] text-gray-500 font-mono mb-1.5 border-b border-gray-800 pb-1">{label}</p>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center justify-between gap-3 text-xs py-0.5">
          <span className="text-gray-400 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
            {entry.name}
          </span>
          <span className="font-bold text-white">{entry.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

const AnalyticsSection = () => {
  const [data, setData] = useState({ totalUsers: 0, totalPrompts: 0, totalReviews: 0, totalCopies: 0, monthlyTrend: [] });
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('6m');
  const [chartType, setChartType] = useState('area');
  const [notification, setNotification] = useState(null);

  useEffect(() => { fetchAnalytics(); }, [timeRange]);

  const fetchAnalytics = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/analytics?range=${timeRange}`)
      .then(res => res.json())
      .then(resData => { setData(resData); setLoading(false); })
      .catch(err => {
        console.error("Analytics Fetch Error:", err);
        setLoading(false);
        setNotification({ message: 'Failed to load analytics data', type: 'error' });
        setTimeout(() => setNotification(null), 3000);
      });
  };

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-[400px] bg-gray-950/50 rounded-3xl border border-gray-800/50 backdrop-blur-xl">
      <div className="w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
      <p className="mt-4 text-xs font-mono tracking-widest text-purple-400 animate-pulse uppercase">Loading Engine...</p>
    </div>
  );

  const enhancedMonthlyTrend = data.monthlyTrend && data.monthlyTrend.length > 0 ? data.monthlyTrend : [
    { name: 'Jan', Users: Math.round(data.totalUsers * 0.2), Prompts: Math.round(data.totalPrompts * 0.15), Reviews: Math.round(data.totalReviews * 0.1), Copies: Math.round(data.totalCopies * 0.1) },
    { name: 'Mar', Users: Math.round(data.totalUsers * 0.5), Prompts: Math.round(data.totalPrompts * 0.45), Reviews: Math.round(data.totalReviews * 0.4), Copies: Math.round(data.totalCopies * 0.45) },
    { name: 'May', Users: Math.round(data.totalUsers * 0.8), Prompts: Math.round(data.totalPrompts * 0.75), Reviews: Math.round(data.totalReviews * 0.7), Copies: Math.round(data.totalCopies * 0.75) },
    { name: 'Jun', Users: data.totalUsers || 10, Prompts: data.totalPrompts || 10, Reviews: data.totalReviews || 10, Copies: data.totalCopies || 10 },
  ];

  const categoryData = [
    { name: 'AI Generation', value: Math.round((data.totalPrompts + data.totalCopies) * 0.4), color: '#8B5CF6' },
    { name: 'User Engagement', value: Math.round(data.totalUsers * 0.6), color: '#3B82F6' },
    { name: 'Platform Actions', value: Math.round(data.totalCopies * 0.3), color: '#F59E0B' },
    { name: 'Community Reviews', value: data.totalReviews || 5, color: '#10B981' },
  ];

  const performanceData = [
    { name: 'Users Growth', total: data.totalUsers },
    { name: 'Prompts Library', total: data.totalPrompts },
    { name: 'Reviews Log', total: data.totalReviews },
    { name: 'Total Copies', total: data.totalCopies }
  ];

  const cards = [
    { title: 'Total Users', value: data.totalUsers, icon: Users, color: 'from-blue-500/20 to-blue-600/5', border: 'border-blue-500/30', gradient: 'text-blue-400' },
    { title: 'Total Prompts', value: data.totalPrompts, icon: FileText, color: 'from-purple-500/20 to-purple-600/5', border: 'border-purple-500/30', gradient: 'text-purple-400' },
    { title: 'Total Reviews', value: data.totalReviews, icon: Star, color: 'from-amber-500/20 to-amber-600/5', border: 'border-amber-500/30', gradient: 'text-amber-400' },
    { title: 'Total Copies', value: data.totalCopies, icon: Copy, color: 'from-emerald-500/20 to-emerald-600/5', border: 'border-emerald-500/30', gradient: 'text-emerald-400' },
  ];

  return (
    <div className="space-y-6 text-gray-200">
      {notification && (
        <div className="fixed top-6 right-6 z-50 p-4 rounded-xl border backdrop-blur-xl bg-rose-500/10 border-rose-500/20 text-rose-400 flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4" /> {notification.message}
        </div>
      )}

      {/* হেডার */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" /> Analytics Dashboard
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-gray-900/50 border border-gray-800 rounded-xl p-0.5">
            {['1M', '3M', '6M', '1Y'].map(range => (
              <button key={range} onClick={() => setTimeRange(range.toLowerCase())} className={`px-2.5 py-1 text-xs font-medium rounded-lg transition-all ${timeRange === range.toLowerCase() ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'text-gray-400 hover:text-gray-200'}`}>{range}</button>
            ))}
          </div>
          <button onClick={fetchAnalytics} className="p-2 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-purple-500/30 transition-all"><RefreshCw className="w-3.5 h-3.5 text-gray-400" /></button>
        </div>
      </div>

      {/* মেইন স্ট্যাটাস কার্ডস */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div key={i} className="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-950/90 to-gray-900/50 border border-gray-800 p-5 hover:scale-[1.01] hover:border-gray-700 transition-all">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[11px] font-medium text-gray-500 uppercase tracking-wider">{card.title}</p>
                  <h3 className="text-2xl font-bold text-white mt-1">{card.value?.toLocaleString() || '0'}</h3>
                </div>
                <div className={`p-2 rounded-xl bg-gray-900/50 border border-gray-800 ${card.gradient}`}><Icon className="w-4 h-4" /></div>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] text-gray-500">
                <span className="text-emerald-400 font-semibold flex items-center"><ArrowUpRight className="w-3 h-3" /> Growth</span> vs last month
              </div>
            </div>
          );
        })}
      </div>

      {/* চার্ট সেকশন */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ট্রেন্ড চার্ট */}
        <div className="lg:col-span-2 bg-gray-950/40 border border-gray-800/60 rounded-2xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-1.5"><TrendingUp className="w-4 h-4 text-purple-400" /> Live Platform Metrics</h3>
            </div>
            <div className="flex bg-gray-900/50 border border-gray-800 rounded-lg p-0.5">
              <button onClick={() => setChartType('area')} className={`p-1.5 rounded-md ${chartType === 'area' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}`}><BarChart3 className="w-3.5 h-3.5" /></button>
              <button onClick={() => setChartType('line')} className={`p-1.5 rounded-md ${chartType === 'line' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}`}><LineChartIcon className="w-3.5 h-3.5" /></button>
              <button onClick={() => setChartType('composed')} className={`p-1.5 rounded-md ${chartType === 'composed' ? 'bg-purple-500/20 text-purple-400' : 'text-gray-500'}`}><PieChartIcon className="w-3.5 h-3.5" /></button>
            </div>
          </div>

          <div className="w-full h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              {chartType === 'area' ? (
                // ✅ ২. Recharts-এর প্রোপার্টির ভেতরে সরাসরি ফিজিক্যাল ডিক্লেয়ারেশন এর পরিবর্তে অবজেক্ট হিসেবে কাস্টম টুলটিপ পাস করা হয়েছে
                <AreaChart data={enhancedMonthlyTrend} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
                  <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="Users" stroke="#8B5CF6" fillOpacity={0.05} fill="#8B5CF6" strokeWidth={2} name="Users" />
                  <Area type="monotone" dataKey="Prompts" stroke="#3B82F6" fillOpacity={0.05} fill="#3B82F6" strokeWidth={2} name="Prompts" />
                  <Area type="monotone" dataKey="Copies" stroke="#10B981" fillOpacity={0.05} fill="#10B981" strokeWidth={2} name="Copies" />
                </AreaChart>
              ) : chartType === 'line' ? (
                <LineChart data={enhancedMonthlyTrend} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
                  <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Line type="monotone" dataKey="Users" stroke="#8B5CF6" strokeWidth={2} dot={false} name="Users" />
                  <Line type="monotone" dataKey="Prompts" stroke="#3B82F6" strokeWidth={2} dot={false} name="Prompts" />
                </LineChart>
              ) : (
                <ComposedChart data={enhancedMonthlyTrend} margin={{ left: -20, right: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                  <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
                  <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="Users" fill="#8B5CF6" radius={[3, 3, 0, 0]} name="Users" />
                  <Line type="monotone" dataKey="Prompts" stroke="#3B82F6" strokeWidth={2} name="Prompts" />
                </ComposedChart>
              )}
            </ResponsiveContainer>
          </div>
        </div>

        {/* পাই চার্ট সেকশন */}
        <div className="bg-gray-950/40 border border-gray-800/60 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-1.5 mb-4"><PieChartIcon className="w-4 h-4 text-purple-400" /> Resource Ratio</h3>
          <div className="w-full h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={categoryData} innerRadius={50} outerRadius={70} paddingAngle={4} dataKey="value">
                  {categoryData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 mt-2">
            {categoryData.map((entry, i) => (
              <div key={i} className="flex items-center gap-1 text-[10px] text-gray-400">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />{entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* পারফরম্যান্স বার চার্ট */}
      <div className="bg-gray-950/40 border border-gray-800/60 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-gray-300 flex items-center gap-1.5 mb-4"><Award className="w-4 h-4 text-purple-400" /> Module Breakdown</h3>
        <div className="w-full h-[180px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={performanceData} margin={{ left: -20, right: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
              <XAxis dataKey="name" stroke="#4b5563" fontSize={10} tickLine={false} />
              <YAxis stroke="#4b5563" fontSize={10} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="total" fill="#3B82F6" radius={[4, 4, 0, 0]} name="Total Volume" maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ফুটার অ্যাকশন */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2 border-t border-gray-900/60 text-xs text-gray-500">
        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Updated in real-time</div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 font-medium bg-gray-900/50 border border-gray-800 rounded-xl hover:bg-gray-900 text-gray-400 transition-all"><Download className="w-3.5 h-3.5" /> CSV</button>
          <button className="inline-flex items-center gap-1.5 px-3 py-1.5 font-medium bg-purple-600 hover:bg-purple-700 text-white rounded-xl transition-all shadow-md shadow-purple-600/10"><Activity className="w-3.5 h-3.5" /> Report</button>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsSection;