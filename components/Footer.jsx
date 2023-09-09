import React from "react";
import { FaFacebookF, FaTwitter, FaYoutube, FaInstagram } from "react-icons/fa";
import Wrapper from "./Wrapper";
import { firstData, secondData, thirdData, fourthData, socialData } from "./Data";
import Link from "next/link";


const Footer = () => {
  return (
  <>
    <footer className="bg-black text-white pt-14 pb-[12px]">
      <Wrapper className="flex justify-between flex-col md:flex-row gap-[50px] md:gap-0 mb-[30px]">
        {/* LEFT START */}
        <div className="flex gap-[50px] md:gap-[75px] lg:gap-[100px] flex-col md:flex-row">
          {/* MENU START */}
          <ul className="flex flex-col gap-[5px]">
            {firstData.map((item) => {
              return (
                <li key={item.id} 
                  className="ease duration-200 text-white hover:text-white/[0.5]"
                >
                  <Link 
                    href={`${item.url}`}
                    className="font-oswald uppercase"
                  >
                    {item.title}
                  </Link>
                </li>
              )
            })}
          </ul> 
          {/* NORMAL MENU START */}
          <div className="flex gap-[50px]">
            <ul>
              <li className='mb-[8px] font-oswald uppercase text-white'>GET HELP</li>
              {secondData.map((item) => {
                return (
                  <li key={item.id} className="mb-[4px] ease duration-200 text-white/[0.5] hover:text-white">
                    <Link 
                      href={`${item.url}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
            <ul>
              <li className='mb-[8px] font-oswald uppercase text-white'>ABOUT NIKE</li>
              {thirdData.map((item) => {
                return (
                  <li key={item.id} className="mb-[4px] ease duration-200 text-white/[0.5] hover:text-white">
                    <Link 
                      href={`${item.url}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        {/* RIGHT START */}
        <ul className="flex gap-[10px] max-md:justify-center">
          {socialData.map((social) => {
            return (
              <li key={social.id} 
                className="rounded-full flex items-center justify-center w-10 h-10 bg-white/[0.4] text-black hover:bg-white/[0.8] ease duration-200"
              >
                <Link href={`${social.url}`} target={"_blank"} className="p-[12px]" size={social.size}>
                  {social.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </Wrapper>
      <Wrapper className="flex justify-between items-centar max-md:flex-col max-md:justify-center">
        <div className="text-[12px] max-md:text-center ease duration-200 text-white/[0.5] hover:text-white/[1] max-md:mb-[5px]">© 2023 Nike, Сделано Азимом{')'}</div>
         <ul className="flex gap-[20px] max-md:justify-center max-md:gap-[10px] max-md:mb-[10px]">
          {fourthData.map((item) => {
            return (
              <li key={item.id} 
                className="flex items-center justify-center ease duration-200 text-white/[0.5] hover:text-white/[1]"
              >
                <Link href={`${item.url}`} className="text-[12px]">
                  {item.title}
                </Link>
              </li>
            )
          })}
        </ul>
      </Wrapper>
    </footer>
  </>
  );
};

export default Footer;