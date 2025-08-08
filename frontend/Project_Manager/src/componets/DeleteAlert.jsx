import React from 'react'

const DeleteAlert = ({context, onDelete}) => {
  return (
    <div>
        <p className='text-sm'>{context}</p>
        <div className='flex justify-end mt-6'>
            <button 
            type='button' 
            className='card-btn-fill' 
            onClick={onDelete}> Delete </button>
        </div>
    </div>
  )
}

export default DeleteAlert