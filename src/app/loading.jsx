import { Spinner } from '@heroui/react'
import React from 'react'

const loading = () => {
  return (
    
    <div className="flex flex-col justify-center items-center min-h-[400px] bg-gray-950 relative overflow-hidden px-4">
  
  {/* 🔮 ব্যাকগ্রাউন্ডে নিয়ন অ্যাম্বিয়েন্ট গ্লো */}
  <div className="absolute w-56 h-56 bg-purple-600/10 rounded-full blur-[90px] pointer-events-none animate-pulse" />
  <div className="absolute w-36 h-36 bg-pink-500/5 rounded-full blur-[70px] pointer-events-none animate-pulse delay-500" />

  {/* 🔄 মেইন লোডার কন্টেইনার */}
  <div className="relative flex flex-col items-center gap-6 z-10">
    
    {/* ডাবল-রিং অ্যানিমেটেড আর্কিটেকচার */}
    <div className="relative w-16 h-16 flex items-center justify-center">
      
      {/* ১. বাইরের পার্পল রিং (ক্লকওয়াইজ ঘুরবে) */}
      <div className="absolute inset-0 rounded-full border-2 border-purple-500/10 border-t-purple-500 border-r-purple-500 animate-spin shadow-[0_0_15px_rgba(168,85,247,0.3)]"></div>
      
      {/* ২. ভেতরের পিঙ্ক রিং (অ্যান্টি-ক্লকওয়াইজ উল্টো ঘুরবে) */}
      <div className="absolute w-10 h-10 rounded-full border-2 border-pink-500/10 border-b-pink-500 border-l-pink-500 animate-[spin_1.5s_linear_infinite] reverse-spin"></div>
      
      {/* ৩. সেন্টারে থাকা ফিক্সড এআই ডট */}
      <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.8)] animate-ping"></div>
    </div>

    {/* 📝 স্লীক টাইপোগ্রাফি (টেক্সট) */}
    <div className="text-center space-y-1.5">
      <p className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-gray-100 via-purple-200 to-gray-400 uppercase tracking-[0.25em] font-mono">
        Processing Matrices
      </p>
      <p className="text-[10px] text-gray-500 font-medium tracking-wide max-w-[200px] mx-auto">
        Optimizing prompt environment...
      </p>
    </div>

  </div>
</div>
  )
}

export default loading

