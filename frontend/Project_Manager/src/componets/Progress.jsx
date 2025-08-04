import React from "react";

const Progress = ({ status, progress }) => {
  const getColor = () => {
    switch (status) {
      case "complete":
        return "bg-[#94c3aa] text-[#1d5e20] border border-[#000000]";
      case "in-progress":
        return "bg-[#dcc68c] text-[#1d5e20] border border-[#000000]";
      case "pending":
        return "bg-[#92a5bd] text-[#1d5e20] border border-[#000000]";
      default:
        return "bg-[#f9d6d5] text-[#8c3d3b] border border-[#f1bfbf]";
    }
  };

  return(
    <div className="w-full bg-[#ea8e9c] rounded-full b-1.5">
        <div
             className={`${getColor()} h-1.5 rounded-full text-xs font-medium`}
             style={{width: `${progress}%`}}>

        </div>
    </div>
  ) 
};

export default Progress;
