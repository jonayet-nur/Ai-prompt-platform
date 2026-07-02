// 'use client'

// import React, { useEffect, useState } from 'react';

// const PromptsSection = () => {
//   const [prompts, setPrompts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedId, setSelectedId] = useState(null);
//   const [feedback, setFeedback] = useState('');

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-prompts`)
//       .then(res => res.json())
//       .then(data => {
//         setPrompts(data);
//         setLoading(false);
//       })
//       .catch(err => console.error("Prompts Fetch Error:", err));
//   }, []);

//   const updateStatus = (id, status, feedbackText = '') => {
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/prompts/${id}/status`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ status, feedback: feedbackText })
//     })
//     .then(res => res.json())
//     .then(() => {
//       setPrompts(prompts.map(p => p._id === id ? { ...p, status } : p));
//       setShowModal(false);
//       setFeedback('');
//     })
//     .catch(err => console.error("Status Update Error:", err));
//   };

//   const handleFeature = (id, currentStatus) => {
//     const nextStatus = !currentStatus;
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/prompts/${id}/feature`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ isFeatured: nextStatus })
//     })
//     .then(res => res.json())
//     .then(() => {
//       setPrompts(prompts.map(p => p._id === id ? { ...p, isFeatured: nextStatus } : p));
//     })
//     .catch(err => console.error("Feature Update Error:", err));
//   };

//   if (loading) return <div className="text-gray-400">Loading Prompts...</div>;

//   return (
//     <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr className="bg-gray-800/50 border-b border-gray-800 text-xs text-gray-400 uppercase font-semibold">
//             <th className="p-4">Title</th>
//             <th className="p-4">Category</th>
//             <th className="p-4">Status</th>
//             <th className="p-4 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-800 text-sm">
//           {prompts.map(prompt => (
//             <tr key={prompt._id} className="hover:bg-gray-800/20">
//               <td className="p-4 font-medium text-gray-200">{prompt.title}</td>
//               <td className="p-4 text-gray-400">{prompt.category}</td>
//               <td className="p-4">
//                 <span className={`text-xs font-semibold px-2.5 py-1 rounded-full uppercase border ${
//                   prompt.status === 'approved' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
//                 }`}>{prompt.status || 'pending'}</span>
//               </td>
//               <td className="p-4 text-right space-x-2">
//                 {prompt.status !== 'approved' && (
//                   <button onClick={() => updateStatus(prompt._id, 'approved')} className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition-all">Approve</button>
//                 )}
//                 {prompt.status !== 'rejected' && (
//                   <button onClick={() => { setSelectedId(prompt._id); setShowModal(true); }} className="text-xs bg-gray-800 hover:bg-gray-700 text-red-400 px-3 py-1.5 rounded-lg border border-gray-700 transition-all">Reject</button>
//                 )}
//                 <button 
//                   onClick={() => handleFeature(prompt._id, prompt.isFeatured)}
//                   className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${prompt.isFeatured ? 'bg-purple-600 text-white border-purple-500' : 'text-purple-400 bg-purple-500/10 border-purple-500/20 hover:bg-purple-600/20'}`}
//                 >
//                   {prompt.isFeatured ? '★ Featured' : 'Feature'}
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* REJECTION MODAL */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
//           <div className="bg-gray-950 border border-gray-800 p-6 rounded-2xl w-full max-w-md">
//             <h3 className="text-lg font-bold text-gray-200 mb-2">Rejection Feedback</h3>
//             <textarea
//               className="w-full bg-gray-900 border border-gray-800 rounded-xl p-3 text-sm text-gray-200 focus:outline-none focus:border-purple-500 h-28 resize-none"
//               placeholder="Why is this prompt rejected?..."
//               value={feedback}
//               onChange={(e) => setFeedback(e.target.value)}
//             />
//             <div className="flex justify-end gap-3 mt-4">
//               <button onClick={() => setShowModal(false)} className="px-4 py-2 text-sm text-gray-400 hover:text-gray-200">Cancel</button>
//               <button onClick={() => updateStatus(selectedId, 'rejected', feedback)} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-sm font-semibold rounded-xl">Reject Prompt</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PromptsSection;



'use client'

import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Star, 
  StarOff,
  AlertCircle,
  MessageSquare,
  Sparkles,
  Layers,
  Zap,
  Shield,
  Eye,
  RefreshCw
} from 'lucide-react';

const PromptsSection = () => {
  const [prompts, setPrompts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [feedback, setFeedback] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [expandedId, setExpandedId] = useState(null);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    fetchPrompts();
  }, []);

  const fetchPrompts = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/all-prompts`)
      .then(res => res.json())
      .then(data => {
        setPrompts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Prompts Fetch Error:", err);
        setLoading(false);
        showNotification('Failed to load prompts', 'error');
      });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

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
      showNotification(`Prompt ${status} successfully!`, 'success');
    })
    .catch(err => {
      console.error("Status Update Error:", err);
      showNotification('Failed to update status', 'error');
    });
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
      showNotification(`Prompt ${nextStatus ? 'featured' : 'unfeatured'}!`, 'success');
    })
    .catch(err => {
      console.error("Feature Update Error:", err);
      showNotification('Failed to update feature status', 'error');
    });
  };

  // Filter and sort prompts
  const filteredPrompts = prompts
    .filter(prompt => {
      const matchesSearch = prompt.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           prompt.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = filterStatus === 'all' || prompt.status === filterStatus;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortOrder === 'title') return a.title.localeCompare(b.title);
      return 0;
    });

  const getStatusConfig = (status) => {
    const configs = {
      approved: { 
        icon: CheckCircle, 
        color: 'text-emerald-400', 
        bg: 'bg-emerald-500/10', 
        border: 'border-emerald-500/20',
        glow: 'shadow-emerald-500/5'
      },
      rejected: { 
        icon: XCircle, 
        color: 'text-rose-400', 
        bg: 'bg-rose-500/10', 
        border: 'border-rose-500/20',
        glow: 'shadow-rose-500/5'
      },
      pending: { 
        icon: Clock, 
        color: 'text-amber-400', 
        bg: 'bg-amber-500/10', 
        border: 'border-amber-500/20',
        glow: 'shadow-amber-500/5'
      }
    };
    return configs[status] || configs.pending;
  };

  // Premium Loader
  if (loading) {
    return (
      <div className="relative overflow-hidden">
        <div className="flex flex-col justify-center items-center min-h-[400px] bg-gradient-to-b from-gray-950/50 to-gray-900/30 rounded-3xl border border-gray-800/50 backdrop-blur-xl">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-purple-500/5 animate-pulse" />
          
          <div className="relative">
            {/* Outer rotating ring */}
            <div className="w-16 h-16 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
            {/* Inner pulsing dot */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            </div>
            {/* Orbital rings */}
            <div className="absolute -inset-4 rounded-full border border-purple-500/10 animate-spin-slow" />
            <div className="absolute -inset-8 rounded-full border border-purple-500/5 animate-spin-slower" />
          </div>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-xs font-mono tracking-[0.2em] text-purple-400/60 uppercase animate-pulse">
              Loading Prompts
            </p>
            <div className="flex items-center justify-center gap-1">
              {[...Array(3)].map((_, i) => (
                <div 
                  key={i} 
                  className="w-1 h-1 rounded-full bg-purple-400/40 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border backdrop-blur-xl animate-slide-in-right max-w-sm ${
          notification.type === 'success' 
            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' 
            : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
            <p className="text-sm font-medium">{notification.message}</p>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
            Prompt Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredPrompts.length} prompts • {prompts.filter(p => p.status === 'pending').length} awaiting review
          </p>
        </div>
        <button
          onClick={fetchPrompts}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 rounded-xl transition-all hover:border-purple-500/30"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-900/30 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search prompts by title or category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-950/50 border border-gray-800/50 rounded-xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2.5 bg-gray-950/50 border border-gray-800/50 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
          
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2.5 bg-gray-950/50 border border-gray-800/50 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="title">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-gradient-to-b from-gray-950/60 to-gray-900/30 rounded-3xl border border-gray-800/50 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-900/80 to-gray-800/40 border-b border-gray-800/50">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-[0.15em] font-mono">
                  <div className="flex items-center gap-2">
                    <Layers className="w-3 h-3" />
                    Prompt
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-[0.15em] font-mono">
                  <div className="flex items-center gap-2">
                    <Filter className="w-3 h-3" />
                    Category
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-[0.15em] font-mono">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    Status
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-[0.15em] font-mono">
                  <div className="flex items-center justify-end gap-2">
                    <Zap className="w-3 h-3" />
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30">
              {filteredPrompts.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 text-gray-600" />
                      <p className="text-sm text-gray-500">No prompts found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredPrompts.map((prompt) => {
                  const StatusIcon = getStatusConfig(prompt.status).icon;
                  const statusConfig = getStatusConfig(prompt.status);
                  
                  return (
                    <React.Fragment key={prompt._id}>
                      <tr 
                        className="group hover:bg-gray-900/40 transition-all duration-200 cursor-pointer"
                        onClick={() => setExpandedId(expandedId === prompt._id ? null : prompt._id)}
                      >
                        {/* Prompt Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-purple-400" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">
                                {prompt.title}
                              </p>
                              <p className="text-[10px] text-gray-600 font-mono">
                                ID: {prompt._id.slice(-8)}
                              </p>
                            </div>
                          </div>
                        </td>
                        
                        {/* Category */}
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium text-gray-400 bg-gray-800/50 rounded-full border border-gray-700/50">
                            <span className="w-1.5 h-1.5 rounded-full bg-purple-500/60" />
                            {prompt.category}
                          </span>
                        </td>
                        
                        {/* Status */}
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${statusConfig.bg} ${statusConfig.border} ${statusConfig.glow}`}>
                            <StatusIcon className={`w-3.5 h-3.5 ${statusConfig.color}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${statusConfig.color}`}>
                              {prompt.status || 'pending'}
                            </span>
                          </div>
                        </td>
                        
                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            {prompt.status !== 'approved' && (
                              <button
                                onClick={() => updateStatus(prompt._id, 'approved')}
                                className="group/btn relative px-3 py-1.5 text-xs font-bold text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/20 border border-emerald-500/20 rounded-lg transition-all hover:scale-105 active:scale-95"
                              >
                                <span className="relative z-10">Approve</span>
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-500/0 via-emerald-500/10 to-emerald-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                              </button>
                            )}
                            
                            {prompt.status !== 'rejected' && (
                              <button
                                onClick={() => { setSelectedId(prompt._id); setShowModal(true); }}
                                className="group/btn relative px-3 py-1.5 text-xs font-bold text-rose-400 bg-rose-500/5 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-all hover:scale-105 active:scale-95"
                              >
                                <span className="relative z-10">Reject</span>
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-rose-500/0 via-rose-500/10 to-rose-500/0 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
                              </button>
                            )}
                            
                            <button
                              onClick={() => handleFeature(prompt._id, prompt.isFeatured)}
                              className={`group/btn relative px-3 py-1.5 text-xs font-bold rounded-lg border transition-all hover:scale-105 active:scale-95 ${
                                prompt.isFeatured
                                  ? 'text-amber-400 bg-amber-500/10 border-amber-500/30 shadow-lg shadow-amber-500/10'
                                  : 'text-gray-400 bg-gray-800/30 border-gray-700/50 hover:bg-gray-700/50'
                              }`}
                            >
                              <span className="relative z-10 flex items-center gap-1">
                                {prompt.isFeatured ? (
                                  <Star className="w-3 h-3 fill-amber-400" />
                                ) : (
                                  <StarOff className="w-3 h-3" />
                                )}
                                Featured
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Details */}
                      {expandedId === prompt._id && (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 bg-gray-900/30">
                            <div className="space-y-3">
                              <div className="flex items-start gap-3">
                                <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                  <MessageSquare className="w-4 h-4 text-purple-400" />
                                </div>
                                <div>
                                  <p className="text-sm text-gray-300 font-medium">Prompt Content</p>
                                  <p className="text-sm text-gray-400 mt-1 max-w-2xl">
                                    {prompt.content || 'No content available'}
                                  </p>
                                  {prompt.feedback && (
                                    <div className="mt-2 p-3 bg-rose-500/5 border border-rose-500/20 rounded-lg">
                                      <p className="text-xs text-rose-400 font-medium">Feedback:</p>
                                      <p className="text-sm text-gray-400 mt-0.5">{prompt.feedback}</p>
                                    </div>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span>Created: {new Date(prompt.createdAt).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>Updated: {new Date(prompt.updatedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer Stats */}
        <div className="px-6 py-4 bg-gray-900/30 border-t border-gray-800/30 flex items-center justify-between text-xs text-gray-500">
          <span>Showing {filteredPrompts.length} of {prompts.length} prompts</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              {prompts.filter(p => p.status === 'approved').length} Approved
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {prompts.filter(p => p.status === 'pending').length} Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              {prompts.filter(p => p.status === 'rejected').length} Rejected
            </span>
          </div>
        </div>
      </div>

      {/* Feedback Modal - Enhanced */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="relative w-full max-w-lg">
            {/* Animated gradient border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 via-amber-500 to-rose-500 rounded-3xl opacity-30 animate-pulse" />
            
            <div className="relative bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-amber-500 rounded-t-3xl" />
              
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
                      <XCircle className="w-5 h-5 text-rose-400" />
                    </span>
                    Moderation Review
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Provide constructive feedback for the prompt creator
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              {/* Feedback Input */}
              <div className="space-y-4">
                <div className="p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" />
                    Feedback Details
                  </label>
                  <textarea
                    className="w-full mt-2 bg-gray-950/50 border border-gray-800 rounded-xl p-4 text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-rose-500/50 transition-colors resize-none h-32"
                    placeholder="Please describe why this prompt needs revision. Be specific and constructive..."
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                  />
                  <p className="text-[10px] text-gray-600 mt-1">
                    {feedback.length}/500 characters
                  </p>
                </div>
                
                {/* Quick Feedback Templates */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setFeedback('The prompt lacks sufficient context and specificity. Please provide more details about the expected output format.')}
                    className="px-3 py-1.5 text-[10px] text-gray-400 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 rounded-full transition-colors"
                  >
                    🔄 Needs Context
                  </button>
                  <button
                    onClick={() => setFeedback('The response structure is unclear. Please define the expected format more precisely.')}
                    className="px-3 py-1.5 text-[10px] text-gray-400 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 rounded-full transition-colors"
                  >
                    📋 Structure Issue
                  </button>
                  <button
                    onClick={() => setFeedback('The prompt requires additional constraints to ensure consistent and reliable outputs.')}
                    className="px-3 py-1.5 text-[10px] text-gray-400 bg-gray-800/30 hover:bg-gray-800/50 border border-gray-700/50 rounded-full transition-colors"
                  >
                    ⚠️ Constraints Needed
                  </button>
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-200 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => updateStatus(selectedId, 'rejected', feedback)}
                  className="relative px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 rounded-xl transition-all shadow-lg shadow-rose-600/20 hover:shadow-rose-600/40 hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Reject Prompt
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptsSection;

