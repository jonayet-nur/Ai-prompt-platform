
// "use client";

// import { CreatePrompt } from '@/lib/action/prompt';
// import React, { useState } from 'react';
// import { FaUpload, FaEye, FaEyeSlash, FaTag, FaTimes, FaSpinner, FaCheckCircle } from 'react-icons/fa';

// const CATEGORIES = ['AI Writing', 'Code Generation', 'Image Generation', 'Marketing', 'Business', 'Education', 'Productivity', 'Creative Writing', 'Data Analysis', 'Other'];
// const AI_TOOLS = ['ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Copilot', 'Gemini', 'Perplexity', 'Other'];
// const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Pro'];
// const SUGGESTED_TAGS = ['Marketing', 'SEO', 'Content Creation', 'Programming', 'Design', 'Research'];

// // ⚠️ REPLACE THIS STRING WITH YOUR ACTUAL IMGBB API KEY
// const IMGBB_API_KEY = process.env.IMAGEBB_KEY 

// export default function AddPromptForm() {
//   const [formData, setFormData] = useState({
//     title: '', description: '', content: '', category: '', aiTool: '', tags: [], difficulty: 'Beginner', visibility: 'Public', thumbnail: null
//   });
//   const [previewImage, setPreviewImage] = useState(null);
//   const [tagInput, setTagInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith('image/')) {
//       setFormData((prev) => ({ ...prev, thumbnail: file })); 
//       setPreviewImage(URL.createObjectURL(file));
//     } else {
//       alert("Please upload a valid image under 5MB");
//     }
//   };

//   const handleTagAction = (tag, isAdding) => {
//     if (!tag) return;
//     setFormData((prev) => {
//       const exists = prev.tags.includes(tag);
//       if (isAdding && !exists && prev.tags.length < 5) {
//         return { ...prev, tags: [...prev.tags, tag] };
//       }
//       if (!isAdding) {
//         return { ...prev, tags: prev.tags.filter((t) => t !== tag) };
//       }
//       return prev;
//     });
//   };

//   // 🚀 Solved & Handled ImgBB Upload function
//   const uploadToImgBB = async (file) => {
//     // Check if the developer forgot to replace the placeholder key
//     if (!IMGBB_API_KEY || IMGBB_API_KEY === "YOUR_IMGBB_API_KEY") {
//       throw new Error("Missing API Key: Please configure a valid IMGBB_API_KEY at the top of the file.");
//     }

//     try {
//       const imgData = new FormData();
//       imgData.append("image", file);
      
//       const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
//         method: "POST",
//         body: imgData,
//       });
      
//       const result = await response.json();
      
//       if (response.ok && result.success) {
//         return result.data.url; 
//       } else {
//         // Captures "Invalid API v1 key" error explicitly from ImgBB API response
//         throw new Error(result.error?.message || `ImgBB server error status: ${response.status}`);
//       }
//     } catch (err) {
//       console.error("ImgBB Upload Exception:", err);
//       throw err;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!formData.title || !formData.description || !formData.content || !formData.category || !formData.aiTool) {
//       alert("Please fill in all required fields.");
//       return;
//     }

//     setIsLoading(true);

//     try {
//       let thumbnailUrl = "";
      
//       if (formData.thumbnail) {
//         thumbnailUrl = await uploadToImgBB(formData.thumbnail);
//       }

//       const finalPromptData = {
//         ...formData,
//         thumbnail: thumbnailUrl, 
//         copyCount: 0,
//         status: 'pending',
//         createdAt: new Date().toISOString(),
//       };

//       const res = await CreatePrompt(finalPromptData);
//       if (res?.insertedId) {
//         alert("Prompt submitted successfully!");
//         setShowSuccess(true);
//         setFormData({ title: '', description: '', content: '', category: '', aiTool: '', tags: [], difficulty: 'Beginner', visibility: 'Public', thumbnail: null });
//         setPreviewImage(null);
//         setTimeout(() => setShowSuccess(false), 4000);
//       }
//     } catch (error) {
//       console.error(error);
//       // Alerts the precise reason to the user interface (e.g., "Invalid API v1 key")
//       alert(`Submission failed: ${error.message || 'Unknown network error.'}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 rounded-2xl border border-purple-900/40 bg-purple-950/10 backdrop-blur-sm shadow-xl text-white my-8">
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold flex items-center gap-2"><span className="text-purple-400">📝</span> Submit New Prompt</h2>
//       </div>

//       {showSuccess && (
//         <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-start gap-3">
//           <FaCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
//           <div>
//             <p className="font-medium">Prompt submitted successfully!</p>
//           </div>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-6">
//         {/* Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">Prompt Title <span className="text-red-400">*</span></label>
//           <input type="text" name="title" required minLength={5} maxLength={100} value={formData.title} onChange={handleChange} placeholder="e.g., Ultimate Midjourney Logo Generator" className="w-full px-4 p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-white focus:outline-none focus:border-purple-500 transition" />
//         </div>

//         {/* Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">Prompt Description <span className="text-red-400">*</span></label>
//           <textarea name="description" rows="3" required minLength={20} maxLength={500} value={formData.description} onChange={handleChange} placeholder="Describe what this prompt does..." className="w-full px-4 p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-white focus:outline-none focus:border-purple-500 transition resize-none" />
//         </div>

//         {/* Content */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">Prompt Content <span className="text-red-400">*</span></label>
//           <textarea name="content" rows="4" required minLength={10} value={formData.content} onChange={handleChange} placeholder="Paste your entire prompt here..." className="w-full px-4 p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-white font-mono focus:outline-none focus:border-purple-500 transition resize-none" />
//         </div>

//         {/* Dropdowns */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {[
//             { label: 'Category', name: 'category', options: CATEGORIES },
//             { label: 'AI Tool', name: 'aiTool', options: AI_TOOLS }
//           ].map((select) => (
//             <div key={select.name}>
//               <label className="block text-sm font-medium text-gray-300 mb-2">{select.label} <span className="text-red-400">*</span></label>
//               <div className="relative">
//                 <select name={select.name} required value={formData[select.name]} onChange={handleChange} className="w-full px-4 p-3 rounded-xl bg-[#1a1030] border border-purple-900/40 text-gray-200 focus:outline-none focus:border-purple-500 appearance-none cursor-pointer">
//                   <option value="">Select {select.label.toLowerCase()}</option>
//                   {select.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
//                 </select>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Tags and Difficulty */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Tags <span className="text-gray-500 text-xs">(Max 5)</span></label>
//             <div className="flex gap-2">
//               <input 
//                 type="text" 
//                 value={tagInput} 
//                 onChange={(e) => setTagInput(e.target.value)} 
//                 onKeyDown={(e) => { 
//                   if(e.key === 'Enter') { 
//                     e.preventDefault(); 
//                     handleTagAction(tagInput.trim(), true); 
//                     setTagInput(''); 
//                   }
//                 }} 
//                 placeholder="Type and press Enter" 
//                 className="flex-1 px-4 p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-white focus:outline-none focus:border-purple-500 transition" 
//               />
//               <button type="button" onClick={() => { handleTagAction(tagInput.trim(), true); setTagInput(''); }} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl transition">Add</button>
//             </div>
            
//             <div className="flex flex-wrap gap-2 mt-3">
//               {formData.tags.map(tag => (
//                 <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm flex items-center gap-2">
//                   <FaTag className="text-xs" /> {tag}
//                   <button type="button" onClick={() => handleTagAction(tag, false)} className="hover:text-red-400 transition-colors"><FaTimes size={12} /></button>
//                 </span>
//               ))}
//             </div>

//             <div className="mt-2">
//               <p className="text-xs text-gray-500 mb-1">Suggested tags:</p>
//               <div className="flex flex-wrap gap-1">
//                 {SUGGESTED_TAGS.filter(tag => !formData.tags.includes(tag)).map(tag => (
//                   <button key={tag} type="button" onClick={() => handleTagAction(tag, true)} className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 transition">
//                     {tag}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level <span className="text-red-400">*</span></label>
//             <div className="grid grid-cols-3 gap-2">
//               {DIFFICULTY_LEVELS.map(level => (
//                 <button key={level} type="button" onClick={() => setFormData(prev => ({ ...prev, difficulty: level }))} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${formData.difficulty === level 
//                       ? level === 'Beginner' 
//                         ? 'bg-green-500/20 text-green-400 border border-green-500/50'
//                         : level === 'Intermediate'
//                         ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
//                         : 'bg-red-500/20 text-red-400 border border-red-500/50'
//                       : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'

