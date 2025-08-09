import React, { useEffect, useState } from 'react'
import DashboardLayout from '../../componets/layout/DashboardLayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../componets/Cards/UserCard';
import toast from 'react-hot-toast';

const ManageUsers = () => {
  const [allUsers, setAllUsers] = useState([]);
  const getAllUsers = async () => {
    try {
      // Fix: Remove trailing slash from API path to avoid redirect issues
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS.replace(/\/$/, ''));
      console.log("API response users:", response.data); // Debug log to check user data structure
      if(response.data?.length > 0)
      {
        setAllUsers(response.data);
      }
    } catch (error) {
      console.error("Error Fetching Users", error);
    }
  };
 
  // Download task report
  const handleDownloadReport = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.REPORT.EXPORT_USERS,{
        responseType: 'blob', // blob: binary large object data
      });

      // create url for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading users details:", error);
      toast.error("Failed to download users details. Please try again.");
    }
  };

  useEffect(() => {
    getAllUsers();
    return () => {};
  }, []);
  
  return (
    <DashboardLayout activeMenu="Team Members">
      <div className='mt-5 mb-10'>
        <div className='flex md:flex-row md:items-center justify-between'>
          <h2 className='text-xl md:text-xl font-medium text-[#893941]'> Team Members </h2>

          <button className='item-center gap-3 text-[15px] font-semibold md:text[13px] bg-[#d4d994] text-[#536623] px-2 md:px-3 py-2 rounded border hover:bg-[#d2d96d] hover:text-[#3d4d1a] cursor-pointer flex md:flex' onClick={handleDownloadReport}> 
            <LuFileSpreadsheet className="text-lg" />
            Download Report </button>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-4'>
          {allUsers?.map((user) => (
            <UserCard key={user._id} userInfo={user} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default ManageUsers
