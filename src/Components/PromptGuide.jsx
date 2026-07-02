'use client';
import React from 'react';

const PromptGuide = () => {
  const guides = [
    {
      step: "01",
      title: "Assign a Persona",
      desc: "Always start by giving the AI a clear role. For example: 'Act as an expert Senior UX Designer with 10 years of experience.'",
      badge: "Context"
    },
    {
      step: "02",
      title: "Provide Constraints",
      desc: "Specify limits to avoid generic fluff. Tell the AI what NOT to include, the tone of voice, and maximum length constraints.",
      badge: "Rules"
    },
    {
      step: "03",
      title: "Use Few-Shot Examples",
      desc: "Show, don't just tell. Give the AI 1 or 2 high-quality examples of the exact output format you expect before running it.",
      badge: "Format"
    }
  ];

  return (
    <div className="bg-gray-950/40 p-6 sm:p-10 rounded-3xl border border-gray-900 max-w-7xl mx-auto shadow-2xl backdrop-blur-xl mt-16 relative">
      
      {/* হেডার */}
      <div className="mb-12 pb-6 border-b border-gray-900/80">
        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-3">
          <span className="flex items-center justify-center w-10 h-10 bg-purple-500/10 rounded-xl border border-purple-500/20 text-xl">💡</span>
          Prompt Engineering Blueprint
        </h2>
        <p className="text-sm text-gray-400 mt-1.5">Master the art of writing framework-driven prompts for maximum accuracy</p>
      </div>

      {/* গাইড কার্ডস */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {guides.map((g, index) => (
          <div 
            key={index}
            className="bg-gray-900/30 border border-gray-800/80 p-6 sm:p-8 rounded-2xl flex flex-col justify-between hover:border-purple-500/20 transition-all duration-300 relative group"
          >
            <div>
              {/* স্টেপ নাম্বার ও ব্যাজ */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-3xl font-black text-gray-800 group-hover:text-purple-500/20 transition-colors font-mono">
                  {g.step}
                </span>
                <span className="text-[10px] font-bold tracking-widest text-purple-400 uppercase bg-purple-500/5 px-2.5 py-1 rounded-md border border-purple-500/10">
                  {g.badge}
                </span>
              </div>

              {/* কন্টেন্ট */}
              <h3 className="text-lg font-bold text-gray-200 mb-3 group-hover:text-purple-400 transition-colors">
                {g.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed font-normal">
                {g.desc}
              </p>
            </div>

            {/* ডেকোরেটিভ নিচের লাইন */}
            <div className="w-full h-0.5 bg-gray-800 mt-6 rounded-full overflow-hidden">
              <div className="w-0 group-hover:w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromptGuide;