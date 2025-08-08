import React from 'react'

const StatCard = ({label, count, status}) => {
  const getStatusTagColor =() => {
     switch (status) {
      case "Completed":
        return "bg-[#94c3aa] text-[#1d5e20] border border-[#000000]";
      case "In-Progress":
        return "bg-[#dcc68c] text-[#1d5e20] border border-[#000000]";
      case "Pending":
        return "bg-[#92a5bd] text-[#1d5e20] border border-[#000000]";
      default:
        return "bg-[#f9d6d5] text-[#8c3d3b] border border-[#f1bfbf]";
     }
  };
    return (
    <div className={`flex-1 text-[12px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded-2xl`}>
        <span className='text-[14px] font-semibold'> {count} </span> <br /> {label}
    </div>
  )
}

export default StatCard;