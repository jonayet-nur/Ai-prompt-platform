
// import DashboardSidebar from '@/Components/Dashboard/DashboardSidebar'
// import GlobalBackground from '@/Components/Globalbackground'
// import { auth } from '@/lib/auth'
// import { headers } from 'next/headers'
// import React from 'react'

// const dashBoardLayout = async ({ children }) => {
//     const session = await auth.api.getSession({
//     headers: await headers(),
//   })
//   return (
//   <GlobalBackground>
//       <div className=''>
//         <DashboardSidebar user={session?.user} />
//         <main className='flex-1 ml-64 p-6 overflow-y-auto min-h-screen'>
//             {children}
//         </main>
//     </div>
//   </GlobalBackground>
//   )
// }

// export default dashBoardLayout



import DashboardSidebar from '@/Components/Dashboard/DashboardSidebar'
import GlobalBackground from '@/Components/Globalbackground'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import React from 'react'

const dashBoardLayout = async ({ children }) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
    <GlobalBackground>
      {/* এখানে flex এবং flex-col ব্যবহার করা হয়েছে যাতে মোবাইলে একটির নিচে আরেকটি আসে, 
        আর lg:flex-row দিয়ে লার্জ স্ক্রিনে সাইডবার ও মেইন কন্টেন্ট পাশাপাশি বসে।
      */}
      <div className='flex flex-col lg:flex-row min-h-screen w-full'>
        
        {/* সাইডবার কম্পোনেন্ট */}
        <DashboardSidebar user={session?.user} />
        
        {/* মেইন কন্টেন্ট এরিয়া:
          - ml-0: মোবাইলে বামে কোনো এক্সট্রা মার্জিন থাকবে না, ফলে কন্টেন্ট ফুল স্ক্রিন জুড়ে সেন্টারে থাকবে।
          - lg:ml-64: যখন স্ক্রিন বড় (ডেক্সটপ) হবে, তখন সাইডবারের সমপরিমাণ (64) মার্জিন বামে তৈরি হবে।
          - w-full এবং max-w-7xl mx-auto: কন্টেন্টকে অতিরিক্ত ছড়িয়ে যাওয়া থেকে আটকে মাঝখানে (Center) সুন্দরভাবে সাজিয়ে রাখবে।
        */}
        <main className='flex-1 ml-0 lg:ml-64 p-4 md:p-6 transition-all duration-300 w-full max-w-7xl mx-auto'>
          {children}
        </main>

      </div>
    </GlobalBackground>
  )
}

export default dashBoardLayout