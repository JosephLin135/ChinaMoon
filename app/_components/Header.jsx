"use client"
import { Search } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { Button } from '../../components/ui/button'
import { SignInButton, UserButton, useUser } from '@clerk/nextjs'

function Header() {

const{user, isSignedIn}=useUser();

  return (
    <div className='flex justify-between items-center p-6 md:px-20 shadow-md fixed width w-full top-0 left-0 z-20'>
      <Image src='/logo.png' alt='logo'
      width={200}
      height={200}/>

      <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 w-96'>
        <input type='text' className='bg-transparent w-full outline-none'/>
        <Search />
      </div>

     {isSignedIn?
     <UserButton />
      :<div className='flex gap-5'>
        <SignInButton mode='modal'>
          <Button variant='outline' className="cursor-pointer">Login</Button>
        </SignInButton>
        <Button>Sign Up</Button>
      </div>
     }
    </div>
  )
}

export default Header