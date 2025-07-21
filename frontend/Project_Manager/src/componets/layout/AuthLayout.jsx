import React from "react";
import UI_IMG from "../../assets/images/bg1.jpg";

const AuthLayout = ({ children }) => {
    return (
        <div className="flex">
            {/* Left Auth Panel */}
            <div className="w-screen h-screen md:w-[60vw] px-12 pt-4 pb-12 bg-[#1a1a1a]">
                <h2 className="fixed text-[100px] font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#893941] via-[#CB7885] to-[#D4D994] drop-shadow-[0_10px_10px_rgba(0,0,0,0.6)] tracking-wide">
                    Strategix
                </h2>
                {children}
            </div>

            {/* Right Image Panel */}
            <div>
                <img
                    src={UI_IMG}
                    className="md:flex w-[40vw] h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
                    alt="UI Visual"
                />
            </div>
        </div>
    );
};

export default AuthLayout;
