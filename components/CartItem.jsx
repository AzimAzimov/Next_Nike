import React from 'react'
import { useDispatch } from 'react-redux';
import { RiDeleteBin6Line } from "react-icons/ri"
import Image from "next/image";

import { updateCart, removeFromCart } from '@/store/cartSlice';

const CartItem = ({ data }) => {
  const prod = data.attributes;
  const dispatch = useDispatch()
  const updateCartItem = (e, key) => {
    let payload = {
      key,
      val: key === "quantity" ? parseInt(e.target.value) : e.target.value,
      id: data.id,
    }
    dispatch(updateCart(payload))
  }
  const handleRemoveItem = () => {
    dispatch(removeFromCart({id: data.id}))
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
            <div className='flex items-center gap-1'>
              <div className="font-semibold">Size:</div>
              <select className='hover:text-black'
                onChange={(e) => updateCartItem(e, "selectedSize")}
              >
                {prod.size?.map((item, i) => {
                  return (
                    <option
                      key={i}
                      value={item.size}
                      disabled={!item.enabled ? true : false}
                      selected={data.selectedSize === item.size}
                    >
                      {item.size}
                    </option>
                  )
                })}
              </select>
            </div>
            <div className='flex items-center gap-1'>
              <div className="font-semibold">Quantity:</div>
              <select className='hover:text-black'
                onChange={(e) => updateCartItem(e, "quantity")}
              >
                {Array.from({length: 10}, (_, i) => i + 1).map((q, i) => {
                  return (
                    <option
                      key={i}
                      value={q}
                      selected={data.quantity === q}
                    >
                      {q}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <RiDeleteBin6Line
            onClick={handleRemoveItem}
            className='cursor-pointer text-black/[0.5] hover:text-black text-[16px] md:text-[20px]'
          />
        </div>
      </div>
    </div>
  )
}

export default CartItem