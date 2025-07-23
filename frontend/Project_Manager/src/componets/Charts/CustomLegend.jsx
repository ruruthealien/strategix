import React from 'react';

const CustomLegend = ({ payload }) => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2 text-sm capitalize">
          <span
            className="inline-block w-3.5 h-3.5 rounded-full border border-black"
            style={{ backgroundColor: entry.color }}
          ></span>
          <span className="text-[#555555] font-medium">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export default CustomLegend;
