import Footer from '@/Components/Footer'
import Navbar from '@/Components/Navbar'
import React from 'react'
import { Toaster } from 'react-hot-toast'

const MainLayout = ({ children }) => {
  return (
    <div>
        
       <Navbar></Navbar>
       <Toaster position="top-center"  />
       <main> {children}</main>
       <Footer></Footer>
  
    </div>
  )
}

export default MainLayout