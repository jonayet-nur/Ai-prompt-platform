
import React from 'react';
import { 
  HiOutlineSparkles, 
  HiOutlineShieldCheck, 
  HiOutlineChartBar, 
  HiOutlineUsers,
  HiOutlineCommandLine,
  HiOutlineMagnifyingGlass 
} from 'react-icons/hi2';

const WhyChoosePromptHub = () => {
  const features = [
    {
      icon: <HiOutlineCommandLine className="h-6 w-6 text-indigo-400 group-hover:text-purple-400 transition-colors duration-300" />,
      title: 'Multi-Model Ecosystem',
      description: 'One centralized hub for all major AI systems. Discover and share optimized prompts for ChatGPT, Claude, Gemini, and Midjourney.'
    },
    {
      icon: <HiOutlineSparkles className="h-6 w-6 text-indigo-400 group-hover:text-purple-400 transition-colors duration-300" />,
      title: 'Marketplace & Sharing',
      description: 'Publish your engineered prompts publicly, grow your audience as a creator, or explore premium prompts to level up your workflow.'
    },
    {
      icon: <HiOutlineMagnifyingGlass className="h-6 w-6 text-indigo-400 group-hover:text-purple-400 transition-colors duration-300" />,
      title: 'Advanced Search & Filter',
      description: 'Stop guessing. Find the exact prompt you need instantly using deep indexing by AI tool, domain, capability, and popularity.'
    },
    {
      icon: <HiOutlineChartBar className="h-6 w-6 text-indigo-400 group-hover:text-purple-400 transition-colors duration-300" />,
      title: 'Creator Analytics Dashboard',
      description: 'Track how your prompts perform. Monitor engagement, bookmarks, views, and popularity trends through built-in metrics.'
    },
    {
      icon: <HiOutlineShieldCheck className="h-6 w-6 text-indigo-400 group-hover:text-purple-400 transition-colors duration-300" />,
      title: 'Secure & Moderated Space',
      description: 'Exchange prompts securely with robust authentication, role-based controls, and automatic community moderation workflows.'
    },
    {
      icon: <HiOutlineUsers className="h-6 w-6 text-indigo-400 group-hover:text-purple-400 transition-colors duration-300" />,
      title: 'Community Interaction',
      description: 'Engage with other prompt engineers through verified user reviews, ratings, discussions, and personal bookmark collections.'
    }
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Why Choose{' '}
            <span className="bg-linear-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Prompt Hub
            </span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg sm:text-xl text-gray-400 leading-relaxed">
            The ultimate community-driven ecosystem designed securely for creators, prompt engineers, and AI enthusiasts.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 hover:border-purple-500/30 shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
            >
              {/* Hover Glow Background */}
              <div className="absolute inset-0 bg-linear-to-br from-indigo-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              {/* Icon Wrapper */}
              <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-linear-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 group-hover:border-purple-500/50 mb-6 transition-all duration-300 shadow-inner">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white tracking-wide transition-colors duration-300 group-hover:text-purple-300">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-gray-400 leading-relaxed text-sm group-hover:text-gray-300 transition-colors duration-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Dynamic Trust Badge */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 sm:gap-6 px-8 py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-lg">
            <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <span className="text-indigo-400">⚡</span> ChatGPT, Gemini, Claude, Midjourney & More
            </span>
            <span className="hidden sm:block w-px h-5 bg-white/20"></span>
            <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
              <span className="text-purple-400">🛡️</span> Secure Marketplace Ecosystem
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WhyChoosePromptHub;