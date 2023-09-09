import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getDiscountedPricePersentage } from '@/utils/helper'


const ProductCard = ({ data: {attributes: prod} }) => {
  return (
    <Link href={`/product/${prod.slug}`} 
      className='transform overflow-hidden bg-white duration-200 hover:scale-105 cursor-pointer'
    >
      <Image
        width={500}
        height={500}
        src={prod?.thumbnail?.data?.attributes.url}
        alt={prod.name}
      />
      <div className='p-4 text-black/[0.9]'>
        <h2 className='text-lg font-medium'>{prod.name}</h2>
        <div className='flex items-center text-black/[0.5]'>
          <p className='mr-2 text-lg font-semibold'>₽{' '}{prod.price}</p>
          {prod.original_price && (
            <>
              <p className='text-base font-medium line-through'>₽{' '}{prod.original_price}</p>
              <p className='ml-auto text-base font-medium text-green-500'>
                {getDiscountedPricePersentage(
                  prod.original_price, 
                  prod.price
                )}% off
              </p>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}

export default ProductCard