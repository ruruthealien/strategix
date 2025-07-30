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
           className='w-full text-sm text-green-800 bg-white border border-gray-300 px-3 py-2 rounded-md mt-1 flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-green-400'>
                 {options.find((opt) => opt.value === value)?.label || placeholder}
                <span className='ml-2'>
                   <LuChevronsDown className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />

                </span>
            </button>

        {/* Dropdown menu */}
        {isOpen && (
            <div className='absolute w-full bg-white border-slate-100 rounded-md mt-1 shadow-md z-10'>
                {options.map((option) => (
                    <div
                        key={option.value}
                        className='px-3 py-2 text-sm cursor-pointer hover:bg-gray-100'
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