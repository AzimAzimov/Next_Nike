import React, { useState } from 'react'


const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showCatMenu, setShowCatMenu] = useState(false)
  const [show, setShow] = useState("translate-y-0")
  const [lastScrollY, setLastScrollY] = useState(0)

  return (
    <header className={`w-full h-[]`}>
      Header
    </header>
  )
}

export default Header