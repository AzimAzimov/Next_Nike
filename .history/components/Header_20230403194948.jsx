import React, { useState } from 'react'


const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [showCatMenu, setShowCatMenu] = useState(false)
  const [show, setShow] = useState("translate")

  return (
    <div>Header</div>
  )
}

export default Header