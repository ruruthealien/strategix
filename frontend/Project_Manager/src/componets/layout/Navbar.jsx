import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu';

const Navbar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false)
  return (
    <div className="flex gap-5 bg-[#612127] border-b border-gray-700  backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30">
        <button
        className="block lg:hidden text-[#D4D994]"
        onClick={()=>{
            setOpenSideMenu(!openSideMenu);
        }}>
            {openSideMenu ? (<HiOutlineX className="text-2xl"/>) : (<HiOutlineMenu className="text-2xl"/>)}
        </button>
        <h2 className="front-medium	text-[#D4D994] font-bold text-[25px]"> S t r a t e g i z </h2>

        {openSideMenu &&(
            <div className="fixed top-[61px] left-0 z-40 w-64 h-[calc(100vh-61px)] bg-amber-100 shadow-md transition-all duration-300 ease-in-out md:hidden">
                <SideMenu activeMenu={activeMenu} />
            </div>
        )}
    </div>
  )
}

export default Navbar