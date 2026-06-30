'use client'

import React, { useEffect, useState } from 'react';

const UsersSection = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users`)
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(err => console.error("Users Fetch Error:", err));
  }, []);

  const handleRoleChange = (id, newRole) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole })
    })
    .then(res => res.json())
    .then(() => {
      setUsers(users.map(u => u._id === id ? { ...u, role: newRole } : u));
    })
    .catch(err => console.error("Role Update Error:", err));
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/${id}`, { 
        method: 'DELETE' 
      })
      .then(res => res.json())
      .then(() => {
        setUsers(users.filter(u => u._id !== id));
      })
      .catch(err => console.error("User Delete Error:", err));
    }
  };

  if (loading) return <div className="text-gray-400">Loading Users...</div>;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-gray-800/50 border-b border-gray-800 text-xs text-gray-400 uppercase font-semibold">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800 text-sm">
          {users.map(user => (
            <tr key={user._id} className="hover:bg-gray-800/20">
              <td className="p-4 font-medium text-gray-200">{user.name}</td>
              <td className="p-4 text-gray-400">{user.email}</td>
              <td className="p-4">
                <select
                  value={user.role || 'user'}
                  onChange={(e) => handleRoleChange(user._id, e.target.value)}
                  className="bg-gray-950 border border-gray-800 text-xs text-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:border-purple-500 capitalize cursor-pointer"
                >
                  <option value="user">User</option>
                  <option value="creator">Creator</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td className="p-4 text-right">
                <button onClick={() => handleDelete(user._id)} className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 px-3 py-1.5 rounded-lg border border-red-500/20 transition-all">Delete User</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersSection;