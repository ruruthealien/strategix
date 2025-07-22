import React, { useState, useEffect } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import moment from "moment";
import InfoCard from "../../componets/Cards/InfoCard";
import { addThousandsSeparator } from "../../utils/helper";

const Dashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_DASHBOARD_DATA
      );

      console.log("Dashboard statistics:", response.data.statistics);

      if (response.data) {
        setDashboardData(response.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5 ">
        <div className="">
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl text-[#893941]"> Good to See You again!! {user?.name}</h2>
            <p className="text-xs md:text-[13px] text-[#8f6c6c] mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5 ">
          <InfoCard
            label=" Total Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.all || 0
            )}
            color="bg-[#A48AD4] border-gray-500 border-2 "
          />

          <InfoCard
            label=" Pending Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.pending || 0
            )}
            color="bg-[#7BAFD4] border-gray-500 border-2"
          />

          <InfoCard
            label=" In Progress Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.["in-progress"] || 0
            )}
            color="bg-[#E3C16F] border-gray-500 border-2"
          />

          <InfoCard
            label=" Completed Tasks"
            value={addThousandsSeparator(
              dashboardData?.charts?.taskDistribution?.complete || 0
            )}
            color="bg-[#6FCF97] border-gray-500 border-2"
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
