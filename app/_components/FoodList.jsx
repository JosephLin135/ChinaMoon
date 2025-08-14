"use client"
import { useSearchParams } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import FoodItem from '../_components/FoodItem';
import { SquarePlus } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { toast } from 'sonner';
import { CartUpdateContext } from '../_context/CartUpdateContext';

function FoodList() {
    const params=useSearchParams();
    const [category, setCategory]=useState('all');
    const [foodList, setFoodList]=useState([]);


    useEffect(()=>{
        params&&setCategory(params.get('category'))
        params&&GetFoodList(params.get('category'))
    },[params]);

    const GetFoodList=(category_)=>{
        GlobalApi.GetFood(category_).then(resp=>{
            console.log('Hygraph API response:', resp);
            setFoodList(resp?.foods);
        })
    }

    const {user}=useUser();
    const {updateCart, setUpdateCart}=useContext(CartUpdateContext);
    const AddToCartHandler=(food)=>{
      const data={
        email:user?.primaryEmailAddress?.emailAddress,
        name:food?.name,
        description:food?.description,
        price:food?.price,
        foodSlug:food?.slug
      }
      GlobalApi.AddToCart(data).then(resp=>{
        console.log(data);
        setUpdateCart(prev => !prev);
        toast('Added To Cart')
      }, (error)=>{
      toast('Error adding to cart')}
    )}

  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>{category}</h2>
      <h2 className='font-bold text-shadow-black'>{foodList?.length} Results</h2>
      
      <div className='flex flex-wrap gap-7 mt-3'>
        {(foodList || []).map((foods,index)=>(
            <div key={foods.id || index}
            className='p-3 pr-8
            hover:border rounded-lg
            hover:border-blue-500 transition-all duration-200 ease-in-out
            hover:bg-blue-50'>
                <FoodItem key={index}
                food={foods}
                 />
                <div className='mt-2'>
                    <h2 className='font-bold text-lg flex items-center'>{foods.name} <span className="ml-2">
                      <SquarePlus className="cursor-pointer" onClick={()=>AddToCartHandler(foods)}/>
                    </span></h2>
                    <div className="text-primary text-sm">
                      ${foods.price?.toFixed(2)}
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default FoodList
