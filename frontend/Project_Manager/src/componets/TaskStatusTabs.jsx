import React from 'react'

const TaskStatusTabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className='my-2'>
        <div className='flex'>
            {tabs.map((tab) => (
                <button 
                    key={tab.label}
                    className={`relative px-3 md:px-4 py-2 text-sm font-medium ${activeTab === tab.label
                        ? 'text-[#893941]'
                        : 'text-[#5e6623] hover:text-gray-700'
                    } cursor-pointer`}
                    onClick={() => setActiveTab(tab.label)}>
                    
                    <div className='flex items-center'>
                        <span className='text-[12px]'>{tab.label}</span>
                        <span
                            className={`text-[12px] ml-2 px-2 py-0.5 rounded-full ${
                                activeTab === tab.label
                                ? 'bg-[#893941] text-[#f1c7ce]'
                                : 'bg-[#5e6623] text-[#d4d994]'
                            }`}
                        >
                            {tab.count}
                        </span>
                    </div>
                    {activeTab === tab.label && (
                        <div className='absolute bottom-0 left-0 w-full h-0.5 bg-[#893941]'></div>
                    )}
                </button>
            ))}
        </div>
    </div>
  )
}

export default TaskStatusTabs