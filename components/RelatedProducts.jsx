import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from './ProductCard';


const RelatedProducts = ({products}) => {
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  
  return (
    <div className='mt-[80px] md:mt-[100px] md-[100px] md:mb-0'>
      <div className='text-center leading-tight text-[28px] mb-8 font-semibold md:text-[34px]'>You Might Also Like</div>
      <Carousel 
        responsive={responsive}
        containerClass='-mx-[10px]'
        itemClass='px-[10px]'
      >
        {products?.data?.map((product) => {
          return (
            <ProductCard key={product?.id} data={product} />
          )
        })}
      </Carousel>
    </div>
  )
}

export default RelatedProducts