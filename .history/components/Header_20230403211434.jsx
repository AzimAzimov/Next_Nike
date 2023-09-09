import React, { useState } from 'react'

import Wrapper from './Wrapper';
import Link from 'next/link';
import Menu from './Menu';

import { IoMdHeadertEmpty } from 'react-icons/io'
import { BsCart } from 'react-icons/bs'
import { BiMenuAltRight } from 'react-icons/bi'
import { VscChromeClose } from 'react-icons/vsc'


const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showCatMenu, setShowCatMenu] = useState(false)
  const [show, setShow] = useState("translate-y-0")
  const [lastScrollY, setLastScrollY] = useState(0)

  return (
    <header className={`w-full h-[50px] md:h-[80px] bg-white flex items-center justify-between z-20 sticky top-0 transition-transform duration-300 ${show}`}>
      <Wrapper className='h-[60px] flex items-center justify-between'>
        <Link href={"/"}>
          <img 
            src="/logo.svg" alt="nike" 
            className='w-[40px] md:w-[60px] cursor-pointer' 
          />
        </Link>
        <Menu 
          showCatMenu={showCatMenu} 
          setShowCatMenu={setShowCatMenu} 
        />
        <div className='flex items-center gap-2 text-black'>
          <div className='w-8 md:w-12 h-8 md:h-12 rounded-full flex justify-center items-center hover:bg-black/[0.05] cursor-pointer relative'>
            <BsCart className='text-[15px] md:text-[20px]'/>
            <span className='h-[14px] md:h-[18px] min-w-[1]'>5</span>
          </div>
        </div>
      </Wrapper>
    </header>
  )
}

export default Header