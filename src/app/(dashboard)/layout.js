// import DashboardSidebar from '@/Components/Dashboard/DashboardSidebar'
// import React from 'react'

// const dashBoardLayout = ({ children }) => {
//   return (
//     <div className='flex min-h-screen'>
//         <DashboardSidebar></DashboardSidebar>
// <main className=''>{children}</main>

//     </div>
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
      <div className=''>
        <DashboardSidebar user={session?.user} />
        <main className='flex-1 ml-64 p-6 overflow-y-auto min-h-screen'>
            {children}
        </main>
    </div>
  </GlobalBackground>
  )
}

export default dashBoardLayout