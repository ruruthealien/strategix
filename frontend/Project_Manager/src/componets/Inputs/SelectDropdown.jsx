import React, { useState } from 'react'
import { LuChevronsDown } from 'react-icons/lu'
const SelectDropdown = ({options, value, onChange, placeholder}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option) => {
    onChange(option.value);
    setIsOpen(false);
  };

    return <div className='relative w-full'>
        {/* Dropdown button */}
        <button
            onClick={() => setIsOpen(!isOpen)}
           className='w-full text-sm text-black bg-[#fceeee] border border-gray-400 px-3 py-2 rounded-md mt-1 flex justify-between items-center focus:outline-none focus:ring-1 focus:ring-red-900'>
                 {options.find((opt) => opt.value === value)?.label || placeholder}
                <span className='ml-2'>
                   <LuChevronsDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />

                </span>
            </button>

        {/* Dropdown menu */}
        {isOpen && (
            <div className='absolute w-full bg-[#fceeee] border-red-900 rounded-md mt-1 shadow-md z-10'>
                {options.map((option) => (
                    <div
                        key={option.value}
                        className='px-3 py-2 text-sm cursor-pointer hover:bg-red-100'
                        onClick={() => handleSelect(option)}
                    >
                        {option.label}
                    </div>
                ))}
            </div>
        )}

    </div>
  
};

export default SelectDropdown