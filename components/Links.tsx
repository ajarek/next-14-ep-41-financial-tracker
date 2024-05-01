'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
const Links = () => {
  
  const pathname = usePathname()
  return (
    
     
      <div
        className={
          'w-full  flex items-center  justify-between  gap-6    italic'
        }
      >
        <Link
          href='/'
          className='flex items-center gap-2 max-sm-gap-1'
        >
          <h1 className='font-semibold text-xl text-primary   '>
            HOTEL KOLBERG
          </h1>
        </Link>

        <div className='max-lg:hidden flex '>
          <div className='flex items-center gap-6'>
            <Link
              href='/'
              className={`flex items-center gap-4 hover:bg-primary hover:text-primary-foreground hover:rounded-sm  rounded-sm px-4 py-1 transition ${
                pathname === '/' ? 'active ' : 'px-4'
              }`}
            >
              Home
            </Link>

            <Link
              href='/rooms'
              className={`flex items-center gap-4 hover:bg-primary hover:text-primary-foreground hover:rounded-sm  rounded-sm px-4 py-1 transition ${
                pathname === '/rooms' ? 'active ' : 'px-4'
              }`}
            >
              Rooms
            </Link>
            <Link
              href='/contact'
              className={`flex items-center gap-4 hover:bg-primary hover:text-primary-foreground hover:rounded-sm  rounded-sm px-4 py-1 transition ${
                pathname === '/contact' ? 'active ' : 'px-4'
              }`}
            >
              Contact
            </Link>
          </div>
        </div>
       
      </div>
    
  )
}

export default Links