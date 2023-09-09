import React, { Fragment } from 'react'
import Link from 'next/link';
import { BsChevronBarDown } from 'react-icons/bs'

const data = [
  { id: 1, name: "Home", url: "/" },
  { id: 2, name: "About", url: "/about" },
  { id: 3, name: "Categories", subMenu: true },
  { id: 4, name: "Contact", url: "/contact" },
];

const subMenuData = [
  { id: 1, name: "Jordan", doc_count: 11 },
  { id: 2, name: "Sneakers", doc_count: 8 },
  { id: 3, name: "Running shoes", doc_count: 64 },
  { id: 4, name: "Football shoes", doc_count: 107 },
];

const Menu = ({ showCatMenu, setShowCatMenu }) => {
  return (
    <ul className='hidden md:flex items-center gap-8 font-medium text-black'>
      {data.map(item => {
        return (
          <Fragment key={item.ad}>
            {!item?.subMenu ? (
              <li className='curso-pointer flex items-center gap-2 relative'>
                {item.name}
                <BsChevronBarDown size={14}/>
                {showCatMenu && (
                  <ul>
                    {subMenuData.map((subMenuItem) => {
                      return(
                        <Link href={"/"} key={subMenuData.id}>
                          <li className='h-12 flex justify-between items-center px-3 hover'>
                            {subMenuItem.name}
                            <span>
                              {subMenuItem.doc_count}
                            </span>
                          </li>
                        </Link>
                      )
                    })}
                  </ul>
                )}
              </li> 
            ) : (
                <li className='cursor-pointer text-black'>
                  <Link href={item?.url}>{item.name}</Link>
                </li>
              )
            }
          </Fragment>
        )
      })}
    </ul>
  )
}

export default Menu