// }`}>
//                   {level}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Thumbnail */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail Image <span className="text-gray-500 text-xs">(Optional)</span></label>
//           <div className="flex items-center gap-4">
//             <label className="flex items-center gap-2 px-4 p-3 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-900/60 cursor-pointer text-sm font-medium transition text-purple-300">
//               <FaUpload /> Upload Image
//               <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//             </label>
//             {previewImage && (
//               <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-purple-900/40 group">
//                 <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
//                 <button type="button" onClick={() => { setFormData(p => ({ ...p, thumbnail: null })); setPreviewImage(null); }} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><FaTimes className="text-white text-xl" /></button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Visibility */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">Visibility <span className="text-red-400">*</span></label>
//           <div className="flex gap-4">
//             {['Public', 'Private'].map((type) => (
//               <label key={type} className={`flex items-center gap-2 p-3 px-5 rounded-xl border cursor-pointer transition select-none ${formData.visibility === type ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-purple-900/40 text-gray-400'}`}>
//                 <input type="radio" name="visibility" value={type} checked={formData.visibility === type} onChange={handleChange} className="hidden" />
//                 {type === 'Public' ? <FaEye /> : <FaEyeSlash />} {type}
//               </label>
//             ))}
//           </div>
//         </div>

//         {/* Submit */}
//         <button type="submit" disabled={isLoading} className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed">
//           {isLoading ? <span className="flex items-center justify-center gap-2"><FaSpinner className="animate-spin" /> Submitting...</span> : 'Submit for Approval'}
//         </button>
//       </form>
//     </div>
//   );
// }





"use client";

import { CreatePrompt } from '@/lib/action/prompt';
import React, { useState } from 'react';
import { FaUpload, FaEye, FaEyeSlash, FaTag, FaTimes, FaSpinner, FaCheckCircle } from 'react-icons/fa';
// 🔐 Better-Auth ক্লায়েন্ট ইমপোর্ট (আপনার প্রজেক্টের সঠিক পাথ অনুযায়ী মেলান, যেমন: '@/lib/auth-client')
import { authClient } from '@/lib/auth-client'; 

const CATEGORIES = ['AI Writing', 'Code Generation', 'Image Generation', 'Marketing', 'Business', 'Education', 'Productivity', 'Creative Writing', 'Data Analysis','UI Design', 'Other'];
const AI_TOOLS = ['ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Copilot', 'Gemini', 'Perplexity', 'Other'];
const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Pro'];
const SUGGESTED_TAGS = ['Marketing', 'SEO', 'Content Creation', 'Programming', 'Design', 'Research'];

const IMGBB_API_KEY =process.env.NEXT_PUBLIC_IMAGEBB_KEY;

export default function AddPromptForm() {
  // 1. Better-Auth থেকে সেশন এবং ইউজার ডাটা নিয়ে আসা
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  
  const [formData, setFormData] = useState({
    title: '', description: '', content: '', category: '', aiTool: '', tags: [], difficulty: 'Beginner', visibility: 'Public', thumbnail: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // 2. সেশন থেকে ইউজারের আইডি (বা ইমেইল) জেনারেট করা
  const currentCreatorId = session?.user?.id || session?.user?.email || "";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size <= 5 * 1024 * 1024 && file.type.startsWith('image/')) {
      setFormData((prev) => ({ ...prev, thumbnail: file })); 
      setPreviewImage(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid image under 5MB");
    }
  };

  const handleTagAction = (tag, isAdding) => {
    if (!tag) return;
    setFormData((prev) => {
      const exists = prev.tags.includes(tag);
      if (isAdding && !exists && prev.tags.length < 5) {
        return { ...prev, tags: [...prev.tags, tag] };
      }
      if (!isAdding) {
        return { ...prev, tags: prev.tags.filter((t) => t !== tag) };
      }
      return prev;
    });
  };

  const uploadToImgBB = async (file) => {
    if (!IMGBB_API_KEY) {
      throw new Error("Missing ImgBB API Key! Please configure it in your .env file.");
    }

    try {
      const imgData = new FormData();
      imgData.append("image", file);
      
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
        method: "POST",
        body: imgData,
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        return result.data.url; 
      } else {
        throw new Error(result.error?.message || `ImgBB server error status: ${response.status}`);
      }
    } catch (err) {
      console.error("ImgBB Upload Exception:", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 3. ইউজার লগইন না থাকলে সাবমিট ব্লক করা
    if (!currentCreatorId) {
      alert("You must be logged in to submit a prompt!");
      return;
    }

    if (!formData.title || !formData.description || !formData.content || !formData.category || !formData.aiTool) {
      alert("Please fill in all required fields.");
      return;
    }

    setIsLoading(true);

    try {
      let thumbnailUrl = "";
      
      if (formData.thumbnail) {
        thumbnailUrl = await uploadToImgBB(formData.thumbnail);
      }

      // 4. ডেটায় নিখুঁতভাবে Better-Auth এর creatorId পুশ করা
      const finalPromptData = {
        ...formData,
        creatorId: currentCreatorId, 
        thumbnail: thumbnailUrl, 
        copyCount: 0,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      const res = await CreatePrompt(finalPromptData);
      if (res?.insertedId) {
        alert("Prompt submitted successfully!");
        setShowSuccess(true);
        setFormData({ title: '', description: '', content: '', category: '', aiTool: '', tags: [], difficulty: 'Beginner', visibility: 'Public', thumbnail: null });
        setPreviewImage(null);
        setTimeout(() => setShowSuccess(false), 4000);
      }
    } catch (error) {
      console.error(error);
      alert(`Submission failed: ${error.message || 'Unknown network error.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  // Better-Auth সেশন লোড হওয়ার সময় একটি সুন্দর স্কেলেটন বা স্পিনার দেখানো
  if (isAuthLoading) {
    return (
      <div className="max-w-3xl mx-auto p-12 text-center text-white">
        <FaSpinner className="animate-spin text-3xl mx-auto mb-4 text-purple-500" />
        <p className="text-gray-400">Checking authentication...</p>
      </div>
    );
  }

  // ইউজার লগইন না থাকলে ফর্ম হাইড করে মেসেজ দেখানো (Security Fallback)
  if (!session) {
    return (
      <div className="max-w-3xl mx-auto p-8 rounded-2xl border border-red-900/40 bg-red-950/10 backdrop-blur-sm text-center text-white my-8">
        <h2 className="text-xl font-bold text-red-400 mb-2">Access Denied</h2>
        <p className="text-gray-400">Please log in to your account to submit a new prompt to the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-2xl border border-purple-900/40 bg-purple-950/10 backdrop-blur-sm shadow-xl text-white my-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2"><span className="text-purple-400">📝</span> Submit New Prompt</h2>
        <p className="text-xs text-gray-400 mt-1">Posting as: <span className="text-purple-300 font-semibold">{session.user.email}</span></p>
      </div>

      {showSuccess && (
        <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-start gap-3">
          <FaCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-medium">Prompt submitted successfully!</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Prompt Title <span className="text-red-400">*</span></label>
          <input type="text" name="title" required minLength={5} maxLength={100} value={formData.title} onChange={handleChange} placeholder="e.g., Ultimate Midjourney Logo Generator" className="w-full px-4 p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-white focus:outline-none focus:border-purple-500 transition" />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Prompt Description <span className="text-red-400">*</span></label>
          <textarea name="description" rows="3" required minLength={20} maxLength={500} value={formData.description} onChange={handleChange} placeholder="Describe what this prompt does..." className="w-full px-4 p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-white focus:outline-none focus:border-purple-500 transition resize-none" />
        </div>

        {/* Content */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Prompt Content <span className="text-red-400">*</span></label>
          <textarea name="content" rows="4" required minLength={10} value={formData.content} onChange={handleChange} placeholder="Paste your entire prompt here..." className="w-full px-4 p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-white font-mono focus:outline-none focus:border-purple-500 transition resize-none" />
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: 'Category', name: 'category', options: CATEGORIES },
            { label: 'AI Tool', name: 'aiTool', options: AI_TOOLS }
          ].map((select) => (
            <div key={select.name}>
              <label className="block text-sm font-medium text-gray-300 mb-2">{select.label} <span className="text-red-400">*</span></label>
              <div className="relative">
                <select name={select.name} required value={formData[select.name]} onChange={handleChange} className="w-full px-4 p-3 rounded-xl bg-[#1a1030] border border-purple-900/40 text-gray-200 focus:outline-none focus:border-purple-500 appearance-none cursor-pointer">
                  <option value="">Select {select.label.toLowerCase()}</option>
                  {select.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
              </div>
            </div>
          ))}
        </div>

        {/* Tags and Difficulty */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Tags <span className="text-gray-500 text-xs">(Max 5)</span></label>
            <div className="flex gap-2">
              <input 
                type="text" 
                value={tagInput} 
                onChange={(e) => setTagInput(e.target.value)} 
                onKeyDown={(e) => { 
                  if(e.key === 'Enter') { 
                    e.preventDefault(); 
                    handleTagAction(tagInput.trim(), true); 
                    setTagInput(''); 
                  }
                }} 
                placeholder="Type and press Enter" 
                className="flex-1 px-4 p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-white focus:outline-none focus:border-purple-500 transition" 
              />
              <button type="button" onClick={() => { handleTagAction(tagInput.trim(), true); setTagInput(''); }} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl transition">Add</button>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.tags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm flex items-center gap-2">
                  <FaTag className="text-xs" /> {tag}
                  <button type="button" onClick={() => handleTagAction(tag, false)} className="hover:text-red-400 transition-colors"><FaTimes size={12} /></button>
                </span>
              ))}
            </div>

            <div className="mt-2">
              <p className="text-xs text-gray-500 mb-1">Suggested tags:</p>
              <div className="flex flex-wrap gap-1">
                {SUGGESTED_TAGS.filter(tag => !formData.tags.includes(tag)).map(tag => (
                  <button key={tag} type="button" onClick={() => handleTagAction(tag, true)} className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 transition">
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level <span className="text-red-400">*</span></label>
            <div className="grid grid-cols-3 gap-2">
              {DIFFICULTY_LEVELS.map(level => (
                <button key={level} type="button" onClick={() => setFormData(prev => ({ ...prev, difficulty: level }))} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${formData.difficulty === level 
                      ? level === 'Beginner' 
                        ? 'bg-green-500/20 text-green-400 border border-green-500/50'
                        : level === 'Intermediate'
                        ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
                        : 'bg-red-500/20 text-red-400 border border-red-500/50'
                      : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
                }`}>
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Thumbnail Image <span className="text-gray-500 text-xs">(Optional)</span></label>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 px-4 p-3 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-900/60 cursor-pointer text-sm font-medium transition text-purple-300">
              <FaUpload /> Upload Image
              <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
            </label>
            {previewImage && (
              <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-purple-900/40 group">
                <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
                <button type="button" onClick={() => { setFormData(p => ({ ...p, thumbnail: null })); setPreviewImage(null); }} className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"><FaTimes className="text-white text-xl" /></button>
              </div>
            )}
          </div>
        </div>

        {/* Visibility */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Visibility <span className="text-red-400">*</span></label>
          <div className="flex gap-4">
            {['Public', 'Private'].map((type) => (
              <label key={type} className={`flex items-center gap-2 p-3 px-5 rounded-xl border cursor-pointer transition select-none ${formData.visibility === type ? 'border-purple-500 bg-purple-500/10 text-white' : 'border-purple-900/40 text-gray-400'}`}>
                <input type="radio" name="visibility" value={type} checked={formData.visibility === type} onChange={handleChange} className="hidden" />
                {type === 'Public' ? <FaEye /> : <FaEyeSlash />} {type}
              </label>
            ))}
          </div>
        </div>

        {/* Submit */}
        <button type="submit" disabled={isLoading} className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed">
          {isLoading ? <span className="flex items-center justify-center gap-2"><FaSpinner className="animate-spin" /> Submitting...</span> : 'Submit for Approval'}
        </button>
      </form>
    </div>
  );
}