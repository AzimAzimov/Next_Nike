
import React from 'react'

import HerroBanner from '@/components/HerroBanner'
import ProductCard from '@/components/ProductCard';
import Wrapper from '@/components/Wrapper'
import { fetchDataFromApi } from '@/utils/api';

export default function Home ({ products }) {
  return (
    <main>
      <HerroBanner />
      <Wrapper>
        {/* heading and paragraph start */}
        <div className='max-w-[800px] mx-auto text-center my-[50px] mr:my-[80px]'>
          <div className='leading-tight text-[28px] mb-5 font-semibold md:text-[34px]'>
            Cushioning for You Miles
          </div>
          <div className='text-md md:text-xl'>
            A lightweight Nike ZoomX midsole is combined with increased stack heights to help provide cushioning during extended stretches of running
          </div>
        </div>
        {/* heading and paragraph end */}

        {/*product grid start */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-14 px-5 md:px-0'>
          {products?.data?.map((product) => {
            return (
              <ProductCard key={product?.id} data={product} />
            )
          })}
        </div>
        {/*product grid end */}
      </Wrapper>
    </main>
  )
}

export async function getStaticProps() {
  const products = await fetchDataFromApi("/api/products?populate=*")
  return {
    props: {products}
  }
}
