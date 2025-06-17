"use client"
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../_utils/GlobalApi';
import FoodItem from '../_components/FoodItem';

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
            setFoodList(resp?.foods);
        })
    }
  return (
    <div className='mt-5'>
      <h2 className='font-bold text-2xl'>Popular {category} Foods</h2>
      <h2 className='font-bold text-shadow-black'>{foodList?.length} Results</h2>
      
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      gap-7 mt-3'>
        {foodList.map((foods,index)=>(
            <div className='p-3 
            hover:border rounded-lg
            hover:border-blue-500 transition-all duration-200 ease-in-out
            hover:bg-blue-50'>
                <FoodItem key={index}
                food={foods}
                 />
                <div className='mt-2'>
                    <h2 className='font-bold text-lg'>{foods.name}</h2>
                    <div>
                        <div>

                        </div>
                    </div>
                </div>
            </div>
        ))}
      </div>
    </div>
  )
}

export default FoodList
