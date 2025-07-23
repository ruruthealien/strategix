import React from 'react';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0];

    return (
      <div className="rounded-xl bg-[#fdf1f1] border border-[#c88b8b] px-4 py-3 shadow-lg min-w-[150px]">
        <p className="text-sm text-[#893941] font-semibold mb-1 tracking-wide">
          {label}
        </p>
        <div className="text-sm text-[#555]">
          <p className="capitalize">
            Status: <span className="font-medium">{data.name}</span>
          </p>
          <p className="capitalize mt-1">
            Count: <span className="font-bold text-[#893941]">{data.value}</span>
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
