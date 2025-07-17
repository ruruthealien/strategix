import React from "react";
import UI_IMG from "../../assets/images/bg4.jpg"

const AuthLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-4 pb-12 bg-gradient-to-br from-black via-green-900 to-black">
               <h2 className=" fixed text-[100px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600/80 via-white to-yellow-400 drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] shadow-inner tracking-wide">Strategix</h2>
               {children}
            </div>

            <div>
            <img src={UI_IMG} className=" md:flex w-[40vw] h-screen items-center justify-center bg-cover  bg-center bg-no-repeat" />
            </div>
        </div>
    )
}
export default AuthLayout;