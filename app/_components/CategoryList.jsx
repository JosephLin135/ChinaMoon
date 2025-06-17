"use client"
import React, { useEffect, useState, useRef } from 'react';
import GlobalApi from "../_utils/GlobalApi";
import Image from 'next/image';
import { ArrowRightCircle } from 'lucide-react';
import 'tailwind-scrollbar-hide';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function CategoryList() {

    const listRef=useRef(null)
    const [categoryList,setCategoryList]=useState([]);
    const params=useSearchParams();
    const [selectedCategory,setSelectedCategory]=useState('all')
    useEffect(()=>{
        setSelectedCategory(params.get('category'));
    },[params])

    useEffect(()=>{
        getCategoryList();
    }, [])


  const getCategoryList=()=>{
    GlobalApi.GetCategory().then(resp=>{
      console.log(resp.categories);
      setCategoryList(resp.categories);
    })
  }

  const ScrollRightHandler=()=>{
    if(listRef.current){
        listRef.current.scrollBy({
            left:200,
            behavior:'smooth'
        })
    }
  }
  return (
    <div className='mt-40 relative'>
        <div className='flex gap-4 overflow-auto pl-4 scrollbar-hide' ref={listRef}>
            {categoryList&&categoryList.map((category,index)=>(
                <Link href={'?category='+category.slug} key={index}
                className={`flex flex-col items-center gap-4 border p-3 rounded-xl min-w-28
                    hover: border-blue-500 hover:bg-blue-50
                    cursor-pointer group
                    ${selectedCategory==category.slug&&'text-primary border-primary bg-blue-200'}
                    `}>
                    <Image src={category.icon?.url} alt={category.name}
                    width={30}
                    height={30}
                    className="mx-auto object-contain group-hover:scale-110 transition-all duration-200"
                    />
                    <h2 className="text-sm font-medium group-hover:text-blue-800">{category.name}</h2>
                </Link>
            ))}
        </div>
        <ArrowRightCircle className='absolute -right-10 top-10 h-8 w-8
        bg-gray-500 rounded-full text-white cursor-pointer'

        onClick={()=>ScrollRightHandler()}
        />
    </div>
  )
}
export default CategoryList
