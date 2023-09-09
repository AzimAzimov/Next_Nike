import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import Image from "next/image";
import Link from 'next/link';
import { useDispatch } from 'react-redux';

import { removeFavorite } from '@/store/favoriteSlice';

const FavoritesItem = ({ data }) => {
  const prod = data?.attributes
  const dispatch = useDispatch()
  const handleRemoveFavorite = () => {
    dispatch(removeFavorite({id: data.id}))
  }

  return (
    <div className='flex py-5 gap-3 md:gap-5 border-b'>
      <div className="shrink-0 aspect-square w-[50px] md:w-[120px]">
        <Image
          width={120}
          height={120}
          src={prod?.thumbnail?.data?.attributes.url}
          alt={prod.name}
        />
      </div>
      <div className='w-full flex flex-col'>
        <div className='flex flex-col md:flex-row justify-between'>
          <div className="text-lg md:text-2xl font-semibold text-black/[0.8]">
            {prod.name}
          </div>
          <div className="text-sm md:text-md font-medium text-black/[0.5] block md:hidden">
            {prod.subtitle}
          </div>
          <div className="text-sm md:text-md font-bold text-black/[0.5]">
            MRP : $ {prod.price}
          </div>
        </div>
        <div className="text-md font-medium text-black/[0.5] hidden md:block">
          {prod.subtitle}
        </div>

        <div className='flex items-center justify-between mt-4'>
          <div className="flex items-center gap-2 md:gap-10 text-black/[0.5] text-sm md:text-md">
            <Link href={`/product/${prod.slug}`}
              className="text-[12px] w-full py-[8px] px-[10px] rounded-full bg-black text-white transition-transform active:scale-95 hover:opacity-75"
            >
              Learn More
            </Link>
          </div>
          <RiDeleteBin6Line
            onClick={handleRemoveFavorite}
            className='cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]'
          />
        </div>
      </div>
    </div>
  )
}

export default FavoritesItem