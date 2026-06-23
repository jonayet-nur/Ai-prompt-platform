import React from 'react'

// Ekhane ({ children }) props ta add kora hoyeche
const GlobalBackground = ({ children }) => {
  return (
   <div className="relative min-h-screen w-full bg-[#030014] text-white overflow-x-hidden">
      {/* 1. Radial Gradient Top Layer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,92,246,0.25),transparent_45%)] pointer-events-none" />

      {/* 2. Glow Effects */}
      <div className="absolute top-0 right-0 h-150  w-150 bg-purple-600/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 h-125  w-125 bg-indigo-600/20 blur-[140px] pointer-events-none" />

      {/* 3. SVG Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="global-grid"
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
          <rect width="100%" height="100%" fill="url(#global-grid)" />
        </svg>
      </div>

      {/* Website er baki sob content er bhitore thakbe */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}

export default GlobalBackground