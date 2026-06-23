// "use client";

// import { Search, ArrowRight, PlayCircle } from "lucide-react";

// export  function Hero() {
//   return (
//     <section className="relative min-h-screen overflow-hidden bg-[#0b1020] pt-32 pb-10 md:pt-40">

//       {/* Glow Effects */}
//       <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/30 blur-[120px]" />
//       <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/20 blur-[120px]" />

//       <div className="max-w-7xl mx-auto px-6 min-h-[80vh] flex items-center justify-center">
//         <div className="max-w-4xl w-full text-center">

//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-sm mb-6">
//             <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
//             2,500+ Prompts Available
//           </div>

//           {/* Title */}
//           <h1 className="text-5xl md:text-7xl font-bold leading-tight text-white">
//             Unlock the Power of
//             <span className="block bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
//               AI Prompts
//             </span>
//           </h1>

//           {/* Description */}
//           <p className="mt-6 text-lg text-gray-300 max-w-2xl mx-auto">
//             Discover, share and monetize premium AI prompts for ChatGPT,
//             Claude, Gemini and Midjourney.
//           </p>

//           {/* Search */}
//           <div className="mt-10 max-w-2xl mx-auto flex items-center bg-white/10 backdrop-blur-xl border border-white/10 rounded-full p-2">
//             <Search size={18} className="text-gray-400 ml-3" />

//             <input
//               type="text"
//               placeholder="Search prompts..."
//               className="bg-transparent flex-1 px-4 py-2 text-white outline-none placeholder:text-gray-400"
//             />

//             <button className="h-12 w-12 rounded-full bg-purple-600 hover:bg-purple-700 flex items-center justify-center transition">
//               <ArrowRight size={18} className="text-white" />
//             </button>
//           </div>

//           {/* Buttons */}
//           <div className="mt-8 flex flex-wrap justify-center gap-4">
//             <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:scale-105 transition">
//               Explore Now
//             </button>

//             <button className="px-8 py-3 rounded-full border border-white/20 text-white hover:bg-white/10 transition flex items-center gap-2">
//               <PlayCircle size={18} />
//               Watch Demo
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="flex justify-center gap-10 md:gap-16 mt-14 flex-wrap">
//             <div>
//               <h3 className="text-3xl font-bold text-white">10K+</h3>
//               <p className="text-gray-400">Users</p>
//             </div>

//             <div>
//               <h3 className="text-3xl font-bold text-white">2.5K+</h3>
//               <p className="text-gray-400">Prompts</p>
//             </div>

//             <div>
//               <h3 className="text-3xl font-bold text-white">4.9★</h3>
//               <p className="text-gray-400">Rating</p>
//             </div>
//           </div>

//         </div>
//       </div>
//     </section>
//   );
// }


// "use client";

// import { Search, ArrowRight, PlayCircle } from "lucide-react";

// export function Hero() {
//   return (
//     <section className="relative min-h-screen overflow-hidden bg-[#0b1020] pt-32 pb-16 md:pt-40">

//       {/* Background Gradient */}
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_45%)]" />

//       {/* Glow Effects */}
//       <div className="absolute top-0 right-0 h-[600px] w-[600px] bg-purple-600/20 blur-[140px]" />
//       <div className="absolute bottom-0 left-0 h-[500px] w-[500px] bg-indigo-600/20 blur-[140px]" />

//       {/* SVG Grid */}
//       <div className="absolute inset-0 opacity-20">
//         <svg
//           className="h-full w-full"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <defs>
//             <pattern
//               id="grid"
//               width="40"
//               height="40"
//               patternUnits="userSpaceOnUse"
//             >
//               <path
//                 d="M 40 0 L 0 0 0 40"
//                 fill="none"
//                 stroke="rgba(255,255,255,0.08)"
//                 strokeWidth="1"
//               />
//             </pattern>
//           </defs>

//           <rect width="100%" height="100%" fill="url(#grid)" />
//         </svg>
//       </div>

//       {/* Dots Pattern */}
//       <div
//         className="absolute inset-0 opacity-20"
//         style={{
//           backgroundImage:
//             "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
//           backgroundSize: "32px 32px",
//         }}
//       />

//       {/* Content */}
//       <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[80vh] flex items-center justify-center">
//         <div className="max-w-4xl text-center">

//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm mb-8">
//             <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
//             2,500+ Prompts Available
//           </div>

//           {/* Heading */}
//           <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight">
//             Unlock the Power of
//             <span className="block bg-gradient-to-r from-purple-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
//               AI Prompts
//             </span>
//           </h1>

//           {/* Description */}
//           <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-slate-300 leading-relaxed">
//             Discover, share and monetize premium AI prompts for
//             ChatGPT, Claude, Gemini, Midjourney and the next generation
//             of AI tools.
//           </p>

//           {/* Search */}
//           <div className="mt-10 max-w-2xl mx-auto">
//             <div className="flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl p-2">
//               <Search
//                 size={18}
//                 className="text-slate-400 ml-3 shrink-0"
//               />

//               <input
//                 type="text"
//                 placeholder="Search prompts, tools, creators..."
//                 className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-slate-400 outline-none"
//               />

//               <button className="h-12 w-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:scale-105 transition flex items-center justify-center">
//                 <ArrowRight size={18} className="text-white" />
//               </button>
//             </div>
//           </div>

//           {/* CTA Buttons */}
//           <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
//             <button className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium hover:scale-105 transition shadow-lg shadow-purple-500/25">
//               Explore Now
//             </button>

//             <button className="px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition flex items-center gap-2">
//               <PlayCircle size={18} />
//               Watch Demo
//             </button>
//           </div>

//           {/* Stats */}
//           <div className="mt-16 flex flex-wrap justify-center gap-10 md:gap-16">
//             <div>
//               <h3 className="text-3xl md:text-4xl font-bold text-white">
//                 10K+
//               </h3>
//               <p className="mt-1 text-slate-400">
//                 Active Users
//               </p>
//             </div>

//             <div>
//               <h3 className="text-3xl md:text-4xl font-bold text-white">
//                 2.5K+
//               </h3>
//               <p className="mt-1 text-slate-400">
//                 AI Prompts
//               </p>
//             </div>

//             <div>
//               <h3 className="text-3xl md:text-4xl font-bold text-white">
//                 4.9★
//               </h3>
//               <p className="mt-1 text-slate-400">
//                 Average Rating
//               </p>
//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Bottom Wave */}
//       <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
//         <svg
//           viewBox="0 0 1440 120"
//           className="w-full h-auto"
//           preserveAspectRatio="none"
//         >
//           <path
//             fill="#08111f"
//             fillOpacity="1"
//             d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,42.7C1120,32,1280,32,1360,32L1440,32L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"
//           />
//         </svg>
//       </div>

//     </section>
//   );
// }




///I can make


'use client';
import { Search, ArrowRight, PlayCircle } from "lucide-react";
import { IoRocketSharp } from "react-icons/io5";

export const HeroSection = () => {
     const trendingTags = [
    "ChatGPT",
    "Midjourney",
    "Claude",
    "Gemini",
    "SEO",
    "Marketing",
    "Coding",
    "Automation",
    "AI Agents",
    "Productivity",
  ];
  return (
    <>
    <section className="relative min-h-screen overflow-hidden bg-[#0b1020] pt-32 pb-16 md:pt-40">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_45%)]" />

      {/* Glow Effects */}
      <div className="absolute top-0 right-0 h-150 w-150 bg-purple-600/20 blur-[140px]" />
      <div className="absolute bottom-0 left-0 h-125 w-125 bg-indigo-600/20 blur-[140px]" />

      {/* SVG Grid */}
      <div className="absolute inset-0 opacity-20">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="rgba(255,255,255,0.08)"
                strokeWidth="1"
              />
            </pattern>
          </defs>

          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Dots Pattern */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 min-h-[80vh] flex items-center justify-center">
        <div className="max-w-5xl text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm mb-8">
            <span className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
            2,500+ Prompts Available
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
            Unlock the Power of
            <span className="block bg-linear-to-r from-purple-400 via-violet-300 to-indigo-400 bg-clip-text text-transparent">
              AI Prompts
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl mx-auto text-base md:text-lg text-slate-300 leading-relaxed">
            Discover, share and monetize premium AI prompts for ChatGPT,
            Claude, Gemini, Midjourney and the next generation of AI tools.
          </p>

          {/* Search */}
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="flex items-center rounded-full border border-white/10 bg-white/5 backdrop-blur-xl p-2">
              <Search
                size={18}
                className="text-slate-400 ml-3 shrink-0"
              />

              <input
                type="text"
                placeholder="Search prompts, tools, creators..."
                className="flex-1 bg-transparent px-4 py-3 text-white placeholder:text-slate-400 outline-none"
              />

              <button className="h-12 w-12 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 hover:scale-105 transition flex items-center justify-center">
                <ArrowRight size={18} className="text-white" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button className="px-8 py-3 rounded-full bg-linear-to-r from-purple-600 to-indigo-600 text-white font-medium hover:scale-105 transition shadow-lg shadow-purple-500/25 flex items-center gap-2">
            <IoRocketSharp size={18}></IoRocketSharp>
              Explore Now
            </button>

            <button className="px-8 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 transition flex items-center gap-2">
              <PlayCircle size={18} />
              Watch Demo
            </button>
          </div>

          {/* Trending Tags */}
          <div className="mt-12">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="h-2 w-2 rounded-full bg-purple-500 animate-pulse"></div>

              <span className="text-sm text-slate-400 uppercase tracking-wider">
                Trending Prompt Tags
              </span>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              {trendingTags.map((tag) => (
                <button
                  key={tag}
                 className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-slate-300 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/50 hover:bg-purple-500/10 hover:text-white hover:shadow-lg hover:shadow-purple-500/20"
                >
                  <span className="text-purple-400">#</span>
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 flex flex-wrap justify-center gap-10 md:gap-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                10K+
              </h3>
              <p className="mt-1 text-slate-400">
                Active Users
              </p>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                2.5K+
              </h3>
              <p className="mt-1 text-slate-400">
                AI Prompts
              </p>
            </div>

            <div>
              <h3 className="text-3xl md:text-4xl font-bold text-white">
                4.9★
              </h3>
              <p className="mt-1 text-slate-400">
                Average Rating
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-linear-to-t from-[#08111f] to-transparent" />
    </section>
    </>
  )
}
