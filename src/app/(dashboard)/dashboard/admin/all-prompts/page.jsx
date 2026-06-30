'use client'

import React, { useEffect, useState } from 'react';

const PromptsSection = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-prompts`)
      .then(res => res.json())
      .then(data => {
        setPrompts(data);
        setLoading(false);
      })
      .catch(err => console.error("Prompts Fetch Error:", err));
  }, []);

  const updateStatus = (id, status, feedbackText = '') => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/prompts/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status, feedback: feedbackText })
    })
    .then(res => res.json())
    .then(() => {
      setPrompts(prompts.map(p => p._id === id ? { ...p, status } : p));
      setShowModal(false);
      setFeedback('');
    })
    .catch(err => console.error("Status Update Error:", err));
  };

  const handleFeature = (id, currentStatus) => {
    const nextStatus = !currentStatus;
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/prompts/${id}/feature`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ isFeatured: nextStatus })
    })
    .then(res => res.json())
    .then(() => {
      setPrompts(prompts.map(p => p._id === id ? { ...p, isFeatured: nextStatus } : p));
    })
    .catch(err => console.error("Feature Update Error:", err));
  };

  if (loading) return <div className="text-gray-400">Loading Prompts...</div>;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800/50 border-b border-gray-800 text-xs text-gray-400 uppercase font-semibold">
            <th className="p-4">Title</th>
            <th className="p-4">Category</th>
            <th className="p-4">Status</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 text-sm">
          {prompts.map(prompt => (
            <tr key={prompt._id} className="hover:bg-gray-800/20">
              <td className="p-4 font-medium text-gray-200">{prompt.title}</td>
              <td className="p-4 text-gray-400">{prompt.category}</td>
              <td className="p-4">
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase border ${
                  prompt.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                }`}>{prompt.status || 'pending'}</span>
              </td>
              <td className="p-4 text-right space-x-2">
                {prompt.status !== 'approved' && (
                  <button onClick={() => updateStatus(prompt._id, 'approved')} className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition-all">Approve</button>
                )}
                {prompt.status !== 'rejected' && (
                  <button onClick={() => { setSelectedId(prompt._id); setShowModal(true); }} className="text-xs bg-gray-800 hover:bg-gray-700 text-red-400 px-3 py-1.5 rounded-lg border border-gray-700 transition-all">Reject</button>
                )}
                <button 
                  onClick={() => handleFeature(prompt._id, prompt.isFeatured)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${prompt.isFeatured ? 'bg-purple-600 text-white border-purple-500' : 'text-purple-400 bg-purple-500/10 border-purple-500/20 hover:bg-purple-600/20'}`}
                >
                  {prompt.isFeatured ? '★ Featured' : 'Feature'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* REJECTION MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-950 border border-gray-800 p-6 rounded-2xl w-full max-w-md">
            <h3 className="text-lg font-bold text-gray-200 mb-2">Rejection Feedback</h3>
            <textarea
              className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-purple-500 h-28 resize-none"
              placeholder="Why is this prompt rejected?..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
            />
            <div className="flex justify-end gap-3 mt-4">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
              <button onClick={() => updateStatus(selectedId, 'rejected', feedback)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-sm font-semibold rounded-xl">Reject Prompt</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptsSection;