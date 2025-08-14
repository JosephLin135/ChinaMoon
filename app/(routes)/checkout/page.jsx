"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import GlobalApi from '../../_utils/GlobalApi'
import { useSearchParams } from 'next/navigation'
import { useUser } from '@clerk/nextjs'
import { CartUpdateContext } from '../../_context/CartUpdateContext'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useRouter } from 'next/navigation'

function Checkout() {
    const params=useSearchParams();

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');

    const{user}=useUser();
    const [cart, setCart]=useState([]);
    const [setCartLoading] = useState(true);
    const{updateCart, setUpdateCart}=useContext(CartUpdateContext);
    const[deliveryAmount, setDeliveryAmount]=useState(2);
    const[taxAmount, setTaxAmount]=useState(0);
    const[subTotal, setSubTotal]=useState(0);
    const[totalAmount, setTotalAmount]=useState(0);
    const [loading, setLoading]=useState(false);
    const router=useRouter();

    useEffect(()=>{
        console.log(params.get('food'));
        user&&GetUserCart();
    },[user || updateCart])

    const GetUserCart=()=>{
    GlobalApi.GetUserCart(user?.primaryEmailAddress.emailAddress).then(resp=>{
    setCart(resp.userCarts);
    calculateTotalAmount(resp?.userCarts);
  })
}


const calculateTotalAmount=(cart_)=>{
    let total=0;
    cart_.forEach((item)=>{
        total=total+item.price;
    })
    setSubTotal(total.toFixed(2));
    setTaxAmount((total*0.06625).toFixed(2));
    setTotalAmount((total+total*0.06625+taxAmount+deliveryAmount).toFixed(2));
}

const addToOrder = () => {
    if(
       !username.trim() ||
       !phone.trim() ||
       !email.trim() ||
       !address.trim() ||
       !city.trim() ||
       !zipCode.trim() 
    ){
        toast.error('Please fill in all fields!');
        return;
    }

    setLoading(true);
    const data = {
        email: user.primaryEmailAddress.emailAddress,
        orderAmount: totalAmount,
        username: user.fullName,
        phone: phone,
        address: address,
        zipCode: zipCode,
        city: city
    };
    GlobalApi.CreateNewOrder(data).then(resp => {
        const resultId = resp?.createOrder?.id;
        if (resultId) {
            let completed = 0;
            cart.forEach((item) => {
                GlobalApi.UpdateOrderWithDetail(item.foodName, item.price, resultId, user?.primaryEmailAddress.emailAddress)
                    .finally(() => {
                        completed++;
                        if (completed === cart.length) {
                            setLoading(false);
                            toast('Order Added Successfully!');
                            setUpdateCart(!updateCart)
                            router.replace('/confirmation')
                        }
                    });
            });
        } else {
            setLoading(false);
        }
    }, () => setLoading(false));
};

const SendEmail=async()=>{
    try{
        const response=await fetch('/api/send-email', {method:'POST', headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email:user?.primaryEmailAddress.emailAddress})
    })
    if(!response.ok){
        toast('Error while sending email')
    }else{
        toast('Confirmation email sent!')
    }
    }
    catch(error){
        toast('Error while sending email')
    }
}

    return (
        <div>
            <h2 className='font-bold text-2xl mt-40'>Checkout</h2>
            <div className='p-5 px-5 md:px-10 grid grid-cols-1 md:grid-cols-5 gap-8 mt-4'>
                <div className='mx-2 col-span-3'>
                    <h2 className='font-bold text-3xl'>Billing Information</h2>
                    <p className='text-sm text-gray-600 mt-4'> * Required</p>
                    <div className='grid grid-cols-3 gap-8 mt-6'>
                        <Input placeholder='Name *' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        <Input placeholder='Phone *' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
                        <Input placeholder='Email *' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                    </div>
                    <div className='grid grid-cols-4 gap-6 mt-5'>
                        <Input placeholder='Address *' value={address} onChange={(e)=>setAddress(e.target.value)} className='col-span-2'/>
                        <Input placeholder='City *' value={city} onChange={(e)=>setCity(e.target.value)} className='col-span-1'/>
                        <Input placeholder='Zip Code *' value={zipCode} onChange={(e)=>setZipCode(e.target.value)} className='col-span-1'/>
                    </div>
                </div>
                <div className='mx-4 border rounded-lg h-fit col-span-1 md:col-span-2'>
                    <h2 className='p-3 bg-gray-200 font-bold text-center'>Cart Total ({cart?.length})</h2>
                    <div className='p-4 flex flex-col gap-4'>
                        <h2 className='font-bold flex justify-between'>Subtotal : <span>${subTotal}</span></h2>
                        <hr></hr>
                        <h2 className='flex justify-between'>Delivery Fee : <span>${deliveryAmount}.00</span></h2>
                        <h2 className='flex justify-between'>Tax (6.625%) : <span>${taxAmount}</span></h2>
                        <hr></hr>
                        <h2 className='font-bold flex justify-between'>Total : <span>${totalAmount}</span></h2>
                        <Button onClick={()=>SendEmail()} className='cursor-pointer'>
                            {loading?<Loader className='animate-spin'/>: "Proceed to Payment"}</Button>
                        {totalAmount > 5 && (
                        <PayPalButtons
                            disabled={!(username && email && address) || loading}
                            style={{ layout: "horizontal" }}
                            createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                {
                                    amount: {
                                    value: totalAmount,
                                    currency_code: 'USD'
                                    }
                                }
                                ]
                            });
                            }}
                            onApprove={async () => {
                            await addToOrder();
                            }}
                        />
                        )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        }

export default Checkout