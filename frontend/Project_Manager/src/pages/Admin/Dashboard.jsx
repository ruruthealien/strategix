import React from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import { useContext } from 'react';
import { UserContext } from '../../context/userContext';
import DashboardLayout from '../../componets/layout/DashboardLayout';

const Dashboard = () => {
  useUserAuth();
  const {user} = useContext(UserContext);
  return <DashboardLayout activeMenu="Dashboard" className='text-black'>Dashboard
  </DashboardLayout>;
};

export default Dashboard;