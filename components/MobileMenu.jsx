import React, { Fragment } from 'react'
import Link from 'next/link';
import { BsChevronDown } from 'react-icons/bs'

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

const MobileMenu = ({ showCatMenu, setShowCatMenu, setMobileMenu, categories }) => {
  return (
    <ul className={setMobileMenu
      ? 'ease duration-150 flex flex-col md:hidden font-bold absolute top-[50px] left-0 w-full h-calc(100vh-50px)] bg-white border-t text-black'
      : 'opacity-0 absolute top-[-100%]'
    }>
      {data.map(item => {
        return (
          <Fragment key={item.id}>
            {!!item?.subMenu ? (
              <li className={showCatMenu 
                ? 'ease duration cursor-pointer flex flex-col py-4 px-5 border-b relative' 
                : 'cursor-pointer ease duration flex flex-col py-4 px-5 border-b relative h-[57px]'}
                onClick={() => setShowCatMenu(!showCatMenu)}
              >
                <div className='flex justify-between items-center'>
                  {item.name}
                  <BsChevronDown size={14}/>
                </div>
                {showCatMenu && (
                  <ul className={showCatMenu ? 'bg-black/[0.05] -mx-5 mt-4 -mb-4 h-[230px] ease duration-200 opacity-1' : 'opacity-0 h-[0px]'}>
                    {categories?.map(({attributes: category, id}) => {
                      return(
                        <Link href={`/category/${category.slug}`} key={id}
                          onClick={() => {
                            setShowCatMenu(false)
                            setMobileMenu(false)
                          }}
                        >
                          <li className='py-4 px-8 border-t flex justify-between'>
                            {category.name}
                            <span className='opacity-50 text-5m'>
                              {`(${category.products.data.length})`}
                            </span>
                          </li>
                        </Link>
                      )
                    })}
                  </ul>
                )}
              </li> 
            ) : (
                <li className='py-4 px-5 border-b'>
                  <Link href={`${item.url}`}
                    onClick={() => setMobileMenu(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              )
            }
          </Fragment>
        )
      })}
    </ul>
  )
}

export default MobileMenu