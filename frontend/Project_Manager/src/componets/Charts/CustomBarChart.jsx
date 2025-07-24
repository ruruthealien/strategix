import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
} from 'recharts';

const CustomBarChart = ({ data }) => {

    // Color mapping based on priority
    const getBarColor = (entry) => {
        switch (entry?.priority) {
            case 'high':
                return '#f5b3b3'; // soft red
            case 'medium':
                return '#f5c973'; // soft yellow
            case 'low':
                return '#9fd9b5'; // soft green
            default:
                return '#dcdcdc'; // grey fallback
        }
    };

    // Custom tooltip component
    const CustomToolTip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            return (
                <div className='bg-[#fceeee] border border-[#dbaaaa] px-4 py-2 rounded-lg shadow-md'>
                    <p className='text-[#3b3b3b] font-semibold capitalize mb-1'>
                        {payload[0].payload.priority}
                    </p>
                    <p className='text-[#5e5e5e] font-medium flex items-center gap-x-1'>
                        Count:
                        <span className='text-[#a33434] font-bold'>
                            {payload[0].payload.count}
                        </span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className='mt-4'>
            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid stroke="#ccc" />
                    <XAxis
                        dataKey="priority"
                        tick={{ fill: '#3b3b3b', fontSize: 12 }}
                        stroke="#000"
                    />
                    <YAxis
                        tick={{ fill: '#3b3b3b', fontSize: 12 }}
                        stroke="#000"
                    />
                    <Tooltip content={<CustomToolTip />} cursor={{ fill: "transparent" }} />
                    <Bar dataKey="count"  radius={[10, 10, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry)}
                            stroke="#000" rounded   />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomBarChart;
