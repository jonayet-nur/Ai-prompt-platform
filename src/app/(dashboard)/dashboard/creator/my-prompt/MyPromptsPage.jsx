"use client";

import { getMyPrompt } from '@/lib/api/getmyprompts';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaTrash, FaEdit, FaSpinner, FaFolderOpen } from 'react-icons/fa';

const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL; 

export default function MyPromptsPage({ initialCreatorId }) {
  const { data: session, isPending: isAuthLoading } = authClient.useSession();
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasFetched, setHasFetched] = useState(false); 
  const [editingPrompt, setEditingPrompt] = useState(null); 
  
  // সার্ভার সাইড থেকে পাঠানো আইডি আগে রিসিভ করবে, না থাকলে ক্লায়েন্ট সেশন দেখবে
  const currentCreatorId = initialCreatorId || session?.user?.id || session?.user?.email || "";

  // ১. ডেটা ফেচ করার মূল ফাংশন
  const handleFetchPrompts = async () => {
    if (!currentCreatorId || loading) return;
    setLoading(true);
    try {
      const result = await getMyPrompt(currentCreatorId);
      setPrompts(result || []);
      setHasFetched(true);
    } catch (err) {
      console.error("Error fetching prompts:", err);
    } finally {
      setLoading(false); 
    }
  };

  // ✅ [Safe Auto-Fetch Solution] কোনো useEffect বা Microtask ছাড়াই এরর-ফ্রি অটো-ফেচ
  if (currentCreatorId && !hasFetched && !loading) {
    handleFetchPrompts();
  }

  // ২. ডিলিট ফাংশনালিটি
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this prompt?")) {
      try {
        const res = await fetch(`${API_BASE_URL}/all-prompts/${id}`, {
          method: 'DELETE'
        });
        const result = await res.json();
        
        if (result.deletedCount > 0) {
          alert("Deleted successfully!");
          setPrompts((prevPrompts) => prevPrompts.filter(p => p._id !== id));
        } else {
          alert("Could not delete from database.");
        }
      } catch (err) {
        alert("Failed to delete.");
        console.error(err);
      }
    }
  };

  // ৩. আপডেট/এডিট সাবমিট ফাংশনালিটি
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE_URL}/all-prompts/${editingPrompt._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingPrompt)
      });
      const result = await res.json();
      
      if (result.modifiedCount > 0 || result.matchedCount > 0) {
        alert("Prompt updated successfully!");
        setEditingPrompt(null); 
        handleFetchPrompts(); 
      } else {
        alert("No changes were made.");
      }
    } catch (err) {
      alert("Failed to update.");
      console.error(err);
    }
  };

  // লোডিং ইন্ডিকেটর (অথেন্টিকেশন বা প্রথমবার ডাটা লোড হওয়ার সময়)
  if (isAuthLoading || (loading && !hasFetched)) {
    return (
      <div className="flex justify-center items-center h-64 text-white">
        <FaSpinner className="animate-spin text-3xl text-purple-500" />
      </div>
    );
  }

  return (
    <div className="p-6 bg-purple-950/10 min-h-screen text-white flex flex-col">
      <h2 className="text-2xl font-bold mb-6 text-purple-400">My Dashboard - Prompts Manager</h2>

      {/* 🛑 যদি ইউজার লগইন না থাকে */}
      {!currentCreatorId ? (
        <div className="flex-1 flex flex-col justify-center items-center my-auto p-8 text-center bg-purple-950/20 backdrop-blur-sm rounded-2xl border border-purple-900/30 max-w-md mx-auto w-full h-64">
          <FaFolderOpen className="text-4xl text-purple-500/50 mb-3" />
          <p className="text-gray-400 font-medium">Please log in to manage your prompts.</p>
        </div>
      ) : prompts.length === 0 ? (
        /* 📂 প্রম্পট না থাকলে স্ক্রিনের মাঝখানে সুন্দর এম্পটি স্টেট কার্ড দেখাবে */
        <div className="flex-1 flex flex-col justify-center items-center my-auto p-8 text-center bg-purple-950/20 backdrop-blur-sm rounded-2xl border border-purple-900/30 max-w-md mx-auto w-full h-64">
          <FaFolderOpen className="text-4xl text-purple-500/50 mb-3" />
          <p className="text-gray-300 font-semibold text-lg">No Prompts Found</p>
          <p className="text-gray-500 text-sm mt-1">You haven't submitted any prompts yet for this creator account.</p>
        </div>
      ) : (
        /* 📊 ডেটা টেবিল সেকশন */
        <div className="overflow-x-auto rounded-xl border border-purple-900/40 bg-purple-950/20 backdrop-blur-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-purple-900/40 border-b border-purple-900/60 text-gray-300 text-sm">
                <th className="p-4">Thumbnail</th>
                <th className="p-4">Title</th>
                <th className="p-4">Category</th>
                <th className="p-4">AI Tool</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-900/20 text-sm">
              {prompts.map((prompt) => (
                <tr key={prompt._id} className="hover:bg-white/5 transition">
                  <td className="p-4">
                    <div className="relative w-12 h-12">
                      <img 
                        src={prompt.thumbnail || 'https://via.placeholder.com/50'} 
                        alt="thumb" 
                      
                        sizes="48px"
                        className="object-cover rounded-lg border border-purple-900/40" 
                      />
                    </div>
                  </td>
                  <td className="p-4 font-medium max-w-xs truncate">{prompt.title}</td>
                  <td className="p-4"><span className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-md text-xs">{prompt.category}</span></td>
                  <td className="p-4 text-gray-300">{prompt.aiTool}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${prompt.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-green-500/20 text-green-400'}`}>
                      {prompt.status}
                    </span>
                  </td>
                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-3">
                      <button onClick={() => setEditingPrompt(prompt)} className="p-2 bg-blue-600/30 text-blue-400 hover:bg-blue-600/50 rounded-lg transition" title="Edit"><FaEdit /></button>
                      <button onClick={() => handleDelete(prompt._id)} className="p-2 bg-red-600/30 text-red-400 hover:bg-red-600/50 rounded-lg transition" title="Delete"><FaTrash /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 🛠️ Edit Prompt Modal */}
      {editingPrompt && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center p-4 z-50 backdrop-blur-sm">
          <div className="bg-[#160d29] border border-purple-900/60 p-6 rounded-2xl max-w-lg w-full text-white max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-purple-400">Edit Prompt</h3>
            
            <form onSubmit={handleUpdateSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Title</label>
                <input type="text" value={editingPrompt.title} onChange={(e) => setEditingPrompt({...editingPrompt, title: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-900/40 text-white focus:outline-none" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Description</label>
                <textarea rows="3" value={editingPrompt.description} onChange={(e) => setEditingPrompt({...editingPrompt, description: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-900/40 text-white focus:outline-none resize-none" required />
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Content</label>
                <textarea rows="4" value={editingPrompt.content} onChange={(e) => setEditingPrompt({...editingPrompt, content: e.target.value})} className="w-full px-3 py-2 rounded-xl bg-purple-950/40 border border-purple-900/40 text-white font-mono focus:outline-none resize-none" required />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setEditingPrompt(null)} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-xl text-sm transition">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl text-sm font-semibold transition">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}