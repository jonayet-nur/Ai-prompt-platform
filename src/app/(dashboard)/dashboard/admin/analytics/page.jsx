'use client'

import React, { useEffect, useState } from 'react';

const AnalyticsSection = () => {
  const [data, setData] = useState({ totalUsers: 0, totalPrompts: 0, totalReviews: 0, totalCopies: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/analytics`)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => console.error("Analytics Fetch Error:", err));
  }, []);

  if (loading) return <div className="text-gray-400">Loading Analytics...</div>;

  const cards = [
    { title: 'Total Users', value: data.totalUsers, icon: '👥', color: 'from-blue-500/10 to-blue-600/5' },
    { title: 'Total Prompts', value: data.totalPrompts, icon: '📝', color: 'from-purple-500/10 to-purple-600/5' },
    { title: 'Total Reviews', value: data.totalReviews, icon: '⭐', color: 'from-amber-500/10 to-amber-600/5' },
    { title: 'Total Copies', value: data.totalCopies, icon: '🔥', color: 'from-emerald-500/10 to-emerald-600/5' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((c, i) => (
        <div key={i} className={`bg-gradient-to-br ${c.color} border border-gray-800 p-6 rounded-2xl flex flex-col justify-between shadow-lg`}>
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium text-gray-400">{c.title}</span>
            <span className="text-xl">{c.icon}</span>
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-bold text-gray-100">{c.value}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnalyticsSection;