// import React from 'react'

// const Features = () => {
//   return (
//     <div>Features</div>
//   )
// }

// export default Features


'use client'
import React, { useEffect, useState } from 'react';
import PromptCard from './ui/Card';


const Features = () => {
  const [featuredPrompts, setFeaturedPrompts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // .env ফাইলের NEXT_PUBLIC_BASE_URL ব্যবহার করে /feature-prompt এপিআই কল
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/feature-prompt`)
      .then((res) => res.json())
      .then((data) => {
        setFeaturedPrompts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured prompts:", err);
        setLoading(false);
      });
  }, []);

  // ডাটা লোড হওয়ার সময় স্কিলটন বা স্পিনার লোডার
  if (loading) {
    return (
      <div className="bg-gray-950 py-16 flex justify-center items-center">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  // যদি কোনো ফিচারড প্রম্পট না থাকে তবে সেকশনটি হাইড থাকবে
  if (featuredPrompts.length === 0) {
    return null; 
  }

  return (
    <section className="bg-gray-950 py-16 px-4 sm:px-6 lg:px-8 border-b border-gray-900">
      <div className="max-w-7xl mx-auto">
        
        {/* 🎯 সেকশন হেডার ও প্রিমিয়াম টেক্সট */}
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 bg-purple-500/10 px-3 py-1 rounded-full border border-purple-500/20">
            ⚡ Handpicked Collection
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 tracking-tight">
            Featured AI Prompts
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-2xl mx-auto">
            Supercharge your workflow with our top-performing, expert-crafted prompts optimized for incredible results.
          </p>
        </div>

        {/* 🎴 রেসপন্সিভ গ্রিড (এপিআই থেকে আসা সর্বোচ্চ ৬টি প্রম্পট শো করবে) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 lg:gap-8">
          {featuredPrompts.map((prompt) => (
            <PromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;