import React from 'react'
import moment from 'moment';
const TaskListTable = ({ tableData }) => {
    // Function to get badge color based on task status
    // Function to get badge color based on task priority
    const getStatusBadgeColor = (status) => {
        switch (status) {
            case 'complete':
                return 'bg-[#94c3aa] text-[#1d5e20] border border-[#000000]';
             case 'in-progress':
                return 'bg-[#dcc68c] text-[#1d5e20] border border-[#000000]';
             case 'pending':
                return 'bg-[#92a5bd] text-[#1d5e20] border border-[#000000]';
            default:
                return 'bg-[#f9d6d5] text-[#8c3d3b] border border-[#f1bfbf]';      
        }
    };

    const getPriorityBadgeColor = (priority) => {
  switch (priority) {
    case 'high':
      return 'bg-[#f5b3b3] text-[#7a1a1a] border border-[#a13d3d]'; // richer red
    case 'medium':
      return 'bg-[#f5c973] text-[#5a3b00] border border-[#c99e28]'; // deeper amber
    case 'low':
      return 'bg-[#9fd9b5] text-[#1d4d3a] border border-[#4fa17a]'; // deeper mint/green
    default:
      return 'bg-[#dcdcdc] text-[#333333] border border-[#b0b0b0]';
  }
};


  
    return (
        <div className='overflow-x-auto p-0 rounded-lg mt-3'>
            <table className='min-w-full'>
                <thead>
                    <tr className='text-left'>
                        <th className='py-3 px-4 text-gray-600 text-[13px] font-medium'>Name</th>
                        <th className='py-3 px-4 text-gray-600 text-[13px] font-medium'>Status</th>
                        <th className='py-3 px-4 text-gray-600 text-[13px] font-medium'>Priority</th>
                        <th className='py-3 px-4 text-gray-600 text-[13px] font-medium hidden md:table-cell'>Created on</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((task) => (
                        <tr key={task._id} className='border-t border-[#893941] '>
                            <td className='my-3 mx-4 text-black text-[13px] line-clamp-1 overflow-hidden'>{task.title}</td>
                            <td className='py-4 px-4'>
                                <span className={`px-2 py-1 text-xs rounded inline-block ${getStatusBadgeColor(task.status)}`}>{task.status}</span>
                            </td>
                            <td className='py-4 px-4'>
                                <span className={`px-2 py-1 text-xs rounded inline-block ${getPriorityBadgeColor(task.priority)}`}>{task.priority}</span>
                            </td>
                            <td className='py-4 px-4 text-black text-nowrap hidden md:table-cell text-[13px]'>{task.createdAt ? moment(task.createdAt).format('Do MMM YYYY') : 'N/A'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
   
  )
}

export default TaskListTable