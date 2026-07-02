// 'use client'

// import React, { useEffect, useState } from 'react';

// const UsersSection = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`)
//       .then(res => res.json())
//       .then(data => {
//         setUsers(data);
//         setLoading(false);
//       })
//       .catch(err => console.error("Users Fetch Error:", err));
//   }, []);

//   const handleRoleChange = (id, newRole) => {
//     fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}`, {
//       method: 'PATCH',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ role: newRole })
//     })
//     .then(res => res.json())
//     .then(() => {
//       setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
//     })
//     .catch(err => console.error("Role Update Error:", err));
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}`, { 
//         method: 'DELETE' 
//       })
//       .then(res => res.json())
//       .then(() => {
//         setUsers(users.filter(u => u._id !== id));
//       })
//       .catch(err => console.error("User Delete Error:", err));
//     }
//   };

//   if (loading) return <div className="text-gray-400">Loading Users...</div>;

//   return (
//     <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
//       <table className="w-full text-left border-collapse">
//         <thead>
//           <tr className="bg-gray-800/50 border-b border-gray-800 text-xs text-gray-400 uppercase font-semibold">
//             <th className="p-4">Name</th>
//             <th className="p-4">Email</th>
//             <th className="p-4">Role</th>
//             <th className="p-4 text-right">Actions</th>
//           </tr>
//         </thead>
//         <tbody className="divide-y divide-gray-800 text-sm">
//           {users.map(user => (
//             <tr key={user._id} className="hover:bg-gray-800/20">
//               <td className="p-4 font-medium text-gray-200">{user.name}</td>
//               <td className="p-4 text-gray-400">{user.email}</td>
//               <td className="p-4">
//                 <select
//                   value={user.role || 'user'}
//                   onChange={(e) => handleRoleChange(user._id, e.target.value)}
//                   className="bg-gray-950 border border-gray-800 text-xs text-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-purple-500 capitalize cursor-pointer"
//                 >
//                   <option value="user">User</option>
//                   <option value="creator">Creator</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </td>
//               <td className="p-4 text-right">
//                 <button onClick={() => handleDelete(user._id)} className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 transition-all">Delete User</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default UsersSection;




'use client'

import React, { useEffect, useState, useMemo } from 'react';
import { 
  Search, Users, Shield, Crown, User, Trash2, Edit2, Mail, Calendar, 
  Activity, CheckCircle, XCircle, AlertCircle, RefreshCw, ChevronDown 
} from 'lucide-react';

// গ্লোবাল হেল্পার ফাংশন
const getInitials = (name) => name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);

const ROLE_CONFIGS = {
  admin: { icon: Shield, color: 'text-purple-400', bg: 'bg-purple-500/10', border: 'border-purple-500/20', label: 'Admin' },
  creator: { icon: Crown, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Creator' },
  user: { icon: User, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', label: 'User' }
};

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // 'role' | 'delete' | null
  const [notification, setNotification] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [stats, setStats] = useState({ total: 0, admins: 0, creators: 0, users: 0 });

  useEffect(() => { fetchUsers(); }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        calculateStats(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        showNotification('Failed to load users', 'error');
      });
  };

  const calculateStats = (userData) => {
    setStats({
      total: userData.length,
      admins: userData.filter(u => u.role === 'admin').length,
      creators: userData.filter(u => u.role === 'creator').length,
      users: userData.filter(u => u.role === 'user' || !u.role).length
    });
  };

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRoleChange = (id, newRole) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    })
    .then(res => res.json())
    .then(() => {
      const updated = users.map(u => u._id === id ? { ...u, role: newRole } : u);
      setUsers(updated);
      calculateStats(updated);
      showNotification(`Role updated to ${newRole}`);
      setModalType(null);
    })
    .catch(() => showNotification('Failed to update role', 'error'));
  };

  const handleDelete = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}`, { method: 'DELETE' })
    .then(res => res.json())
    .then(() => {
      const updated = users.filter(u => u._id !== id);
      setUsers(updated);
      calculateStats(updated);
      showNotification('User deleted successfully');
      setModalType(null);
    })
    .catch(() => showNotification('Failed to delete user', 'error'));
  };

  // useMemo ব্যবহারের মাধ্যমে সার্চ ও ফিল্টারিং ফাস্ট করা হয়েছে
  const filteredUsers = useMemo(() => {
    return users
      .filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                             user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
      })
      .sort((a, b) => {
        if (sortOrder === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
        if (sortOrder === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
        if (sortOrder === 'name') return a.name.localeCompare(b.name);
        return 0;
      });
  }, [users, searchTerm, filterRole, sortOrder]);

  if (loading) return (
    <div className="flex flex-col justify-center items-center min-h-[400px] bg-gray-950/50 rounded-3xl border border-gray-800/50 backdrop-blur-xl">
      <div className="w-12 h-12 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
      <p className="mt-4 text-xs font-mono tracking-widest text-purple-400 animate-pulse uppercase">Loading Users...</p>
    </div>
  );

  return (
    <div className="space-y-6 max-w-full overflow-hidden px-1 sm:px-0">
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-2xl border backdrop-blur-xl flex items-center gap-3 text-sm max-w-xs sm:max-w-sm ${
          notification.type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
          <p className="font-medium">{notification.message}</p>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 h-6 text-purple-400" /> User Management
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {filteredUsers.length} active • {stats.admins} admins • {stats.creators} creators
          </p>
        </div>
        <button onClick={fetchUsers} className="flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-medium text-gray-400 bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 rounded-xl transition-all">
          <RefreshCw className="w-4 h-4" /> Refresh
        </button>
      </div>

      {/* Stats Cards - Grid Layout Responsive */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: 'Total Users', val: stats.total, color: 'text-purple-400', bg: 'bg-purple-500/10', bdr: 'border-purple-500/20', icon: Users },
          { label: 'Admins', val: stats.admins, color: 'text-purple-400', bg: 'bg-purple-500/10', bdr: 'border-purple-500/20', icon: Shield },
          { label: 'Creators', val: stats.creators, color: 'text-amber-400', bg: 'bg-amber-500/10', bdr: 'border-amber-500/20', icon: Crown },
          { label: 'Users', val: stats.users, color: 'text-blue-400', bg: 'bg-blue-500/10', bdr: 'border-blue-500/20', icon: User },
        ].map((item, i) => (
          <div key={i} className="p-3 sm:p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-800/50 flex items-center justify-between">
            <div>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">{item.label}</p>
              <p className="text-lg sm:text-2xl font-bold text-white mt-0.5">{item.val}</p>
            </div>
            <div className={`p-2 sm:p-3 rounded-xl ${item.bg} ${item.bdr}`}><item.icon className={`w-4 h-4 sm:w-5 h-5 ${item.color}`} /></div>
          </div>
        ))}
      </div>

      {/* Filter & Search Bar - Stack to Row Layout */}
      <div className="flex flex-col md:flex-row gap-3 p-3 bg-gray-900/30 rounded-2xl border border-gray-800/50">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-950/50 border border-gray-800/50 rounded-xl text-xs sm:text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500/50"
          />
        </div>
        <div className="grid grid-cols-2 md:flex gap-2">
          {['all', 'admin', 'creator', 'user'].map((opt, i) => i === 0 && (
            <select key={opt} value={filterRole} onChange={(e) => setFilterRole(e.target.value)} className="w-full md:w-auto px-3 py-2 bg-gray-950/50 border border-gray-800/50 rounded-xl text-xs sm:text-sm text-gray-200 cursor-pointer">
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="creator">Creator</option>
              <option value="user">User</option>
            </select>
          ))}
          <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} className="w-full md:w-auto px-3 py-2 bg-gray-950/50 border border-gray-800/50 rounded-xl text-xs sm:text-sm text-gray-200 cursor-pointer">
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">A-Z</option>
          </select>
        </div>
      </div>

      {/* Table Container - Mobile-first card view & desktop-friendly standard layout */}
      <div className="bg-gradient-to-b from-gray-950/60 to-gray-900/30 rounded-2xl sm:rounded-3xl border border-gray-800/50 backdrop-blur-xl overflow-hidden">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-900/80 to-gray-800/40 border-b border-gray-800/50 text-xs font-mono font-black text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30 text-sm">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center text-gray-500">No users found.</td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const conf = ROLE_CONFIGS[user.role] || ROLE_CONFIGS.user;
                  return (
                    <React.Fragment key={user._id}>
                      <tr className="hover:bg-gray-900/40 cursor-pointer transition-all" onClick={() => setExpandedId(expandedId === user._id ? null : user._id)}>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-white text-xs">{getInitials(user.name)}</div>
                            <div>
                              <p className="font-semibold text-gray-200">{user.name}</p>
                              <p className="text-[10px] text-gray-600 font-mono">ID: {user._id.slice(-8)}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-gray-300">{user.email}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider ${conf.bg} ${conf.border} ${conf.color}`}>
                            <conf.icon className="w-3 h-3" /> {conf.label}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right" onClick={e => e.stopPropagation()}>
                          <div className="inline-flex gap-2">
                            <button onClick={() => { setSelectedUser(user); setModalType('role'); }} className="px-2 py-1 text-xs font-bold text-blue-400 bg-blue-500/5 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition-all"><Edit2 className="w-3 h-3" /></button>
                            <button onClick={() => { setSelectedUser(user); setModalType('delete'); }} className="px-2 py-1 text-xs font-bold text-rose-400 bg-rose-500/5 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-all"><Trash2 className="w-3 h-3" /></button>
                          </div>
                        </td>
                      </tr>
                      {expandedId === user._id && (
                        <tr className="bg-gray-900/20">
                          <td colSpan="4" className="px-6 py-3">
                            <div className="flex gap-6 text-xs text-gray-400 font-mono">
                              <div><span className="text-gray-600">Joined:</span> {new Date(user.createdAt).toLocaleDateString()}</div>
                              <div><span className="text-gray-600">Updated:</span> {new Date(user.updatedAt).toLocaleDateString()}</div>
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

        {/* Mobile / Tablet UI Card Layout */}
        <div className="block md:hidden p-3 space-y-3">
          {filteredUsers.length === 0 ? (
            <p className="text-center text-xs py-8 text-gray-500">No users found.</p>
          ) : (
            filteredUsers.map((user) => {
              const conf = ROLE_CONFIGS[user.role] || ROLE_CONFIGS.user;
              return (
                <div key={user._id} className="p-4 bg-gray-900/40 border border-gray-800 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-xl bg-gray-800 border border-gray-700 flex items-center justify-center font-bold text-white text-xs">{getInitials(user.name)}</div>
                      <div>
                        <p className="font-semibold text-xs text-gray-200">{user.name}</p>
                        <p className="text-[10px] font-mono text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase ${conf.bg} ${conf.border} ${conf.color}`}>
                      {conf.label}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-800/60 text-[10px] text-gray-500 font-mono">
                    <div>Join: {new Date(user.createdAt).toLocaleDateString()}</div>
                    <div className="flex gap-2">
                      <button onClick={() => { setSelectedUser(user); setModalType('role'); }} className="p-1.5 text-blue-400 bg-blue-500/5 border border-blue-500/20 rounded-md"><Edit2 className="w-3 h-3" /></button>
                      <button onClick={() => { setSelectedUser(user); setModalType('delete'); }} className="p-1.5 text-rose-400 bg-rose-500/5 border border-rose-500/20 rounded-md"><Trash2 className="w-3 h-3" /></button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Unified Modals Engine */}
      {modalType && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="relative bg-gray-950 border border-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
            {modalType === 'role' ? (
              <>
                <h3 className="text-md font-bold text-white mb-2">Change Role</h3>
                <p className="text-xs text-gray-500 mb-4">Set role for {selectedUser.name}</p>
                <div className="grid grid-cols-3 gap-2">
                  {['user', 'creator', 'admin'].map((r) => (
                    <button key={r} onClick={() => handleRoleChange(selectedUser._id, r)} className={`p-2 rounded-xl text-xs font-bold uppercase border border-gray-800 transition-all ${selectedUser.role === r ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' : 'bg-gray-900/40 text-gray-400'}`}>
                      {r}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <h3 className="text-md font-bold text-rose-400 mb-2">Delete User?</h3>
                <p className="text-xs text-gray-400 mb-4">Are you sure you want to delete {selectedUser.name}? This action is irreversible.</p>
                <div className="flex justify-end gap-2">
                  <button onClick={() => setModalType(null)} className="px-4 py-2 bg-gray-900 text-gray-400 border border-gray-800 rounded-xl text-xs font-medium">Cancel</button>
                  <button onClick={() => handleDelete(selectedUser._id)} className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl text-xs">Delete</button>
                </div>
              </>
            )}
            {modalType === 'role' && (
              <button onClick={() => setModalType(null)} className="absolute top-4 right-4 text-xs text-gray-500 hover:text-white">Close</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersSection;