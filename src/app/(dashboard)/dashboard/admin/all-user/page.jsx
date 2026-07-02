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

import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Users, 
  UserPlus, 
  Shield, 
  Crown, 
  User, 
  Trash2, 
  Edit2,
  Mail,
  Calendar,
  Activity,
  MoreVertical,
  CheckCircle,
  XCircle,
  AlertCircle,
  RefreshCw,
  Filter,
  ChevronDown,
  ChevronUp,
  Eye,
  UserCheck,
  UserX,
  Clock,
  Sparkles,
  Layers
} from 'lucide-react';

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [sortOrder, setSortOrder] = useState('newest');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [expandedId, setExpandedId] = useState(null);
  const [stats, setStats] = useState({ total: 0, admins: 0, creators: 0, users: 0 });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        calculateStats(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Users Fetch Error:", err);
        setLoading(false);
        showNotification('Failed to load users', 'error');
      });
  };

  const calculateStats = (userData) => {
    const stats = {
      total: userData.length,
      admins: userData.filter(u => u.role === 'admin').length,
      creators: userData.filter(u => u.role === 'creator').length,
      users: userData.filter(u => u.role === 'user' || !u.role).length
    };
    setStats(stats);
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
      const updatedUsers = users.map(u => u._id === id ? { ...u, role: newRole } : u);
      setUsers(updatedUsers);
      calculateStats(updatedUsers);
      showNotification(`User role updated to ${newRole}`, 'success');
      setShowRoleModal(false);
      setSelectedUser(null);
    })
    .catch(err => {
      console.error("Role Update Error:", err);
      showNotification('Failed to update role', 'error');
    });
  };

  const handleDelete = (id) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}`, { 
      method: 'DELETE' 
    })
    .then(res => res.json())
    .then(() => {
      const updatedUsers = users.filter(u => u._id !== id);
      setUsers(updatedUsers);
      calculateStats(updatedUsers);
      showNotification('User deleted successfully', 'success');
      setShowDeleteModal(false);
      setSelectedUser(null);
    })
    .catch(err => {
      console.error("User Delete Error:", err);
      showNotification('Failed to delete user', 'error');
    });
  };

  // Filter and sort users
  const filteredUsers = users
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

  const getRoleConfig = (role) => {
    const configs = {
      admin: { 
        icon: Shield, 
        color: 'text-purple-400', 
        bg: 'bg-purple-500/10', 
        border: 'border-purple-500/20',
        glow: 'shadow-purple-500/5',
        label: 'Administrator'
      },
      creator: { 
        icon: Crown, 
        color: 'text-amber-400', 
        bg: 'bg-amber-500/10', 
        border: 'border-amber-500/20',
        glow: 'shadow-amber-500/5',
        label: 'Creator'
      },
      user: { 
        icon: User, 
        color: 'text-blue-400', 
        bg: 'bg-blue-500/10', 
        border: 'border-blue-500/20',
        glow: 'shadow-blue-500/5',
        label: 'User'
      }
    };
    return configs[role] || configs.user;
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Premium Loading State
  if (loading) {
    return (
      <div className="relative overflow-hidden">
        <div className="flex flex-col justify-center items-center min-h-[400px] bg-gradient-to-b from-gray-950/50 to-gray-900/30 rounded-3xl border border-gray-800/50 backdrop-blur-xl">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-purple-500/5 animate-pulse" />
          
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-2 border-purple-500/20 border-t-purple-500 animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
            </div>
            <div className="absolute -inset-4 rounded-full border border-purple-500/10 animate-spin-slow" />
            <div className="absolute -inset-8 rounded-full border border-purple-500/5 animate-spin-slower" />
          </div>
          
          <div className="mt-6 text-center space-y-2">
            <p className="text-xs font-mono tracking-[0.2em] text-purple-400/60 uppercase animate-pulse">
              Loading Users
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
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent flex items-center gap-2">
            <Users className="w-6 h-6 text-purple-400" />
            User Management
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {filteredUsers.length} active users • {stats.admins} admins • {stats.creators} creators
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-400 bg-gray-900/50 hover:bg-gray-900/80 border border-gray-800 rounded-xl transition-all hover:border-purple-500/30"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Total Users</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.total}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Users className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Admins</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.admins}</p>
            </div>
            <div className="p-3 rounded-xl bg-purple-500/10 border border-purple-500/20">
              <Shield className="w-5 h-5 text-purple-400" />
            </div>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Creators</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.creators}</p>
            </div>
            <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
              <Crown className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </div>
        <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl border border-gray-800/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500 font-medium">Users</p>
              <p className="text-2xl font-bold text-white mt-1">{stats.users}</p>
            </div>
            <div className="p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
              <User className="w-5 h-5 text-blue-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-900/30 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-gray-950/50 border border-gray-800/50 rounded-xl text-sm text-gray-200 placeholder-gray-600 focus:outline-none focus:border-purple-500/50 transition-colors"
          />
        </div>
        
        <div className="flex gap-2">
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2.5 bg-gray-950/50 border border-gray-800/50 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="creator">Creator</option>
            <option value="user">User</option>
          </select>
          
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-4 py-2.5 bg-gray-950/50 border border-gray-800/50 rounded-xl text-sm text-gray-200 focus:outline-none focus:border-purple-500/50 transition-colors cursor-pointer"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-gradient-to-b from-gray-950/60 to-gray-900/30 rounded-3xl border border-gray-800/50 backdrop-blur-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-900/80 to-gray-800/40 border-b border-gray-800/50">
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-[0.15em] font-mono">
                  <div className="flex items-center gap-2">
                    <Users className="w-3 h-3" />
                    User
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-[0.15em] font-mono">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3 h-3" />
                    Email
                  </div>
                </th>
                <th className="px-6 py-4 text-xs font-black text-gray-400 uppercase tracking-[0.15em] font-mono">
                  <div className="flex items-center gap-2">
                    <Shield className="w-3 h-3" />
                    Role
                  </div>
                </th>
                <th className="px-6 py-4 text-right text-xs font-black text-gray-400 uppercase tracking-[0.15em] font-mono">
                  <div className="flex items-center justify-end gap-2">
                    <Activity className="w-3 h-3" />
                    Actions
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/30">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center gap-2">
                      <AlertCircle className="w-8 h-8 text-gray-600" />
                      <p className="text-sm text-gray-500">No users found matching your criteria</p>
                    </div>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const RoleIcon = getRoleConfig(user.role).icon;
                  const roleConfig = getRoleConfig(user.role);
                  
                  return (
                    <React.Fragment key={user._id}>
                      <tr 
                        className="group hover:bg-gray-900/40 transition-all duration-200 cursor-pointer"
                        onClick={() => setExpandedId(expandedId === user._id ? null : user._id)}
                      >
                        {/* User Info */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 relative">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${
                                user.role === 'admin' 
                                  ? 'from-purple-500/30 to-purple-600/10 border-purple-500/30'
                                  : user.role === 'creator'
                                  ? 'from-amber-500/30 to-amber-600/10 border-amber-500/30'
                                  : 'from-blue-500/30 to-blue-600/10 border-blue-500/30'
                              } border flex items-center justify-center font-bold text-sm text-white`}>
                                {getInitials(user.name)}
                              </div>
                              {user.role && (
                                <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-gray-950 ${
                                  user.role === 'admin' ? 'bg-purple-500' :
                                  user.role === 'creator' ? 'bg-amber-500' : 'bg-blue-500'
                                }`} />
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-gray-200 group-hover:text-purple-400 transition-colors">
                                {user.name}
                              </p>
                              <p className="text-[10px] text-gray-600 font-mono">
                                ID: {user._id.slice(-8)}
                              </p>
                            </div>
                          </div>
                        </td>
                        
                        {/* Email */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Mail className="w-3.5 h-3.5 text-gray-600" />
                            <span className="text-sm text-gray-300">{user.email}</span>
                          </div>
                        </td>
                        
                        {/* Role */}
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border ${roleConfig.bg} ${roleConfig.border} ${roleConfig.glow}`}>
                            <RoleIcon className={`w-3.5 h-3.5 ${roleConfig.color}`} />
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${roleConfig.color}`}>
                              {roleConfig.label}
                            </span>
                          </div>
                        </td>
                        
                        {/* Actions */}
                        <td className="px-6 py-4 text-right">
                          <div className="inline-flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowRoleModal(true);
                              }}
                              className="group/btn relative px-3 py-1.5 text-xs font-bold text-blue-400 bg-blue-500/5 hover:bg-blue-500/20 border border-blue-500/20 rounded-lg transition-all hover:scale-105 active:scale-95"
                            >
                              <span className="relative z-10 flex items-center gap-1">
                                <Edit2 className="w-3 h-3" />
                                Role
                              </span>
                            </button>
                            
                            <button
                              onClick={() => {
                                setSelectedUser(user);
                                setShowDeleteModal(true);
                              }}
                              className="group/btn relative px-3 py-1.5 text-xs font-bold text-rose-400 bg-rose-500/5 hover:bg-rose-500/20 border border-rose-500/20 rounded-lg transition-all hover:scale-105 active:scale-95"
                            >
                              <span className="relative z-10 flex items-center gap-1">
                                <Trash2 className="w-3 h-3" />
                                Delete
                              </span>
                            </button>
                          </div>
                        </td>
                      </tr>
                      
                      {/* Expanded Details */}
                      {expandedId === user._id && (
                        <tr>
                          <td colSpan="4" className="px-6 py-4 bg-gray-900/30">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                              <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                                <Calendar className="w-4 h-4 text-gray-500" />
                                <div>
                                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Joined</p>
                                  <p className="text-sm text-gray-300">
                                    {new Date(user.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                                <Activity className="w-4 h-4 text-gray-500" />
                                <div>
                                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Last Updated</p>
                                  <p className="text-sm text-gray-300">
                                    {new Date(user.updatedAt).toLocaleDateString()}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-xl border border-gray-700/30">
                                <UserCheck className="w-4 h-4 text-gray-500" />
                                <div>
                                  <p className="text-[10px] text-gray-500 uppercase tracking-wider">Status</p>
                                  <p className="text-sm text-emerald-400 flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                    Active
                                  </p>
                                </div>
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
          <span>Showing {filteredUsers.length} of {users.length} users</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              {stats.admins} Admins
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              {stats.creators} Creators
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              {stats.users} Users
            </span>
          </div>
        </div>
      </div>

      {/* Role Change Modal */}
      {showRoleModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 rounded-3xl opacity-30 animate-pulse" />
            
            <div className="relative bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-t-3xl" />
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <Shield className="w-5 h-5 text-blue-400" />
                    </span>
                    Change Role
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Update role for {selectedUser.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                  }}
                  className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-900/50 rounded-2xl border border-gray-800/50">
                  <label className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <User className="w-3 h-3" />
                    Select New Role
                  </label>
                  <div className="mt-3 grid grid-cols-3 gap-2">
                    {['user', 'creator', 'admin'].map((role) => {
                      const config = getRoleConfig(role);
                      const Icon = config.icon;
                      const isSelected = selectedUser.role === role;
                      
                      return (
                        <button
                          key={role}
                          onClick={() => handleRoleChange(selectedUser._id, role)}
                          className={`p-3 rounded-xl border-2 transition-all hover:scale-105 active:scale-95 ${
                            isSelected
                              ? `${config.bg} ${config.border} shadow-lg`
                              : 'bg-gray-800/30 border-gray-700/50 hover:border-gray-600'
                          }`}
                        >
                          <Icon className={`w-5 h-5 mx-auto ${isSelected ? config.color : 'text-gray-500'}`} />
                          <p className={`text-[10px] font-bold uppercase mt-1 ${isSelected ? config.color : 'text-gray-500'}`}>
                            {role}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowRoleModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-6 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-200 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && selectedUser && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="relative w-full max-w-md">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-rose-500 via-red-500 to-rose-500 rounded-3xl opacity-30 animate-pulse" />
            
            <div className="relative bg-gray-950 border border-gray-800 rounded-3xl p-8 shadow-2xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 to-red-500 rounded-t-3xl" />
              
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="p-2 rounded-xl bg-rose-500/10 border border-rose-500/20">
                      <Trash2 className="w-5 h-5 text-rose-400" />
                    </span>
                    Delete User
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    This action cannot be undone
                  </p>
                </div>
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                  className="p-2 hover:bg-gray-800/50 rounded-xl transition-colors"
                >
                  <XCircle className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              
              <div className="p-4 bg-rose-500/5 rounded-2xl border border-rose-500/20">
                <p className="text-sm text-gray-300">
                  Are you sure you want to delete <span className="font-semibold text-white">{selectedUser.name}</span>?
                  This will permanently remove their account and all associated data.
                </p>
              </div>
              
              <div className="flex justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                    setSelectedUser(null);
                  }}
                  className="px-6 py-2.5 text-sm font-medium text-gray-400 hover:text-gray-200 bg-gray-800/30 hover:bg-gray-800/50 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDelete(selectedUser._id)}
                  className="relative px-6 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 rounded-xl transition-all shadow-lg shadow-rose-600/20 hover:shadow-rose-600/40 hover:scale-105 active:scale-95"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete User
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

export default UsersSection;