'use client'

import React, { useEffect, useState } from 'react';

const ReportsSection = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/reported-prompts`)
      .then(res => res.json())
      .then(data => {
        setReports(data);
        setLoading(false);
      })
      .catch(err => console.error("Reports Fetch Error:", err));
  }, []);

  const handleAction = (id, actionType) => {
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/reported-prompts/${id}/action`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actionType })
    })
    .then(res => res.json())
    .then(() => {
      setReports(reports.filter(r => r._id !== id));
    })
    .catch(err => console.error("Action Error:", err));
  };

  if (loading) return <div className="text-gray-400">Loading Reports...</div>;

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
      {reports.length === 0 ? (
        <div className="p-8 text-center text-gray-500">No reported prompts at this moment. 🎉</div>
      ) : (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-800/50 border-b border-gray-800 text-xs text-gray-400 uppercase font-semibold">
              <th className="p-4">Prompt Title</th>
              <th className="p-4">Reason</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {reports.map(report => (
              <tr key={report._id} className="hover:bg-gray-800/20">
                <td className="p-4 font-medium text-gray-200">{report.title}</td>
                <td className="p-4 text-amber-400/80 italic">"{report.reportReason || 'Inappropriate content'}"</td>
                <td className="p-4 text-right space-x-2">
                  <button onClick={() => handleAction(report._id, 'remove')} className="text-xs bg-red-600/20 border border-red-500/30 text-red-400 px-2.5 py-1.5 rounded-lg hover:bg-red-600/30 transition-all">Remove</button>
                  <button onClick={() => handleAction(report._id, 'warn')} className="text-xs bg-amber-600/20 border border-amber-500/30 text-amber-400 px-2.5 py-1.5 rounded-lg hover:bg-amber-600/30 transition-all">Warn Creator</button>
                  <button onClick={() => handleAction(report._id, 'dismiss')} className="text-xs bg-gray-800 text-gray-400 px-2.5 py-1.5 rounded-lg hover:bg-gray-700 transition-all">Dismiss</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReportsSection;