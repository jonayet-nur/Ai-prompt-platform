
// "use client";

// import { CreatePrompt } from '@/lib/action/prompt';
// import React, { useState } from 'react';
// import { 
//   FaUpload, 
//   FaEye, 
//   FaEyeSlash, 
//   FaInfoCircle, 
//   FaTag, 
//   FaTimes,
//   FaSpinner,
//   FaCheckCircle,
//   FaExclamationTriangle
// } from 'react-icons/fa';

// // Static data for dropdowns
// const CATEGORIES = [
//   'AI Writing',
//   'Code Generation',
//   'Image Generation',
//   'Marketing',
//   'Business',
//   'Education',
//   'Productivity',
//   'Creative Writing',
//   'Data Analysis',
//   'Other'
// ];

// const AI_TOOLS = [
//   'ChatGPT',
//   'Claude',
//   'Midjourney',
//   'DALL-E',
//   'Stable Diffusion',
//   'Copilot',
//   'Gemini',
//   'Perplexity',
//   'Other'
// ];

// const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Pro'];

// const SUGGESTED_TAGS = [
//   'Marketing', 'SEO', 'Content Creation', 'Programming', 
//   'Design', 'Research', 'Writing', 'Analysis', 
//   'Automation', 'Productivity', 'AI', 'Machine Learning'
// ];

// export default function AddPromptForm() {
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     content: '',
//     category: '',
//     aiTool: '',
//     tags: [],
//     difficulty: 'Beginner',
//     visibility: 'Public',
//     thumbnail: null,
//   });

//   const [previewImage, setPreviewImage] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [tagInput, setTagInput] = useState('');
//   const [errors, setErrors] = useState({});
//   const [showSuccess, setShowSuccess] = useState(false);

//   // Handle input change
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     // Clear error for this field
//     if (errors[name]) {
//       setErrors((prev) => ({ ...prev, [name]: '' }));
//     }
//   };

//   // Handle image upload
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file size (max 5MB)
//       if (file.size > 5 * 1024 * 1024) {
//         setErrors((prev) => ({ ...prev, thumbnail: 'Image must be less than 5MB' }));
//         return;
//       }
      
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         setErrors((prev) => ({ ...prev, thumbnail: 'Please upload an image file' }));
//         return;
//       }

//       setFormData((prev) => ({ ...prev, thumbnail: file }));
//       setPreviewImage(URL.createObjectURL(file));
//       setErrors((prev) => ({ ...prev, thumbnail: '' }));
//     }
//   };

//   // Remove thumbnail
//   const removeThumbnail = () => {
//     setFormData((prev) => ({ ...prev, thumbnail: null }));
//     setPreviewImage(null);
//   };

//   // Handle tag addition
//   const handleAddTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       if (formData.tags.length >= 5) {
//         setErrors((prev) => ({ ...prev, tags: 'Maximum 5 tags allowed' }));
//         return;
//       }
//       setFormData((prev) => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()]
//       }));
//       setTagInput('');
//       setErrors((prev) => ({ ...prev, tags: '' }));
//     }
//   };

//   // Handle tag removal
//   const handleRemoveTag = (tagToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       tags: prev.tags.filter(tag => tag !== tagToRemove)
//     }));
//   };

//   // Handle tag keypress (Enter)
//   const handleTagKeyPress = (e) => {
//     if (e.key === 'Enter') {
//       e.preventDefault();
//       handleAddTag();
//     }
//   };

//   // Handle suggested tag click
//   const handleSuggestedTagClick = (tag) => {
//     if (!formData.tags.includes(tag) && formData.tags.length < 5) {
//       setFormData((prev) => ({
//         ...prev,
//         tags: [...prev.tags, tag]
//       }));
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.title.trim()) newErrors.title = 'Title is required';
//     if (formData.title.length < 5) newErrors.title = 'Title must be at least 5 characters';
//     if (formData.title.length > 100) newErrors.title = 'Title must be less than 100 characters';
    
//     if (!formData.description.trim()) newErrors.description = 'Description is required';
//     if (formData.description.length < 20) newErrors.description = 'Description must be at least 20 characters';
//     if (formData.description.length > 500) newErrors.description = 'Description must be less than 500 characters';
    
//     if (!formData.content.trim()) newErrors.content = 'Content is required';
//     if (formData.content.length < 10) newErrors.content = 'Content must be at least 10 characters';
    
//     if (!formData.category) newErrors.category = 'Category is required';
//     if (!formData.aiTool) newErrors.aiTool = 'AI Tool is required';
    
//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) {
//       // Scroll to first error
//       const firstError = document.querySelector('.text-red-400');
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
//       }
//       return;
//     }

//     setIsLoading(true);

//     // Prepare final data
//     const finalPromptData = {
//       ...formData,
//       copyCount: 0,
//       status: 'pending',
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       // Simulate API call
//     //   await new Promise(resolve => setTimeout(resolve, 2000));
//     const res= await CreatePrompt(finalPromptData);
//     if(res.insertedId){
//  alert("JOb post successfully")
 
//     }
      
//     //   console.log('Submitting Prompt Data: ', finalPromptData);
      
//       // Show success message
//       setShowSuccess(true);
      
//       // Reset form after 3 seconds
//       setTimeout(() => {
//         setFormData({
//           title: '',
//           description: '',
//           content: '',
//           category: '',
//           aiTool: '',
//           tags: [],
//           difficulty: 'Beginner',
//           visibility: 'Public',
//           thumbnail: null,
//         });
//         setPreviewImage(null);
//         setShowSuccess(false);
//         setIsLoading(false);
//       }, 3000);

//     } catch (error) {
//       console.error('Error submitting prompt:', error);
//       alert('Failed to submit prompt. Please try again.');
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-6 rounded-2xl border border-purple-900/40 bg-purple-950/10 backdrop-blur-sm shadow-xl text-white my-8">
      
//       {/* Form Header */}
//       <div className="mb-8">
//         <h2 className="text-2xl font-bold flex items-center gap-2">
//           <span className="text-purple-400">📝</span> Submit New Prompt
//         </h2>
//         <p className="text-gray-400 text-sm mt-1">
//           Fill in the fields below to list your AI prompt on the marketplace.
//         </p>
//       </div>

//       {/* Success Message */}
//       {showSuccess && (
//         <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-start gap-3 animate-fadeIn">
//           <FaCheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
//           <div>
//             <p className="font-medium">Prompt submitted successfully!</p>
//             <p className="text-sm text-green-400/70">Your prompt is now pending review by an admin.</p>
//           </div>
//         </div>
//       )}

//       {/* Admin Notice Box */}
//       <div className="p-4 mb-6 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 flex items-start gap-3 text-sm">
//         <FaInfoCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
//         <div>
//           <p className="font-medium">Pending Review Notice</p>
//           <p className="text-amber-300/70">
//             All newly submitted prompts are automatically marked as <strong className="text-amber-300">pending</strong> and remain hidden from the marketplace until reviewed by an admin. 
//             Admins can either <strong className="text-green-400">approve</strong> the prompt, or <strong className="text-red-400">reject</strong> it if it does not meet platform guidelines.
//           </p>
//         </div>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
        
//         {/* Prompt Title */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Prompt Title <span className="text-red-400">*</span>
//           </label>
//           <input 
//             type="text" 
//             name="title"
//             value={formData.title}
//             onChange={handleChange}
//             placeholder="e.g., Ultimate Midjourney Logo Generator"
//             className={`w-full px-4 p-3 rounded-xl bg-purple-950/20 border ${
//               errors.title ? 'border-red-500/50' : 'border-purple-900/40'
//             } text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition`}
//           />
//           {errors.title && (
//             <p className="text-red-400 text-sm mt-1">{errors.title}</p>
//           )}
//           <p className="text-gray-500 text-xs mt-1">
//             {formData.title.length}/100 characters
//           </p>
//         </div>

//         {/* Prompt Description */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Prompt Description <span className="text-red-400">*</span>
//           </label>
//           <textarea 
//             name="description"
//             rows="3"
//             value={formData.description}
//             onChange={handleChange}
//             placeholder="Describe what this prompt does and how to use it..."
//             className={`w-full px-4 p-3 rounded-xl bg-purple-950/20 border ${
//               errors.description ? 'border-red-500/50' : 'border-purple-900/40'
//             } text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition resize-none`}
//           />
//           {errors.description && (
//             <p className="text-red-400 text-sm mt-1">{errors.description}</p>
//           )}
//           <p className="text-gray-500 text-xs mt-1">
//             {formData.description.length}/500 characters
//           </p>
//         </div>

//         {/* Prompt Content */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Prompt Content <span className="text-red-400">*</span>
//           </label>
//           <textarea 
//             name="content"
//             rows="4"
//             value={formData.content}
//             onChange={handleChange}
//             placeholder="Act as a professional designer... [Paste your entire prompt here]"
//             className={`w-full px-4 p-3 rounded-xl bg-purple-950/20 border ${
//               errors.content ? 'border-red-500/50' : 'border-purple-900/40'
//             } text-white font-mono placeholder-gray-600 focus:outline-none focus:border-purple-500 transition resize-none`}
//           />
//           {errors.content && (
//             <p className="text-red-400 text-sm mt-1">{errors.content}</p>
//           )}
//         </div>

//         {/* Category & AI Tool Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//   <div>
//     <label className="block text-sm font-medium text-gray-300 mb-2">
//       Category <span className="text-red-400">*</span>
//     </label>
//     <div className="relative">
//       <select
//         name="category"
//         value={formData.category}
//         onChange={handleChange}
//         className={`w-full px-4 p-3 rounded-xl bg-[#1a1030] border ${
//           errors.category ? 'border-red-500/50' : 'border-purple-900/40'
//         } text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition appearance-none cursor-pointer`}
//         style={{ 
//           background: '#1a1030',
//           color: '#e5e7eb'
//         }}
//       >
//         <option value="" className="bg-[#1a1030] text-gray-400">Select a category</option>
//         {CATEGORIES.map(cat => (
//           <option key={cat} value={cat} className="bg-[#1a1030] text-gray-200 hover:bg-purple-500/20">
//             {cat}
//           </option>
//         ))}
//       </select>
      
//       {/* Custom Arrow */}
//       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
//         <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </div>
//     </div>
//     {errors.category && (
//       <p className="text-red-400 text-sm mt-1">{errors.category}</p>
//     )}
//   </div>
  
//   <div>
//     <label className="block text-sm font-medium text-gray-300 mb-2">
//       AI Tool <span className="text-red-400">*</span>
//     </label>
//     <div className="relative">
//       <select
//         name="aiTool"
//         value={formData.aiTool}
//         onChange={handleChange}
//         className={`w-full px-4 p-3 rounded-xl bg-[#1a1030] border ${
//           errors.aiTool ? 'border-red-500/50' : 'border-purple-900/40'
//         } text-gray-200 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition appearance-none cursor-pointer`}
//         style={{ 
//           background: '#1a1030',
//           color: '#e5e7eb'
//         }}
//       >
//         <option value="" className="bg-[#1a1030] text-gray-400">Select an AI tool</option>
//         {AI_TOOLS.map(tool => (
//           <option key={tool} value={tool} className="bg-[#1a1030] text-gray-200 hover:bg-purple-500/20">
//             {tool}
//           </option>
//         ))}
//       </select>
      
//       {/* Custom Arrow */}
//       <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
//         <svg className="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//         </svg>
//       </div>
//     </div>
//     {errors.aiTool && (
//       <p className="text-red-400 text-sm mt-1">{errors.aiTool}</p>
//     )}
//   </div>
// </div>
//         {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Category <span className="text-red-400">*</span>
//             </label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className={`w-full px-4 p-3 rounded-xl bg-purple-950/20 border ${
//                 errors.category ? 'border-red-500/50' : 'border-purple-900/40'
//               } text-white focus:outline-none focus:border-purple-500 transition appearance-none cursor-pointer`}
//             >
//               <option value="">Select a category</option>
//               {CATEGORIES.map(cat => (
//                 <option key={cat} value={cat}>{cat}</option>
//               ))}
//             </select>
//             {errors.category && (
//               <p className="text-red-400 text-sm mt-1">{errors.category}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               AI Tool <span className="text-red-400">*</span>
//             </label>
//             <select
//               name="aiTool"
//               value={formData.aiTool}
//               onChange={handleChange}
//               className={`w-full px-4 p-3 rounded-xl bg-purple-950/20 border ${
//                 errors.aiTool ? 'border-red-500/50' : 'border-purple-900/40'
//               } text-white focus:outline-none focus:border-purple-500 transition appearance-none cursor-pointer`}
//             >
//               <option value="">Select an AI tool</option>
//               {AI_TOOLS.map(tool => (
//                 <option key={tool} value={tool}>{tool}</option>
//               ))}
//             </select>
//             {errors.aiTool && (
//               <p className="text-red-400 text-sm mt-1">{errors.aiTool}</p>
//             )}
//           </div>
//         </div> */}

//         {/* Tags & Difficulty Level Row */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Tags <span className="text-gray-500 text-xs">(Max 5)</span>
//             </label>
//             <div className="flex gap-2">
//               <input 
//                 type="text" 
//                 value={tagInput}
//                 onChange={(e) => setTagInput(e.target.value)}
//                 onKeyPress={handleTagKeyPress}
//                 placeholder="Type and press Enter"
//                 className="flex-1 px-4 p-3 rounded-xl bg-purple-950/20 border border-purple-900/40 text-white placeholder-gray-600 focus:outline-none focus:border-purple-500 transition"
//               />
//               <button
//                 type="button"
//                 onClick={handleAddTag}
//                 className="px-4 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl transition"
//               >
//                 Add
//               </button>
//             </div>
            
//             {/* Selected Tags */}
//             {formData.tags.length > 0 && (
//               <div className="flex flex-wrap gap-2 mt-3">
//                 {formData.tags.map(tag => (
//                   <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm flex items-center gap-2">
//                     <FaTag className="text-xs" />
//                     {tag}
//                     <button
//                       type="button"
//                       onClick={() => handleRemoveTag(tag)}
//                       className="hover:text-red-400 transition-colors"
//                     >
//                       <FaTimes size={12} />
//                     </button>
//                   </span>
//                 ))}
//               </div>
//             )}
            
//             {/* Suggested Tags */}
//             <div className="mt-2">
//               <p className="text-xs text-gray-500 mb-1">Suggested tags:</p>
//               <div className="flex flex-wrap gap-1">
//                 {SUGGESTED_TAGS.filter(tag => !formData.tags.includes(tag)).slice(0, 6).map(tag => (
//                   <button
//                     key={tag}
//                     type="button"
//                     onClick={() => handleSuggestedTagClick(tag)}
//                     className="px-2 py-1 text-xs bg-white/5 hover:bg-white/10 rounded-lg text-gray-400 transition"
//                   >
//                     {tag}
//                   </button>
//                 ))}
//               </div>
//             </div>
            
//             {errors.tags && (
//               <p className="text-red-400 text-sm mt-1">{errors.tags}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Difficulty Level <span className="text-red-400">*</span>
//             </label>
//             <div className="grid grid-cols-3 gap-2">
//               {DIFFICULTY_LEVELS.map(level => (
//                 <button
//                   key={level}
//                   type="button"
//                   onClick={() => {
//                     setFormData(prev => ({ ...prev, difficulty: level }));
//                   }}
//                   className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${
//                     formData.difficulty === level 
//                       ? level === 'Beginner' 
//                         ? 'bg-green-500/20 text-green-400 border border-green-500/50'
//                         : level === 'Intermediate'
//                         ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/50'
//                         : 'bg-red-500/20 text-red-400 border border-red-500/50'
//                       : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'
//                   }`}
//                 >
//                   {level}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Thumbnail Image Upload */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Thumbnail Image <span className="text-gray-500 text-xs">(Optional)</span>
//           </label>
//           <div className="flex flex-col md:flex-row items-center gap-4">
//             <label className="w-full md:w-auto flex items-center justify-center gap-2 px-4 p-3 rounded-xl bg-purple-900/30 hover:bg-purple-900/50 border border-purple-900/60 cursor-pointer text-sm font-medium transition text-purple-300">
//               <FaUpload /> Upload Image
//               <input 
//                 type="file" 
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="hidden" 
//               />
//             </label>
//             {previewImage && (
//               <div className="relative w-20 h-20 rounded-lg overflow-hidden border border-purple-900/40 group">
//                 <img src={previewImage} alt="Preview" className="w-full h-full object-cover" />
//                 <button
//                   type="button"
//                   onClick={removeThumbnail}
//                   className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
//                 >
//                   <FaTimes className="text-white text-xl" />
//                 </button>
//               </div>
//             )}
//           </div>
//           {errors.thumbnail && (
//             <p className="text-red-400 text-sm mt-1">{errors.thumbnail}</p>
//           )}
//         </div>

//         {/* Visibility Options */}
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-2">
//             Visibility <span className="text-red-400">*</span>
//           </label>
//           <div className="flex gap-4">
//             <label className={`flex items-center gap-2 p-3 px-5 rounded-xl border cursor-pointer transition select-none ${
//               formData.visibility === 'Public' 
//                 ? 'border-purple-500 bg-purple-500/10 text-white' 
//                 : 'border-purple-900/40 text-gray-400 hover:border-purple-900/80'
//             }`}>
//               <input 
//                 type="radio" 
//                 name="visibility" 
//                 value="Public"
//                 checked={formData.visibility === 'Public'}
//                 onChange={handleChange}
//                 className="hidden"
//               />
//               <FaEye /> Public
//             </label>
//             <label className={`flex items-center gap-2 p-3 px-5 rounded-xl border cursor-pointer transition select-none ${
//               formData.visibility === 'Private' 
//                 ? 'border-purple-500 bg-purple-500/10 text-white' 
//                 : 'border-purple-900/40 text-gray-400 hover:border-purple-900/80'
//             }`}>
//               <input 
//                 type="radio" 
//                 name="visibility" 
//                 value="Private"
//                 checked={formData.visibility === 'Private'}
//                 onChange={handleChange}
//                 className="hidden"
//               />
//               <FaEyeSlash /> Private
//             </label>
//           </div>
//         </div>

//         {/* Status Information */}
//         <div className="p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl">
//           <p className="text-sm text-gray-400">
//             <span className="text-yellow-400 font-medium">⏳ Status: Pending Review</span>
//             <br />
//             Your prompt will be reviewed by an admin before it appears in the marketplace.
//             This process usually takes 24-48 hours.
//           </p>
//         </div>

//         {/* Submit Button */}
//         <button 
//           type="submit"
//           disabled={isLoading}
//           className="w-full p-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold rounded-xl transition shadow-lg shadow-purple-950/50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           {isLoading ? (
//             <span className="flex items-center justify-center gap-2">
//               <FaSpinner className="animate-spin" />
//               Submitting...
//             </span>
//           ) : (
//             'Submit for Approval'
//           )}
//         </button>

//       </form>
//     </div>
//   );
// }











// "use client";

// import { CreatePrompt } from '@/lib/action/prompt';
// import React, { useState } from 'react';
// import { FaUpload, FaEye, FaEyeSlash, FaTag, FaTimes, FaSpinner, FaCheckCircle } from 'react-icons/fa';

// const CATEGORIES = ['AI Writing', 'Code Generation', 'Image Generation', 'Marketing', 'Business', 'Education', 'Productivity', 'Creative Writing', 'Data Analysis', 'Other'];
// const AI_TOOLS = ['ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Copilot', 'Gemini', 'Perplexity', 'Other'];
// const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Pro'];
// const SUGGESTED_TAGS = ['Marketing', 'SEO', 'Content Creation', 'Programming', 'Design', 'Research'];

// // ⚠️ এখানে আপনার নিজের ImgBB API Key বসান
// const IMGBB_API_KEY = "YOUR_IMGBB_API_KEY"; 

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
//       setFormData((prev) => ({ ...prev, thumbnail: file })); // ডেটাবেজে পাঠানোর আগে ফাইলে থাকবে
//       setPreviewImage(URL.createObjectURL(file));
//     } else {
//       alert("Please upload a valid image under 5MB");
//     }
//   };

//   // ট্যাগ অ্যাড বা রিমুভ করার একক ফাংশন
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

//   // ImgBB তে ইমেজ আপলোড করার হেল্পার ফাংশন
//   const uploadToImgBB = async (file) => {
//     const imgData = new FormData();
//     imgData.append("image", file);
    
//     const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
//       method: "POST",
//       body: imgData,
//     });
    
//     const result = await response.json();
//     if (result.success) {
//       return result.data.url; // direct image link
//     } else {
//       throw new Error("ImgBB Upload Failed");
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
      
//       // যদি ইউজার কোনো ইমেজ সিলেক্ট করে থাকে, তবে আগে ImgBB তে আপলোড হবে
//       if (formData.thumbnail) {
//         thumbnailUrl = await uploadToImgBB(formData.thumbnail);
//       }

//       const finalPromptData = {
//         ...formData,
//         thumbnail: thumbnailUrl, // এখানে ফাইল অবজেক্টের বদলে Direct URL চলে যাবে (যেমনটা image_9a4246.png এর মতো সুন্দর স্ট্রাকচার হবে)
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
//       alert('Submission failed. Image upload or API error.');
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
//         <div className="mb-6 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-start gap-3 animate-fadeIn">
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

//         {/* Dropdowns Group */}
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
            
//             {/* Selected Tags Display */}
//             <div className="flex flex-wrap gap-2 mt-3">
//               {formData.tags.map(tag => (
//                 <span key={tag} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm flex items-center gap-2">
//                   <FaTag className="text-xs" /> {tag}
//                   <button type="button" onClick={() => handleTagAction(tag, false)} className="hover:text-red-400 transition-colors"><FaTimes size={12} /></button>
//                 </span>
//               ))}
//             </div>

//             {/* Suggested Tags Area */}
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

//           {/* Difficulty */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level <span className="text-red-400">*</span></label>
//             <div className="grid grid-cols-3 gap-2">
//               {DIFFICULTY_LEVELS.map(level => (
//                 <button key={level} type="button" onClick={() => setFormData(prev => ({ ...prev, difficulty: level }))} className={`px-4 py-3 rounded-xl text-sm font-medium transition-all ${formData.difficulty === level ? 'bg-purple-600 text-white border border-purple-500' : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10'}`}>
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

//         {/* Submit Button */}
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

const CATEGORIES = ['AI Writing', 'Code Generation', 'Image Generation', 'Marketing', 'Business', 'Education', 'Productivity', 'Creative Writing', 'Data Analysis', 'Other'];
const AI_TOOLS = ['ChatGPT', 'Claude', 'Midjourney', 'DALL-E', 'Stable Diffusion', 'Copilot', 'Gemini', 'Perplexity', 'Other'];
const DIFFICULTY_LEVELS = ['Beginner', 'Intermediate', 'Pro'];
const SUGGESTED_TAGS = ['Marketing', 'SEO', 'Content Creation', 'Programming', 'Design', 'Research'];

// ⚠️ REPLACE THIS STRING WITH YOUR ACTUAL IMGBB API KEY
const IMGBB_API_KEY = "7e3a4f5412a3c16620bdc7aea6e7a60e"; 

export default function AddPromptForm() {
  const [formData, setFormData] = useState({
    title: '', description: '', content: '', category: '', aiTool: '', tags: [], difficulty: 'Beginner', visibility: 'Public', thumbnail: null
  });
  const [previewImage, setPreviewImage] = useState(null);
  const [tagInput, setTagInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

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

  // 🚀 Solved & Handled ImgBB Upload function
  const uploadToImgBB = async (file) => {
    // Check if the developer forgot to replace the placeholder key
    if (!IMGBB_API_KEY || IMGBB_API_KEY === "YOUR_IMGBB_API_KEY") {
      throw new Error("Missing API Key: Please configure a valid IMGBB_API_KEY at the top of the file.");
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
        // Captures "Invalid API v1 key" error explicitly from ImgBB API response
        throw new Error(result.error?.message || `ImgBB server error status: ${response.status}`);
      }
    } catch (err) {
      console.error("ImgBB Upload Exception:", err);
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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

      const finalPromptData = {
        ...formData,
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
      // Alerts the precise reason to the user interface (e.g., "Invalid API v1 key")
      alert(`Submission failed: ${error.message || 'Unknown network error.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-2xl border border-purple-900/40 bg-purple-950/10 backdrop-blur-sm shadow-xl text-white my-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold flex items-center gap-2"><span className="text-purple-400">📝</span> Submit New Prompt</h2>
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





