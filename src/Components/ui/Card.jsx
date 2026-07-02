// 'use client'

// import Link from 'next/link';
// import React from 'react';

// const PromptCard = ({ prompt }) => {
//   const {
//     title,
//     description,
//     category,
//     aiTool,
//     tags,
//     difficulty,
//     thumbnail,
//     copyCount,
//   } = prompt;

//   return (
//     <div className=" border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 group shadow-lg flex flex-col h-full">
      
//       {/* 🖼️ Thumbnail & Floating Badges */}
//       <div className="relative h-48 w-full overflow-hidden ">
//         <img 
//           src={thumbnail || 'https://via.placeholder.com/400x300?text=No+Image'} 
//           alt={title} 
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//         />
//         {/* AI Tool Badge (Top Left) */}
//         <div className="absolute top-3 left-3  backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase tracking-wide border border-white/10">
//           {aiTool}
//         </div>
//         {/* Difficulty Badge (Top Right) */}
//         <div className={`absolute top-3 right-3 backdrop-blur-md text-[10px] font-semibold px-2 py-1 rounded-md border ${
//           difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
//           difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
//           'bg-red-500/20 text-red-300 border-red-500/30'
//         }`}>
//           {difficulty}
//         </div>
//       </div>

//       {/* 📝 Content Section */}
//       <div className="p-5 flex flex-col flex-grow">
//         <div className="mb-2">
//           <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
//             {category}
//           </span>
//         </div>
        
//         <h3 className="text-lg font-bold text-gray-100 mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors" title={title}>
//           {title}
//         </h3>
        
//         <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">
//           {description}
//         </p>

//         {/* 🏷️ Tags */}
//         <div className="flex flex-wrap gap-1.5 mb-4">
//           {tags?.slice(0, 3).map((tag, idx) => (
//             <span key={idx} className="text-[11px] text-gray-400 bg-gray-800 border border-gray-700 px-2 py-1 rounded-md">
//               #{tag}
//             </span>
//           ))}
//           {/* যদি ৩টির বেশি ট্যাগ থাকে */}
//           {tags?.length > 3 && (
//             <span className="text-[11px] text-gray-500 bg-gray-800 border border-gray-700 px-2 py-1 rounded-md">
//               +{tags.length - 3}
//             </span>
//           )}
//         </div>

//         {/* ⚙️ Footer / Action Area */}
//         <div className="pt-4 border-t border-gray-800 flex items-center justify-between mt-auto">
//           <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
//             {/* Copy Icon */}
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
//             </svg>
//             {copyCount} Copies
//           </div>
//           <Link href={`/all-prompt/${prompt._id}`}>
//           <button className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-4 py-1.5 rounded-lg transition-all duration-300 font-medium">
//             View Prompt
//           </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PromptCard;



'use client';

import Link from 'next/link';
import React, { useState } from 'react';

const PromptCard = ({ prompt, onCopySuccess }) => {
  const {
    _id,
    title,
    description,
    category,
    aiTool,
    tags,
    difficulty,
    thumbnail,
    copyCount,
    content,
  } = prompt;

  // ডাটাবেজ থেকে আসা ভ্যালু স্টেটে রাখা হলো
  const [localCopies, setLocalCopies] = useState(copyCount || 0);
  const [isCopied, setIsCopied] = useState(false);

  const handleQuickCopy = async () => {
    if (!content) return;

    try {
      // ১. ক্লিপবোর্ডে কপি করা
      await navigator.clipboard.writeText(content);
      setIsCopied(true);

      // ২. ব্যাকএন্ড ডাটাবেজে কাউন্ট ১ বাড়ানোর জন্য এপিআই কল
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-prompts/count-update/${_id}`, {
        method: 'PATCH',
      });
      const data = await res.json();

      if (data.success) {
        // ৩. এই কার্ডের কাউন্ট লোকালি আপডেট করা
        setLocalCopies(data.updatedPrompt.copyCount);
        
        // ৪. প্যারেন্ট সেকশনকে (Features / All Prompts) জানানো যেন সে তার ডাটা রিলোড করে
        if (onCopySuccess) {
          onCopySuccess();
        }
      }

      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy or update count!", err);
    }
  };

  return (
    <div className="bg-gray-900/40 border border-gray-800 rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 group shadow-lg flex flex-col h-full">
      {/* 🖼️ Thumbnail & Floating Badges */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={thumbnail || 'https://via.placeholder.com/400x300?text=No+Image'} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 backdrop-blur-md bg-black/40 text-white text-[10px] font-bold px-2 py-1 rounded-md uppercase border border-white/10">
          {aiTool}
        </div>
        <div className={`absolute top-3 right-3 backdrop-blur-md text-[10px] font-semibold px-2 py-1 rounded-md border ${
          difficulty === 'Beginner' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' :
          difficulty === 'Intermediate' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
          'bg-red-500/20 text-red-300 border-red-500/30'
        }`}>
          {difficulty}
        </div>
      </div>

      {/* 📝 Content Section */}
      <div className="p-5 flex flex-col flex-grow">
        <div className="mb-2">
          <span className="text-xs font-medium text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded-full border border-purple-500/20">
            {category}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-gray-100 mb-2 line-clamp-1 group-hover:text-purple-400 transition-colors" title={title}>
          {title}
        </h3>
        
        <p className="text-sm text-gray-400 mb-4 line-clamp-2 flex-grow">
          {description}
        </p>

        {/* 🏷️ Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {tags?.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[11px] text-gray-400 bg-gray-800 border border-gray-700 px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>

        {/* ⚙️ Footer / Action Area */}
        <div className="pt-4 border-t border-gray-800 flex items-center justify-between mt-auto gap-2">
          
          {/* 🔄 ডাইনামিক কুইক কপি বাটন */}
          <button 
            onClick={handleQuickCopy}
            className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg transition-all border ${
              isCopied 
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' 
                : 'text-gray-400 border-transparent hover:border-gray-800 hover:bg-gray-800/50 hover:text-gray-200'
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            <span>{isCopied ? 'Copied!' : `${localCopies} Copies`}</span>
          </button>

          <Link href={`/all-prompt/${_id}`}>
            <span className="text-sm bg-purple-600 hover:bg-purple-700 text-white px-3.5 py-1.5 rounded-lg transition-all duration-300 font-medium inline-block text-center cursor-pointer">
              View Prompt
            </span>
          </Link>

        </div>
      </div>
    </div>
  );
};

export default PromptCard;