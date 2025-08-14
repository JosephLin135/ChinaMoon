"use client"
import { Search, ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useEffect, useState } from 'react'
import { Button } from '../../components/ui/button'
import { SignInButton, SignUpButton, UserButton, useUser } from '@clerk/nextjs'
import { CartUpdateContext } from '../_context/CartUpdateContext'
import GlobalApi from '../_utils/GlobalApi'
import Cart from '../_components/Cart'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useRouter } from 'next/navigation'

function Header() {

const{user, isSignedIn}=useUser();
const{updateCart, setUpdateCart}=useContext(CartUpdateContext);
const[cart,setCart]=useState([]);
const [cartLoading, setCartLoading] = useState(true);
const router = useRouter();

const GetUserCart=()=>{
  GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(resp=>{
    setCart(resp.userCarts);
    setCartLoading(false);
  })
}

useEffect(()=>{
  if (user) {
    setCartLoading(true);
    GetUserCart();
  }
}, [updateCart, user])

  return (
    <div className='flex justify-between items-center p-6 md:px-20 shadow-md fixed width w-full top-0 left-0 z-20'>
      <Image src='/logo.png' alt='logo'
      className='cursor-pointer'
      width={200}
      height={200}
      onClick={()=>router.push('../app/')}
      />

      <div className='hidden md:flex border p-2 rounded-lg bg-gray-200 w-96'>
        <div className='text-gray-600'>Search</div>
        <input type='text' className='bg-transparent w-full outline-none'/>
        <Search />
      </div>

     {isSignedIn?
     <div className='flex gap-3 items-center'>
      <Popover>
      <PopoverTrigger asChild>
        <div className='flex gap-2 items-center cursor-pointer'>
      <ShoppingCart />
      <label className='p-1 px-2 rounded-full bg-slate-200 cursor-pointer'>
        {cartLoading ? "..." : (cart?.length ?? 0)}
      </label>
      </div></PopoverTrigger>
      <PopoverContent>
        <Cart cart={cart}/>
      </PopoverContent>
      </Popover>

      <UserButton/>
      </div>
      :<div className='flex gap-5'>
        <SignInButton mode='modal'>
          <Button variant='outline' className="cursor-pointer">Login</Button>
        </SignInButton>
        <SignUpButton mode='modal'>
          <Button className="cursor-pointer">Sign Up</Button>
        </SignUpButton>
      </div>
     }
    </div>
  )
}

export default Header