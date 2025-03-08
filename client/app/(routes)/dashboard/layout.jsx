"use client"
import React from 'react'
import SideNav from './_component/SideNav'
import DashboardHeader from './_component/DashboardHeader'
function DashboardLayout({ children }) {
  return (
    <div> 
        <div className='fixed md:w-64 hidden md:block shadow-md'>
            <SideNav />
        </div>
        <div className='md:ml-64'>

        {children}
        </div>
    </div>
  )
}

export default DashboardLayout