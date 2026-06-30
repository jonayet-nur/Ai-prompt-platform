'use client'
import React, { useEffect, useState } from 'react';

const TopCreators = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // আপনার .env ফাইলের NEXT_PUBLIC_BASE_URL ব্যবহার করে এপিআই কল
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

  // লোডিং স্টেট হ্যান্ডেল করা
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // যদি কোনো ক্রিয়েটর ডাটা না থাকে
  if (creators.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No top creators found at this moment.
      </div>
    );
  }

  return (
    <div className="bg-gray-950 p-6 rounded-2xl border border-gray-800 max-w-4xl mx-auto shadow-2xl">
      {/* হেডার সেকশন */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500 flex items-center gap-2">
            🏆 Top Creators
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">Most active prompt engineers in our community</p>
        </div>
        <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2.5 py-1 rounded-full font-medium">
          Top 3
        </span>
      </div>

      {/* ক্রিয়েটর কার্ড গ্রিড/লিস্ট */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {creators.map((creator, index) => {
          // প্রথম, দ্বিতীয় ও তৃতীয় স্থান নির্ধারণকারী ব্যাজ বা মেডেল
          const medals = ['🥇', '🥈', '🥉'];
          
          return (
            <div 
              key={creator._id} 
              className="relative bg-gray-900 border border-gray-800 hover:border-purple-500/40 p-5 rounded-xl flex flex-col items-center text-center transition-all duration-300 hover:-translate-y-1 shadow-md group"
            >
              {/* মেডেল পজিশন */}
              <span className="absolute top-3 left-3 text-lg">
                {medals[index] || '⭐️'}
              </span>

              {/* প্রোফাইল ইমেজ */}
              <div className="relative mb-3">
                <img 
                  src={creator.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'} 
                  alt={creator.name} 
                  className="w-16 h-16 rounded-full object-cover border-2 border-gray-800 group-hover:border-purple-500 transition-all duration-300"
                />
                <span className="absolute -bottom-1 -right-1 bg-purple-600 text-[10px] text-white font-bold px-1.5 py-0.5 rounded-md uppercase tracking-wider">
                  {creator.role || 'Creator'}
                </span>
              </div>

              {/* নাম এবং ইমেইল */}
              <h3 className="font-semibold text-gray-200 group-hover:text-purple-400 transition-colors text-sm line-clamp-1">
                {creator.name || 'Anonymous Creator'}
              </h3>
              <p className="text-xs text-gray-500 mb-4 line-clamp-1">
                {creator.email}
              </p>

              {/* মোট প্রম্পট সংখ্যা */}
              <div className="w-full bg-gray-950/60 rounded-lg p-2 border border-gray-800/80">
                <p className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">Total Prompts</p>
                <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300 mt-0.5">
                  {creator.totalPrompts} {creator.totalPrompts === 1 ? 'Prompt' : 'Prompts'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TopCreators;