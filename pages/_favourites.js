import React, {useMemo, useState} from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSelector } from 'react-redux';

import Wrapper from '@/components/Wrapper'
import FavoritesItem from '@/components/FavoritesItem';
import { fetchDataFromApi } from '@/utils/api';
import RelatedProducts from '@/components/RelatedProducts';

const Favorites = ({ products }) => {
  const { favoriteItems } = useSelector(state => state.favorites)

  return (
    <div className='w-full md:py-20'>
      <Wrapper>
        {favoriteItems.length > 0 ? (
          <>
            {/* HEADING AND PARAGRAPH START */}
            <div className='max-w-[800px] mx-auto text-center mt-8 md:mt-0'>
                <div className='leading-tight text-[28px] mb-5 font-semibold md:text-[34px]'>
                  Favorite 
                </div>
            </div>
            {/* HEADING AND PARAGRAPH END */}

            {/* CART CONTENT START */}
            <div className='flex flex-col lg:flex-row gap-12 py-10'>
              <div className='flex-[2]'>
                <div className='text-lg font-bold'>Sneakers</div>
                {favoriteItems.length > 0 && (
                  favoriteItems.map(item => (
                    <FavoritesItem key={item.id} data={item} />
                  ))
                )}
              </div>
            </div>
            {/* CART CONTENT END */}
          </>
        ) : (
          <div className='flex-[2] flex flex-col items-center pb-[50px] md:-mt-14'>
            <Image 
              src="/empty-cart.jpg" 
              width={300} height={300}
              className='w-[300px] md:w-[400px]'
              alt='empty_cart'
            />
            <span className='text-xl font-bold'>
              You don't have your favorite sneakers yet
            </span>
            <span className='text-center mt-4'>
              Go to the product page and add your favorite sneakers
              <br/>
              Go ahead and explore top categories
            </span>
            <Link
              href={"/"}
              className="py-4 px-8 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 my-10 hover:opacity-75"
            >
              Choose a Sneaker
            </Link>
          </div> 
        )}
        <RelatedProducts products={products}/>
      </Wrapper>
    </div>
  )
}

export default Favorites

export const getStaticProps = async () => {
  const products = await fetchDataFromApi("/api/products?populate=*")
  return {
    props: {products}
  }
}

