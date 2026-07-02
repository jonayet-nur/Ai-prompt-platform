'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';

const UserFavorites = () => {
  // 📝 রিয়েল-টাইম আর্কিটেকচারাল স্ট্যাটিক ডাটা (ডাটাবেজ ফরম্যাটে সাজানো)
  const [favorites, setFavorites] = useState([
    {
      _id: '1',
      title: 'Midjourney Ultra-Realistic Architecture Prompt',
      category: 'AI Generation',
      aiTool: 'Midjourney v6',
      copyCount: 1420,
      savedAt: '2026-06-28',
      difficulty: 'Advanced',
      content: '/imagine prompt: Cinematic brutalist villa in the Swiss Alps, floor-to-ceiling glass windows, foggy morning, photorealistic, 8k resolution, shot on 35mm lens --ar 16:9 --v 6.0'
    },
    {
      _id: '2',
      title: 'SaaS Landing Page High-Converting Copywriter',
      category: 'Copywriting',
      aiTool: 'ChatGPT-4o',
      copyCount: 890,
      savedAt: '2026-07-01',
      difficulty: 'Intermediate',
      content: 'Act as a world-class SaaS copywriter. Write a headline, subheadline, and a 3-step value proposition for a bento-grid based project management tool. Tone should be witty, direct, and focused on developers.'
    },
    {
      _id: '3',
      title: 'Next.js 15 Middleware Auth Route Optimizer',
      category: 'Coding & Dev',
      aiTool: 'Claude 3.5 Sonnet',
      copyCount: 2310,
      savedAt: '2026-07-02',
      difficulty: 'Expert',
      content: 'Write a highly optimized Next.js Middleware script that handles JWT authentication chaining, bypasses static asset folders efficiently, and redirects unauthenticated users to /login with proper callback urls.'
    }
  ]);

  const [copiedId, setCopiedId] = useState(null);
  const [activeTab, setActiveTab] = useState('All');

  // ✂️ ক্লিপবোর্ড কপি হ্যান্ডলার
  const handleCopy = async (text, id) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // 🗑️ রিমুভ হ্যান্ডলার
  const handleRemove = (id) => {
    setFavorites(favorites.filter(item => item._id !== id));
  };

  // 📊 ডাইনামিক ফিল্টারিং লজিক
  const filteredFavorites = useMemo(() => {
    if (activeTab === 'All') return favorites;
    return favorites.filter(item => item.category === activeTab);
  }, [favorites, activeTab]);

  // 📈 মেট্রিকেস ক্যালকুলেশন
  const totalCopies = useMemo(() => {
    return favorites.reduce((acc, item) => acc + item.copyCount, 0);
  }, [favorites]);

  return (
    <div className="bg-gray-950 min-h-screen py-10 px-4 sm:px-6 lg:px-8 text-gray-200 antialiased selection:bg-purple-500/30">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* 👑 ১. প্রফেশনাল ড্যাশবোর্ড হেডার */}
        <div className="relative p-6 sm:p-8 bg-gray-900/20 rounded-3xl border border-gray-900 overflow-hidden backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-purple-400 uppercase tracking-[0.15em] mb-2">
                <span>Console Dashboard</span>
                <span className="text-gray-800">/</span>
                <span className="text-gray-400">Bookmarks</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight flex items-center gap-3">
                Saved Prompt Library
              </h1>
              <p className="text-sm text-gray-400 mt-1.5 max-w-xl">
                Manage your high-frequency production-ready prompt templates and engineering assets.
              </p>
            </div>

            {/* লাইভ কাউন্টার উইজেট */}
            <div className="flex gap-4 w-full md:w-auto">
              <div className="bg-gray-950/80 border border-gray-900 px-5 py-3 rounded-2xl flex-1 md:flex-initial min-w-[120px]">
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Stored Assets</p>
                <p className="text-2xl font-black text-purple-400 mt-0.5">{favorites.length}</p>
              </div>
              <div className="bg-gray-950/80 border border-gray-900 px-5 py-3 rounded-2xl flex-1 md:flex-initial min-w-[120px]">
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500">Total Utilized</p>
                <p className="text-2xl font-black text-emerald-400 mt-0.5">{totalCopies.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🎛️ ২. ডাইনামিক ফিল্টার ট্যাব বার */}
        <div className="flex items-center gap-2 border-b border-gray-900 pb-px overflow-x-auto no-scrollbar">
          {['All', 'AI Generation', 'Copywriting', 'Coding & Dev'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-xs font-bold tracking-wide border-b-2 whitespace-nowrap transition-all duration-300 ${
                activeTab === tab
                  ? 'border-purple-500 text-purple-400 bg-purple-500/5'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* 🚫 ৩. এম্পটি স্টেট */}
        {filteredFavorites.length === 0 && (
          <div className="text-center py-24 bg-gray-900/10 rounded-3xl border border-dashed border-gray-900 max-w-md mx-auto backdrop-blur-sm">
            <div className="w-12 h-12 rounded-full bg-gray-950 border border-gray-900 flex items-center justify-center mx-auto text-xl shadow-inner">📦</div>
            <h3 className="text-base font-bold text-gray-300 mt-4">No matching matrices</h3>
            <p className="text-xs text-gray-500 mt-1 max-w-xs mx-auto">Try switching categories or browse fresh templates.</p>
            <Link href="/all-prompt" className="mt-5 inline-block text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-xl transition-all">
              Explore Prompts
            </Link>
          </div>
        )}

        {/* 🗂️ ৪. প্রফেশনাল ডাইনামিক কার্ড লিস্ট */}
        <div className="space-y-4">
          {filteredFavorites.map((item) => (
            <div 
              key={item._id}
              className="bg-gray-900/20 border border-gray-900 hover:border-gray-800/80 p-5 sm:p-6 rounded-2xl transition-all duration-300 group flex flex-col lg:flex-row justify-between gap-6 hover:shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            >
              {/* বাম পাশের কন্টেন্ট এবং মেটাডাটা */}
              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-[9px] font-black uppercase tracking-wider text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md">
                    {item.category}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">
                    {item.aiTool}
                  </span>
                  <span className="text-[9px] font-black uppercase tracking-wider text-gray-400 bg-gray-950 border border-gray-800 px-2.5 py-1 rounded-md font-mono">
                    {item.difficulty}
                  </span>
                  <span className="text-xs text-gray-600 font-mono ml-auto lg:ml-2">
                    {item.savedAt}
                  </span>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-400 transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-500 font-mono">
                    <svg className="w-3.5 h-3.5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
                    <span>System Sync: {item.copyCount.toLocaleString()} Deployments</span>
                  </div>
                </div>

                {/* 📜 প্রিমিয়াম আইডিই-স্টাইল কোড ভিউয়ার */}
                <div className="relative bg-gray-950 rounded-xl border border-gray-900 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-gray-900/40 border-b border-gray-900 text-[10px] font-mono text-gray-500">
                    <span>PROMPT_payload.txt</span>
                    <span>UTF-8</span>
                  </div>
                  <div className="p-4 font-mono text-xs text-gray-400 whitespace-pre-wrap leading-relaxed max-h-24 overflow-y-auto custom-scrollbar flex gap-3">
                    <span className="text-gray-700 select-none text-right border-r border-gray-900 pr-2 block">1</span>
                    <span className="flex-1 select-all">{item.content}</span>
                  </div>
                </div>
              </div>

              {/* ডান পাশের ড্যাশবোর্ড কন্ট্রোল বাটনস */}
              <div className="flex lg:flex-col justify-end items-center gap-2.5 lg:border-l lg:border-gray-900 lg:pl-6 min-w-[160px]">
                
                <button 
                  onClick={() => handleCopy(item.content, item._id)}
                  className={`w-full text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 border transition-all ${
                    copiedId === item._id 
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                      : 'bg-gray-950 text-gray-300 border-gray-900 hover:border-gray-800 hover:bg-gray-900'
                  }`}
                >
                  {copiedId === item._id ? '✓ Payload Synced' : 'Copy Token'}
                </button>

                <Link href={`/all-prompt/${item._id}`} className="w-full text-center text-xs font-bold bg-purple-600 hover:bg-purple-700 text-white py-2.5 px-4 rounded-xl transition-all shadow-md shadow-purple-600/5">
                  Launch View
                </Link>

                <button 
                  onClick={() => handleRemove(item._id)}
                  className="w-full text-xs font-bold text-gray-500 hover:text-rose-400 bg-transparent hover:bg-rose-500/5 py-2 px-4 rounded-xl transition-all duration-200 mt-2"
                >
                  Purge Asset
                </button>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default UserFavorites;