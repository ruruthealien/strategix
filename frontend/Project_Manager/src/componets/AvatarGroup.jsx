import React from 'react'

const AvatarGroup = ({avatars, maxVisible=3}) => {
  return (
    <div className='flex items-center'> 
        {avatars.slice(0, maxVisible).map((avatar, index) => (
            <img 
                src={avatar}
                key={index}
                alt={`Avatar ${index}`}
                className='w-9 h-9 rounded-full border-2 border-red-900 -ml-3 first:ml-0'/>
        ))}
        {avatars.length > maxVisible && (
            <div className='w-9 h-9 flex items-center justify-center bg-[#d4d994] text-sm font-medium rounded-full border-2 border-yellow-100 -ml-3'>
                +{avatars.length - maxVisible}
            </div>
        )}
    </div>
  )
}

export default AvatarGroup