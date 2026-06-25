import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import React from 'react'

const MainLayout = ({ children }) => {
  return (
    <div>
        
       <Navbar></Navbar>
       <main> {children}</main>
       <Footer></Footer>
  
    </div>
  )
}

export default MainLayout