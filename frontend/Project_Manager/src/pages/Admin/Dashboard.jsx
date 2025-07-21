import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../componets/layout/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';

const Dashboard = () => {
  useUserAuth();
  const {user} = useContext(UserContext);

  const navigate = useNavigate();

 const [dashboardData, setDashboardData] = useState(null);
 const [pieChartData, setPieChartData] = useState([]);
 const [barChartData, setBarChartData] = useState([]);


const getDashboardData = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
    if(response.data)
    {
      setDashboardData(response.data);
    }
  }catch (error)
  {
    console.error("Error fetching users:", error);
  }
};

useEffect(() => {
  getDashboardData();

  return () => { 
  };
}, []);

  return <DashboardLayout activeMenu="Dashboard" className='text-black'>{JSON.stringify(dashboardData)}
  </DashboardLayout>;
};

export default Dashboard;