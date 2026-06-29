// "use client";

// import { authClient } from '@/lib/auth-client';
// import Image from 'next/image';
// import React, { useEffect, useState } from 'react';
// import { FaTrash, FaEdit, FaSpinner, FaEye } from 'react-icons/fa';

// // আপনার ব্যাকএন্ড বেস ইউআরএল
// const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 
// // আপনার অথেনটিকেশন থেকে আসা ইউজারের ইউনিক আইডি (ডেমো হিসেবে দেওয়া)


// export default function MyPromptsPage() {
//     const { data: session, isPending: isAuthLoading } = authClient.useSession();
//   const [prompts, setPrompts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingPrompt, setEditingPrompt] = useState(null); // মডাল ওপেন রাখার জন্য
//   const currentCreatorId = session?.user?.id || session?.user?.email || "";

//   // ১. ডেটা ফেচ করা (ক্রিয়েটর আইডি দিয়ে)
//   const fetchMyPrompts = async () => {
//     try {
//       setLoading(true);
//       const res = await fetch(`${API_BASE_URL}/all-prompts?creatorId=${currentCreatorId}`);
//       const data = await res.json();
//       setPrompts(data);
//     } catch (err) {
//       console.error("Error fetching prompts:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     // eslint-disable-next-line react-hooks/set-state-in-effect
//     fetchMyPrompts();
//   }, []);

//   // ২. ডিলিট ফাংশনালিটি
//   const handleDelete = async (id) => {
//     if (confirm("Are you sure you want to delete this prompt?")) {
//       try {
//         const res = await fetch(`${API_BASE_URL}/all-prompts/${id}`, {
//           method: 'DELETE'
//         });
//         const result = await res.json();
//         if (result.deletedCount > 0) {
//           alert("Deleted successfully!");
//           // স্টেট থেকে রিমুভ করে দেওয়া যেন রিফ্রেশ করা না লাগে
//           setPrompts(prompts.filter(p => p._id !== id));
//         }
//       } catch (err) {
//         alert("Failed to delete.");
//         console.error(err);
//       }
//     }
//   };

//   // ৩. আপডেট/এডিট সাবমিট ফাংশনালিটি
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(`${API_BASE_URL}/all-prompts/${editingPrompt._id}`, {
//         method: 'PATCH',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(editingPrompt)
//       });
//       const result = await res.json();
//       if (result.modifiedCount > 0) {
//         alert("Prompt updated successfully!");
//         setEditingPrompt(null); // মডাল বন্ধ করা
//         fetchMyPrompts(); // টেবিল রিফ্রেশ করা
//       }
//     } catch (err) {
//       alert("Failed to update.");
//       console.error(err);
//     }
//   };

//   if (loading) {
//     return <div className="flex justify-center items-center h-64 text-white"><FaSpinner className="animate-spin text-3xl" /></div>;
//   }

//   return (
//     <div className="p-6 bg-purple-950/10 min-h-screen text-white">
//       <h2 className="text-2xl font-bold mb-6 text-purple-400">My Dashboard - Prompts Manager</h2>

//       {prompts.length === 0 ? (
//         <p className="text-gray-400">No prompts found for your creator ID.</p>
//       ) : (
//         <div className="overflow-x-auto rounded-xl border border-purple-900/40 bg-purple-950/20 backdrop-blur-sm">
//           <table className="w-full text-left border-collapse">
//             <thead>
//               <tr className="bg-purple-900/40 border-b border-purple-900/60 text-gray-300 text-sm">
//                 <th className="p-4">Thumbnail</th>
//                 <th className="p-4">Title</th>
//                 <th className="p-4">Category</th>
//                 <th className="p-4">AI Tool</th>
//                 <th className="p-4">Status</th>
//                 <th className="p-4 text-center">Actions</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-purple-900/20 text-sm">
//               {prompts.map((prompt) => (
//                 <tr key={prompt._id} className="hover:bg-white/5 transition">
//                   <td className="p-4">
//                     <img  src={prompt.thumbnail || 'https://via.placeholder.com/50'} alt="thumb"  className="w-12 h-12 object-cover rounded-lg border border-purple-900/40" />
//                   </td>
//                   <td className="p-4 font-medium max-w-xs truncate">{prompt.title}</td>
//                   <td className="p-4"><span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs">{prompt.category}</span></td>
//                   <td className="p-4 text-gray-300">{prompt.aiTool}</td>
//                   <td className="p-4">
//                     <span className={`px-2 py-1 rounded-full text-xs font-semibold ${prompt.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
//                       {prompt.status}
//                     </span>
//                   </td>
//                   <td className="p-4 text-center">
//                     <div className="flex justify-center gap-3">
//                       <button onClick={() => setEditingPrompt(prompt)} className="p-2 bg-blue-600/30 text-blue-400 hover:bg-blue-600/50 rounded-lg transition" title="Edit"><FaEdit /></button>
//                       <button onClick={() => handleDelete(prompt._id)} className="p-2 bg-red-600/30 text-red-400 hover:bg-red-600/50 rounded-lg transition" title="Delete"><FaTrash /></button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}

//       {/* 🛠️ Edit Prompt Modal (পপআপ মডাল) */}
//       {editingPrompt && (
//         <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
//           <div className="bg-[#160d29] border border-purple-900/60 p-6 rounded-2xl max-w-lg w-full text-white max-h-[90vh] overflow-y-auto shadow-2xl">
//             <h3 className="text-xl font-bold mb-4 text-purple-400">Edit Prompt</h3>
            
//             <form onSubmit={handleUpdateSubmit} className="space-y-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
//                 <input type="text" value={editingPrompt.title} onChange={(e) => setEditingPrompt({...editingPrompt, title: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-900/40 text-white focus:outline-none" required />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
//                 <textarea rows="3" value={editingPrompt.description} onChange={(e) => setEditingPrompt({...editingPrompt, description: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-900/40 text-white focus:outline-none resize-none" required />
//               </div>

//               <div>
//                 <label className="block text-xs font-medium text-gray-400 mb-1">Content</label>
//                 <textarea rows="4" value={editingPrompt.content} onChange={(e) => setEditingPrompt({...editingPrompt, content: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-900/40 text-white font-mono focus:outline-none resize-none" required />
//               </div>

//               <div className="flex justify-end gap-3 pt-2">
//                 <button type="button" onClick={() => setEditingPrompt(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm transition">Cancel</button>
//                 <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-sm font-semibold transition">Save Changes</button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }





// import { auth } from "@/lib/auth"; // আপনার প্রজেক্টের auth (যেমন auth.js বা NextAuth)
import MyPromptsPage from "./MyPromptsPage";
import { authClient } from "@/lib/auth-client";

export default async function Page() {
  // ১. সার্ভার সাইড থেকে কারেন্ট লগইন থাকা ইউজারের সেশন নেওয়া হচ্ছে
  const session = await authClient(); 
  const currentCreatorId = session?.user?.id || session?.user?.email || "";

  // ২. এখানে key={currentCreatorId} দেওয়া হয়েছে। 
  // এর ফলে যখনই ক্রিয়েটর চেঞ্জ হবে, রিয়্যাক্ট পুরোনো পেজের মেমরি ও স্টেট সম্পূর্ণ ধ্বংস (Unmount) করে একদম নতুন করে পেজটি চালু করবে।
  return <MyPromptsPage key={currentCreatorId} initialCreatorId={currentCreatorId} />;
}