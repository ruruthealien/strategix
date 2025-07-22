import React from "react";

const InfoCard = ({icon, label, value, color}) => {
  return (
    <div className="flex items-center gap-3">
      <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full ${color}`} />
      <p className="text-xs md:test-[14px] text-[#287b0f]">
        <span className="text-sm md:text-[15px] text-black font-semibold">
          {value}
        </span>
        {label}
      </p>
    </div>
  );
};

export default InfoCard;
