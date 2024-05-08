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
import Image from 'next/image'

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
        href='/dashboard'
        className='flex items-center gap-2 max-sm-gap-1'
      >
        <Image
          src='/images/logo.png'
          width={40}
          height={40}
          alt='logo'
        />
        <h1 className='font-semibold text-xl text-primary   '>FT</h1>
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
              href='dashboard/analyzes'
              className={`flex items-center gap-4 hover:bg-primary hover:text-primary-foreground hover:rounded-sm  rounded-sm px-4 py-2 transition ${
                pathname === '/analyzes' ? 'active ' : 'px-4'
              }`}
            >
              Analyzes
            </Link>
            </SheetClose>
            <SheetClose asChild>
            <Link
              href='/dashboard/data-sheet'
              className={`flex items-center gap-4 hover:bg-primary hover:text-primary-foreground hover:rounded-sm  rounded-sm px-4 py-2 transition ${
                pathname === '/data-sheet' ? 'active ' : 'px-4'
              }`}
            >
              Data Sheet
            </Link>
            </SheetClose>
          </div>
        </SheetClose>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNav