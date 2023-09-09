import React from 'react'
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";


const ProductDetailsCorousel = ({images}) => {
  return (
    <div className='text-white text-[20px] w-full max-w-[1360px] sticky top-[50px]'>
      <Carousel
        infiniteLoop={true}
        showIndicators={false}
        showStatus={false}
        thumbWidth={60}
        className='productCarousel'
      >
        {images?.map((img) => (
          <img 
            key={img.id} 
            src={img.attributes.url} 
            alt={img.attributes.name} 
          />
        ))}
      </Carousel>
    </div>
  )
}

export default ProductDetailsCorousel