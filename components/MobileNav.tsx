'use client'

import { Menu } from 'lucide-react'
import Link from 'next/link'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from '@/components/ui/sheet'

import { usePathname } from 'next/navigation'

const MobileNav = () => {
  const pathname = usePathname()
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu size={36} />
      </SheetTrigger>
      <SheetContent
        side='left'
        className='border-none bg-card text-card-foreground  shadow-none lg:hidden'
      >
        <SheetHeader>
        <Link
          href='/'
          className='flex items-center gap-2 max-sm-gap-1'
        >
          <h1 className='font-semibold text-xl text-primary   '>
            HOTEL KOLBERG
          </h1>
        </Link>
        </SheetHeader>
        <SheetClose asChild>
          <div className='flex h-full flex-col gap-6 pt-16 '>
          <SheetClose asChild>
            <Link
              href='/'
              className={`flex items-center gap-4 hover:bg-primary hover:text-primary-foreground hover:rounded-sm  rounded-sm px-4 py-1 transition ${
                pathname === '/' ? 'active ' : 'px-4'
              }`}
            >
              Home
            </Link>
          </SheetClose>
          <SheetClose asChild>
            <Link
              href='/rooms'
              className={`flex items-center gap-4 hover:bg-primary hover:text-primary-foreground hover:rounded-sm  rounded-sm px-4 py-2 transition ${
                pathname === '/rooms' ? 'active ' : 'px-4'
              }`}
            >
              Rooms
            </Link>
            </SheetClose>
            <SheetClose asChild>
            <Link
              href='/contact'
              className={`flex items-center gap-4 hover:bg-primary hover:text-primary-foreground hover:rounded-sm  rounded-sm px-4 py-2 transition ${
                pathname === '/contact' ? 'active ' : 'px-4'
              }`}
            >
              Contact
            </Link>
            </SheetClose>
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav