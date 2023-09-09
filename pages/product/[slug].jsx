import React, {useState} from 'react'
import { IoMdHeartEmpty } from 'react-icons/io'
import { useDispatch } from 'react-redux'

import ProductDetailsCorousel from '@/components/ProductDetailsCorousel'
import RelatedProducts from '@/components/RelatedProducts'
import Wrapper from '@/components/Wrapper'
import { fetchDataFromApi } from '@/utils/api'
import { getDiscountedPricePersentage } from '@/utils/helper'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { addToCart } from '@/store/cartSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addToFavorite } from '@/store/favoriteSlice'


const ProductDetails = ({product, products}) => {
  const dispatch = useDispatch()
  const [selectedSize, setSelectedSize] = useState()
  const [showError, setShowError] = useState(false)
  const p = product?.data?.[0]?.attributes;

  const notify = () => {
    toast.success('Succes. Check your cart!',{
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    })
  }

  const handleAddToCard = () => {
    if(!selectedSize) {
      setShowError(true)
      document.getElementById("gridColumn").scrollIntoView({
        block: "center",
        behavior: "smooth"
      })
    } else {
      dispatch(addToCart({
        ...product?.data?.[0],
        selectedSize,
        oneQuantityPrice: p.price
      }))
      notify()
    }
  }

  const handleAddToFavorites = () => {
    dispatch(addToFavorite({
      ...product?.data?.[0],
    }))
    console.log("addToFavorites");
  }

  return (
    <div className='w-full md:py-20'>
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <Wrapper>
        <div className='flex flex-col lg:flex-row md:px-10 gap-[50px] lg:gap-[100px]'>
          {/* left column start */}
          <div className='w-full md:w-auto flex-[1.5] max-w-[500px] lg:max-w-full mx-auto lg:mx-0'>
            <ProductDetailsCorousel images={p.images?.data} />
          </div>
          {/* left column end */}

          {/* right column start */}
          <div className='flex-[1] py-3'>
            <div className='text-[34px] font-semibold mb-2 leading-10'>{p.name}</div>
            <div className="text-lg mb-5 font-semibold">
              {p.subtitle}
            </div>
            {/* PRODUCT PRICE */}
            <div className="flex items-center">
              <p className="mr-2 text-lg font-semibold">
                MRP : ₽{' '}{p.price}
              </p>
              {p.original_price && (
                <>
                  <p className="text-base  font-medium line-through">
                    ₽{' '}{p.original_price}
                  </p>
                  <p className="ml-auto text-base font-medium text-green-500">
                    {getDiscountedPricePersentage(
                      p.original_price,
                      p.price
                    )}
                    % off
                  </p>
                </>
              )}
            </div>
            <div className="text-md font-medium text-black/[0.5]">incl. of taxes</div>
            <div className="text-md font-medium text-black/[0.5] mb-20">
              {`(Also includes all applicable duties)`}
            </div>  

            {/* product size start */}
            <div className="mb-10">
              <div className="flex mb-2 justify-between">
                <div className="text-md font-mediu">Select Size</div>
                <div className="text-md font-medium text-black/[0.5] cursor-pointer">Select Guide</div>
              </div>
              <div id='gridColumn' className="grid grid-cols-3 gap-2">
                {p.size?.map((item, i) => {
                  return (
                    <div 
                      key={i}
                      className={`border rounded-md text-center ease duration-200
                      py-3 font-medium ${item.enabled 
                        ? 'hover:border-black cursor-pointer events-none' 
                        : 'opacity-40 cursor-not-allowed bg-slate-400/[0.3]'
                      } ${selectedSize === item.size ? 'border-black bg-black text-white' : ''}
                    `}
                    onClick={() => {
                      setSelectedSize(item.size)
                      setShowError(false)
                    }}
                  >
                    {item.size}
                  </div>
                  )
                })}
              </div>
              {showError && <div className="text-red-600 mt-1">Size selection is required</div>}
            </div>
            {/* product size end */}
            <button 
              className="w-full py-4 rounded-full bg-black text-white text-lg font-medium transition-transform active:scale-95 mb-3 hover:opacity-75"
              onClick={handleAddToCard}
            >
              Add to Cart
            </button>
            <button 
              onClick={handleAddToFavorites}
             className="w-full py-4 rounded-full border border-black text-lg font-medium transition-transform active:scale-95 mb-10 hover:bg-red-700 hover:border-red-700 hover:text-white flex items-center justify-center gap-1 ease duration-300">
              Whishlist
              <IoMdHeartEmpty size={20}/>
            </button>
            <div>
              <div className="text-lg font-bold md-5">Product Details</div>
              <div className="markdown text-md mb-5">
                <ReactMarkdown>
                  {p.description}
                </ReactMarkdown>
              </div>
            </div>
          </div>
          {/* right column start */}
        </div>
        <RelatedProducts products={products}/>
      </Wrapper>
    </div>
  )
}

export default ProductDetails

export async function getStaticPaths() {
  const products = await fetchDataFromApi('/api/products?populate=*')
  const paths = products?.data?.map((p) => ({
    params: {
      slug: p.attributes.slug
    }
  }))

  return {
    paths,
    fallback: false
  }
}


export async function getStaticProps({ params: {slug} }) {
  const product = await fetchDataFromApi(
    `/api/products?populate=*&filters[slug][$eq]=${slug}`
  )
  const products = await fetchDataFromApi(
    `/api/products?populate=*&[filters][slug][$ne]=${slug}`
  )
  
  return {
    props: {
      product,
      products,
    }
  }
}