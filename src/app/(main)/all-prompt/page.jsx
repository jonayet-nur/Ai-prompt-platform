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
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-prompts`)
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
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px] bg-gray-950">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
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
    <div className="bg-gray-950 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
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