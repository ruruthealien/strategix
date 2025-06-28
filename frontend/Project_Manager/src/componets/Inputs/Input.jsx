import React, { useState } from 'react'
import  {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'

function Input({value, onChange, label, placeholder, type }) {
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => setShowPassword(!showPassword);
  return (
    <div>
        <label className='text-[15px] text-yellow-100'>{label}</label>

        <div className='input-box'>
            <input 
                type={
                    type =="password" ? (showPassword ? "text" : "password") : type}
                placeholder={placeholder}
                className='w-full bg-transparent outline-none'
                value={value}
                onChange={(e) => onChange(e)}
            />

            {type === "password" && (
                <>
                    {showPassword ? (
                        <FaRegEye 
                        size ={22}
                        className='text-primary cursor-pointer'
                        onClick={() => toggleShowPassword()}
                        />
                    ) : (
                        <FaRegEyeSlash 
                        size={22}
                        className='text-yellow-100 cursor-pointer'
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