import React from "react";
import UI_IMG from "../../assets/images/bg4.jpg"

const AuthLayout = ({ children }) => {
    return (
        <div className="flex">
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 bg-lime-700">
               <h2 className="text-lg font-medium text-yellow-100">Project Manager</h2>
               {children}
            </div>

            <div>
            <img src={UI_IMG} className=" md:flex w-[40vw] h-screen items-center justify-center bg-cover  bg-center bg-no-repeat" />
            </div>
        </div>
    )
}
export default AuthLayout;