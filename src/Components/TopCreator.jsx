// 'use client'
// import React, { useEffect, useState } from 'react';

// const TopCreators = () => {
//   const [creators, setCreators] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // আপনার .env ফাইলের NEXT_PUBLIC_BASE_URL ব্যবহার করে এপিআই কল
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/top-creators`)
//       .then((res) => res.json())
//       .then((data) => {
//         setCreators(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching top creators:", err);
//         setLoading(false);
//       });
//   }, []);

//   // লোডিং স্টেট হ্যান্ডেল করা
//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[200px]">
//         <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
//       </div>
//     );
//   }

//   // যদি কোনো ক্রিয়েটর ডাটা না থাকে
//   if (creators.length === 0) {
//     return (
//       <div className="text-center text-gray-400 py-8">
//         No top creators found at this moment.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 max-w-4xl mx-auto shadow-2xl">
//       {/* হেডার সেকশন */}
//       <div className="flex items-center justify-between mb-6">
//         <div>
//           <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 flex items-center gap-2">
//             🏆 Top Creators
//           </h2>
//           <p className="text-xs text-gray-400 mt-0.5">Most active prompt engineers in our community</p>
//         </div>
//         <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-full font-medium">
//           Top 3
//         </span>
//       </div>

//       {/* ক্রিয়েটর কার্ড গ্রিড/লিস্ট */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//         {creators.map((creator, index) => {
//           // প্রথম, দ্বিতীয় ও তৃতীয় স্থান নির্ধারণকারী ব্যাজ বা মেডেল
//           const medals = ['🥇', '🥈', '🥉'];
          
//           return (
//             <div 
//               key={creator._id} 
//               className="relative bg-gray-900 border border-gray-800 hover:border-purple-500/40 p-5 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-md group"
//             >
//               {/* মেডেল পজিশন */}
//               <span className="absolute top-3 left-3 text-lg">
//                 {medals[index] || '⭐️'}
//               </span>

//               {/* প্রোফাইল ইমেজ */}
//               <div className="relative mb-3">
//                 <img 
//                   src={creator.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
//                   alt={creator.name} 
//                   className="w-16 h-16 rounded-full object-cover border-2 border-gray-800 group-hover:border-purple-500 transition-all duration-300"
//                 />
//                 <span className="absolute -bottom-1 -right-1 bg-purple-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
//                   {creator.role || 'Creator'}
//                 </span>
//               </div>

//               {/* নাম এবং ইমেইল */}
//               <h3 className="font-semibold text-gray-200 group-hover:text-purple-400 transition-colors text-sm line-clamp-1">
//                 {creator.name || 'Anonymous Creator'}
//               </h3>
//               <p className="text-xs text-gray-500 mb-4 line-clamp-1">
//                 {creator.email}
//               </p>

//               {/* মোট প্রম্পট সংখ্যা */}
//               <div className="w-full bg-gray-950/60 rounded-lg p-2 border border-gray-800/80">
//                 <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Total Prompts</p>
//                 <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 mt-0.5">
//                   {creator.totalPrompts} {creator.totalPrompts === 1 ? 'Prompt' : 'Prompts'}
//                 </p>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default TopCreators;




'use client';
import React, { useEffect, useState } from 'react';

const TopCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/top-creators`)
      .then((res) => res.json())
      .then((data) => {
        setCreators(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching top creators:", err);
        setLoading(false);
      });
  }, []);

  // 🌟 আল্ট্রা-প্রফেশনাল উইডথ-ম্যাচিং স্কেলিটন লোডার
  if (loading) {
    return (
      <div className="bg-gray-950/40 p-6 sm:p-10 rounded-3xl border border-gray-900 max-w-7xl mx-auto shadow-2xl mt-16 animate-pulse">
        <div className="flex justify-between items-center mb-12">
          <div className="space-y-3 w-1/3">
            <div className="h-7 bg-gray-900 rounded-lg w-3/4" />
            <div className="h-4 bg-gray-900 rounded-lg w-full" />
          </div>
          <div className="h-8 bg-gray-900 rounded-full w-28" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-72 bg-gray-900/50 rounded-2xl border border-gray-900" />
          ))}
        </div>
      </div>
    );
  }

  if (creators.length === 0) {
    return (
      <div className="text-center text-gray-400 py-16 bg-gray-950/20 rounded-3xl border border-gray-900 font-medium max-w-7xl mx-auto">
        ✨ No elite creators found at this moment.
      </div>
    );
  }

  return (
    // 🖥️ উইডথ বাড়িয়ে 'max-w-7xl' করা হয়েছে এবং প্যাডিং বাড়িয়ে স্পেসিয়াস করা হয়েছে
    <div className="bg-gray-950/40 p-6 sm:p-10 rounded-3xl border border-gray-900 max-w-7xl mx-auto shadow-2xl backdrop-blur-xl mt-16 relative overflow-hidden">
      
      {/* ব্যাকগ্রাউন্ডের হালকা প্রিমিয়াম অ্যাম্বিয়েন্ট লাইট */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* 🎯 হেডার সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-6 border-b border-gray-900/80 relative z-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 bg-purple-500/10 rounded-xl border border-purple-500/20 text-xl shadow-inner">🏆</span>
            Top Elite Creators
          </h2>
          <p className="text-sm text-gray-400 mt-1.5">The mastermind engineers crafting the highest rated AI prompts</p>
        </div>
        <div className="flex items-center gap-2.5 self-start sm:self-center bg-gray-900/60 px-4 py-2 rounded-full border border-gray-800 text-xs font-medium text-gray-300 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
          Live Leaderboard
        </div>
      </div>

      {/* 👥 ক্রিয়েটর পডিয়াম গ্রিড (চওড়া স্পেসিং সহ - gap-8) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end relative z-10">
        {creators.slice(0, 3).map((creator, index) => {
          
          // ১ম, ২য় এবং ৩য় স্থানের জন্য আল্ট্রা-প্রিমিয়াম লাক্সারি গ্রেডিয়েন্ট স্কিম
          const rankConfig = [
            {
              badge: '🥇 Gold Elite',
              bgColor: 'hover:border-amber-500/50 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]',
              glow: 'bg-amber-500/10',
              avatarBorder: 'border-amber-500/60 shadow-[0_0_20px_rgba(245,158,11,0.25)]',
              textGlow: 'from-amber-200 via-yellow-100 to-amber-400',
              badgeStyle: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
              order: 'md:order-2 md:-translate-y-6 bg-gradient-to-b from-gray-900/80 to-gray-900/30 border-gray-800/80' 
            },
            {
              badge: '🥈 Silver Pro',
              bgColor: 'hover:border-slate-400/50 hover:shadow-[0_0_30px_rgba(148,163,184,0.08)]',
              glow: 'bg-slate-400/5',
              avatarBorder: 'border-slate-400/50 shadow-[0_0_15px_rgba(148,163,184,0.15)]',
              textGlow: 'from-slate-100 via-gray-200 to-slate-400',
              badgeStyle: 'bg-slate-400/10 text-slate-300 border-slate-400/20',
              order: 'md:order-1 bg-gray-900/40 border-gray-800/60'
            },
            {
              badge: '🥉 Bronze Master',
              bgColor: 'hover:border-orange-500/50 hover:shadow-[0_0_30px_rgba(249,115,22,0.08)]',
              glow: 'bg-orange-500/5',
              avatarBorder: 'border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.15)]',
              textGlow: 'from-orange-200 via-orange-100 to-orange-400',
              badgeStyle: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
              order: 'md:order-3 bg-gray-900/40 border-gray-800/60'
            }
          ][index] || {
            badge: `⭐ #${index + 1}`,
            bgColor: 'hover:border-purple-500/40',
            glow: 'bg-purple-500/5',
            avatarBorder: 'border-gray-800',
            textGlow: 'from-gray-100 to-gray-300',
            badgeStyle: 'bg-gray-800 text-gray-400 border-gray-700',
            order: 'bg-gray-900/40 border-gray-800/60'
          };

          return (
            <div 
              key={creator._id} 
              className={`relative p-6 sm:p-8 rounded-2xl flex flex-col items-center text-center transition-all duration-500 hover:-translate-y-3 border shadow-xl group overflow-hidden ${rankConfig.order} ${rankConfig.bgColor}`}
            >
              {/* ব্যাকগ্রাউন্ড নিয়ন গ্লো কণা */}
              <div className={`absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl transition-all duration-500 opacity-20 group-hover:opacity-100 ${rankConfig.glow}`} />

              {/* প্রিমিয়াম গ্লাস-মরফিক র্যাংক ব্যাজ */}
              <span className={`absolute top-4 right-4 text-[10px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-md shadow-sm backdrop-blur-md ${rankConfig.badgeStyle}`}>
                {rankConfig.badge}
              </span>

              {/* প্রোফাইল ইমেজ গ্লো সার্কেল */}
              <div className="relative mb-5 mt-4">
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-purple-500 via-pink-500 to-amber-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-md -m-1" />
                <img 
                  src={creator.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
                  alt={creator.name} 
                  className={`w-24 h-24 rounded-full object-cover relative z-10 border-2 transition-all duration-500 ${rankConfig.avatarBorder}`}
                />
                <span className="absolute bottom-0.5 right-0.5 z-20 bg-purple-600 border border-gray-950 text-[9px] text-white font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-md">
                  {creator.role || 'PRO'}
                </span>
              </div>

              {/* নাম এবং ইমেইল সেকশন */}
              <div className="w-full mb-6">
                <h3 className={`font-black group-hover:text-purple-400 transition-colors text-lg line-clamp-1 bg-gradient-to-r bg-clip-text text-transparent ${rankConfig.textGlow}`}>
                  {creator.name || 'Anonymous Engineer'}
                </h3>
                <p className="text-xs text-gray-500 mt-1 font-mono line-clamp-1 opacity-70 group-hover:opacity-100 transition-all">
                  {creator.email}
                </p>
              </div>

              {/* স্ট্যাটাস কাউন্টার ইনফো বক্স (ফুল উইডথ অ্যান্ড স্লীক ডিজাইন) */}
              <div className="w-full bg-gray-950/80 rounded-xl p-3.5 border border-gray-800/50 relative z-10 flex items-center justify-between px-5 group-hover:bg-gray-950/40 transition-colors">
                <div className="text-left">
                  <p className="text-[9px] uppercase tracking-widest text-gray-500 font-extrabold">Total Contributions</p>
                  <p className="text-lg font-black text-white mt-0.5">
                    {creator.totalPrompts || 0} <span className="text-xs font-medium text-gray-500">Prompts</span>
                  </p>
                </div>
                <div className="p-2.5 bg-gray-900/80 rounded-xl border border-gray-800 text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300 shadow-md">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCreators;

