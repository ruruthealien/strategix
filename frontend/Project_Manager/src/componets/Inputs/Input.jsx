import React, { useState } from 'react'
import  {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'

function Input({value, onChange, label, placeholder, type }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <div className='mb-4'>
        <label className='block text-[15px] text-[#CB7885] mb-2'>{label}</label>

        <div className='input-box'>
            <input 
                type={
                    type =="password" ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                className='w-full bg-transparent outline-none text-white placeholder-gray-400/50'
                value={value}
                onChange={(e) => onChange(e)}
            />

            {type === "password" && (
                <>
                    {showPassword ? (
                        <FaRegEye 
                        size ={22}
                        className='text-[#D4D994] cursor-pointer'
                        onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <FaRegEyeSlash 
                        size={22}
                        className='text-[#CB7885] cursor-pointer'
                        onClick={() => toggleShowPassword()}
                        />
                    )}
                </>
            )}
            
        </div>
    </div>
  );
};

export default Input