'use client';
import React from 'react';
import Link from 'next/link';

const TrendingCategories = () => {
  // ডাইনামিক ক্যাটাগরি ডাটা (আইকন এবং কাউন্ট সহ)
  const categories = [
    { name: 'AI Generation', count: '140+ Prompts', icon: '🎨', color: 'from-pink-500/10 to-rose-500/10', text: 'text-pink-400', border: 'hover:border-pink-500/30' },
    { name: 'Copywriting & SEO', count: '98 Prompts', icon: '✍️', color: 'from-purple-500/10 to-indigo-500/10', text: 'text-purple-400', border: 'hover:border-purple-500/30' },
    { name: 'Coding & Dev', count: '120+ Prompts', icon: '💻', color: 'from-blue-500/10 to-cyan-500/10', text: 'text-blue-400', border: 'hover:border-blue-500/30' },
    { name: 'Marketing & Sales', count: '75 Prompts', icon: '📈', color: 'from-emerald-500/10 to-teal-500/10', text: 'text-emerald-400', border: 'hover:border-emerald-500/30' },
  ];

  return (
    <div className="bg-gray-950/40 p-6 sm:p-10 rounded-3xl border border-gray-900 max-w-7xl mx-auto shadow-2xl backdrop-blur-xl mt-16">
      
      {/* হেডার */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10">
        <div>
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
            <span className="flex items-center justify-center w-10 h-10 bg-purple-500/10 rounded-xl border border-purple-500/20 text-xl">🔥</span>
            Trending Categories
          </h2>
          <p className="text-sm text-gray-400 mt-1.5">Explore tailored prompts by your industry and specific needs</p>
        </div>
        <Link href="/all-prompt" className="text-xs font-semibold text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 px-4 py-2 rounded-xl border border-purple-500/20 transition-all self-start sm:self-center">
          Explore All Categories →
        </Link>
      </div>

      {/* ক্যাটাগরি গ্রিড */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, idx) => (
          <div 
            key={idx} 
            className={`relative bg-gray-900/40 border border-gray-800/60 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1.5 group cursor-pointer ${cat.border}`}
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} border border-gray-800 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
              {cat.icon}
            </div>
            <h3 className="font-bold text-gray-200 text-base group-hover:text-purple-400 transition-colors">
              {cat.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1 font-mono">{cat.count}</p>
            
            <span className={`absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${cat.text} text-sm`}>
              →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingCategories;