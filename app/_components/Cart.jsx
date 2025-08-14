import { Button } from '@/components/ui/button'
import { X } from 'lucide-react'
import React, { useContext } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import { toast } from 'sonner';
import { CartUpdateContext } from '../_context/CartUpdateContext';
import Link from 'next/link';

function Cart({cart}) {
    const{updateCart, setUpdateCart}=useContext(CartUpdateContext);

    const CalculateCartAmount=()=>{
        let total = 0;
        cart.forEach((item)=> {
            total=total+item.price;
        });
        return total.toFixed(2);
    }

    const RemoveItemFromCart=(id)=>{
        GlobalApi.DisconnectFoodFromCartItem(id).then(resp=>{
            console.log(resp);
            if(resp){
                GlobalApi.DeleteItemFromCart(id).then(resp=>{
                    console.log(resp);
                    toast('Item Removed!');
                    setUpdateCart(prev => !prev);
                })
            }
        })}

  return (
    <div>
      <h2 className='text-lg font-bold'>China Moon</h2>
      <div className='mt-3'>
        <h2 className='font-bold'>My Order</h2>
        {cart&&cart.map((item, index)=>(
            <div key={index} className='flex justify-between gap-8 items-center'>
                <div className='flex gap-2 items-center p-1'>
                <span className='font-semibold'>{index + 1}.</span>
                <h2 className='text-sm'>{item?.foodName}</h2>
            </div>
            <h2 className='font-semibold flex gap-2'>${item?.price}</h2>
            <X className='h-4 w-4 text-red-500 shrink-0 cursor-pointer'
            onClick={()=>RemoveItemFromCart(item.id)}/>
            </div>
        ))}
        <Link href={'/checkout?=order'}>
        <Button className='w-full mt-2 cursor-pointer'>Checkout ${CalculateCartAmount()}</Button>
        </Link>
      </div>
    </div>
  )
}

export default Cart
