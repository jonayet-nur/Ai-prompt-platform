// import React from 'react'

// const AllPrompts = () => {
//   return (
//     <div>AllPrompts page</div>
//   )
// }

// export default AllPrompts


'use client'

import PromptCard from '@/Components/ui/Card';
import React, { useEffect, useState } from 'react';
// import PromptCard from './PromptCard'; // আগের তৈরি করা Reusable Card কম্পোনেন্ট

const AllPromptsFeed = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // .env ফাইলের NEXT_PUBLIC_BASE_URL ব্যবহার করে /all-prompts এপিআই কল
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-prompts?status=approved`)
      .then((res) => res.json())
      .then((data) => {
        setPrompts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching all prompts:", err);
        setLoading(false);
      });
  }, []);

  // ডাটা লোড হওয়ার সময় স্পিনার অ্যানিমেশন
  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center min-h-[400px] bg-gray-950">
  //       <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
  //     </div>
  //   );
  // }
  

  if (loading) {
    return (
       <div className="flex flex-col justify-center items-center min-h-[400px] bg-gray-950 relative overflow-hidden px-4">
  
  {/* 🔮 ব্যাকগ্রাউন্ডে নিয়ন অ্যাম্বিয়েন্ট গ্লো */}
  <div className="absolute w-56 h-56 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none animate-pulse" />
  <div className="absolute w-36 h-36 bg-pink-500/5 rounded-full blur-[70px] pointer-events-none animate-pulse delay-500" />

  {/* 🔄 মেইন লোডার কন্টেইনার */}
  <div className="relative flex flex-col items-center gap-6 z-10">
    
    {/* ডাবল-রিং অ্যানিমেটেড আর্কিটেকচার */}
    <div className="relative w-16 h-16 flex items-center justify-center">
      
      {/* ১. বাইরের পার্পল রিং (ক্লকওয়াইজ ঘুরবে) */}
      <div className="absolute inset-0 rounded-full border-2 border-purple-500/10 border-t-purple-500 border-r-purple-500 animate-spin shadow-[0_0_15px_rgba(168,85,247,0.3)]"></div>
      
      {/* ২. ভেতরের পিঙ্ক রিং (অ্যান্টি-ক্লকওয়াইজ উল্টো ঘুরবে) */}
      <div className="absolute w-10 h-10 rounded-full border-2 border-pink-500/10 border-b-pink-500 border-l-pink-500 animate-[spin_1.5s_linear_infinite] reverse-spin"></div>
      
      {/* ৩. সেন্টারে থাকা ফিক্সড এআই ডট */}
      <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-ping"></div>
    </div>

    {/* 📝 স্লীক টাইপোগ্রাফি (টেক্সট) */}
    <div className="text-center space-y-1.5">
      <p className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-purple-200 to-gray-400 uppercase tracking-[0.25em] font-mono">
        Processing Matrices
      </p>
      <p className="text-[10px] text-gray-500 font-medium tracking-wide max-w-[200px] mx-auto">
        Optimizing prompt environment...
      </p>
    </div>

  </div>
</div>
    );
  }



  // ডাটাবেজ বা কালেকশন যদি একদম খালি থাকে
  if (prompts.length === 0) {
    return (
      <div className="bg-gray-950 min-h-screen flex items-center justify-center">
        <div className="text-center text-gray-500 py-10">
          <p className="text-xl font-semibold mb-2">No Prompts Available</p>
          <p className="text-sm">Be the first one to create an amazing AI prompt!</p>
        </div>
      </div>
    );
  }

  return (
    <div className=" min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* 🚀 সেকশন হেডার */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 border-b border-gray-900 pb-6">
          <div className='py-15'>
            <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
              All AI Prompts
            </h1>
            <p className="text-sm text-gray-400 mt-2">
              Browse through the complete collection of production-ready prompts ({prompts.length}).
            </p>
          </div>
          
          {/* কাউন্টার ব্যাজ */}
          <div className="mt-4 md:mt-0">
            <span className="bg-purple-500/10 text-purple-400 border border-purple-500/20 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider">
              Total Prompts: {prompts.length}
            </span>
          </div>
        </div>

        {/* 🎴 রেসপন্সিভ প্রম্পটস গ্রিড */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {prompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default AllPromptsFeed;