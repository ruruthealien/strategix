import React, { useRef, useState } from 'react'
import {LuUser, LuUpload, LuTrash} from 'react-icons/lu'


const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (event) =>{
        const file = event.target.files[0];
        if (file){
            // update the image state
            setImage(file);

            //Generate preview URL from the file
            const preview = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    };
    const handleRemoveImage = () =>{
        setImage(null);
        setPreviewUrl(null);
    };

    const onChooseFile = () =>{
        inputRef.current.click();
    };

  return <div className='flex justify-center mb-6 text-[#F7F7E8]'>
    <input 
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
    />
    {!image ?(
        // ui of profile icon and arrow icon
        <div className="w-20 h-20 flex items-center justify-center bg-[#a0c7aa] rounded-full relative cursor-pointer">
            <LuUser className="text-4xl text-[#305252]" />
            <button
                type='button'
                className='w-8 h-8 flex items-center justify-center bg-[#C3EDC0] text-[#305252]  rounded-full absolute -bottom-1 -right-1 cursor-pointer'
                onClick={onChooseFile}>
            <LuUpload />
            </button>
        </div>
    ):(//relative for the remove button and ui of the delete button
        <div className="relative"> 
            <img 
                src={previewUrl} 
                alt="profile photo" 
                className='w-20 h-20 rounded-full object-cover' />
            <button  
                type='button'
                className='w-8 h-8 flex items-center justify-center bg-[#C3EDC0] text-[#305252] rounded-full absolute -bottom-1 -right-1'
                onClick={handleRemoveImage}>
                <LuTrash />
            </button>
        </div>
    )}
    
  </div>;
  
};

export default ProfilePhotoSelector;