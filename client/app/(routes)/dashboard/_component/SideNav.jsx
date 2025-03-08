"use client";

import React, { useEffect } from 'react'
import Image from "next/image";
import Link from "next/link";
import { LayoutGrid, PiggyBank, ReceiptText, ShieldCheck } from 'lucide-react';
import { usePathname } from 'next/navigation';
function SideNav() {
    const menulist = [
        {
            id:1,
            name:'Dashboard',
            icon:LayoutGrid,
            path:'/dashboard'
        },
        {
            id:2,
            name:'Income',
            icon:PiggyBank,
            path:'/dashboard/income'

        },
        {
            id:3,
            name:'Expenses',
            icon:ReceiptText,
            path:'/dashboard/expenses'

        },
        {
            id:4,
            name:'Upgrade',
            icon:ShieldCheck,
            path:'/dashboard/upgrade'

        }
    ]
    const path = usePathname();
    useEffect(()=>{
      console.log(path)
    },[path])
  return (
    <div className='h-screen p-5'>
      <div className='flex items-center justify-center'>
        <Image 
        src="/logo.svg"  // Ensure logo is in 'public/' folder
        alt="Logo"
        width={130}
        height={100}
        priority // Optimize for fast loading
      />
      </div>
      <div className='mt-7'>
        {menulist.map((menu,index) => (
          <Link key={menu.id} href={menu.path}>
            <h2 className={`flex gap-2 items-center text-gray-500 
            font-medium p-5 cursor-pointer rounded-md hover:text-white
             hover:bg-secondary mb-3
             ${path==menu.path&&'text-primary bg-green-100'}
             `}>
                <menu.icon/>
                {menu.name}
            </h2>
            </Link>
        ))}
      </div>
    </div>
  )
}

export default SideNav