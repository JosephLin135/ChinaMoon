"use client"
import React, { useState } from 'react'
import Header from './_components/Header'
import { Toaster } from 'sonner'
import { CartUpdateContext } from './_context/CartUpdateContext'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

function Provider({children}) {
  const [updateCart, setUpdateCart]=useState(false);
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
    <CartUpdateContext.Provider value={{updateCart, setUpdateCart}}>
    <div className='px-10 md:px-20 relative'>
        <Header/>
        <Toaster />
        {children}
    </div>
    </CartUpdateContext.Provider>
    </PayPalScriptProvider>
  )
}

export default Provider
