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
import { LuArrowRight } from "react-icons/lu";
import TaskListTable from "../../componets/TaskListTable";
import CustomPieChart from "../../componets/Charts/CustomPieChart";
import CustomBarChart from "../../componets/Charts/CustomBarChart";

// pending , in-progress, complete
const COLORS = ["#92a5bd", "#dec97d", "#94c3aa"];

const UserDashboard = () => {
  useUserAuth();
  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  // Function to fetch pie chart data
  const prepareChartData = (data) => {
    const taskDistribution = data?.taskDistribution || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    // this is where we prepare the data for the pie chart
    const taskDistributionData = [
      { status: "pending", count: taskDistribution?.pending || 0 },
      { status: "in-progress", count: taskDistribution?.["in-progress"] || 0 },
      { status: "complete", count: taskDistribution?.complete || 0 },
    ];

    setPieChartData(taskDistributionData);

    // this is where we prepare the data for the bar chart
    const PriorityLevelData = [
      { priority: "high", count: taskPriorityLevels?.high || 0 },
      { priority: "medium", count: taskPriorityLevels?.medium || 0 },
      { priority: "low", count: taskPriorityLevels?.low || 0 },
    ];

    setBarChartData(PriorityLevelData);
  };

  // Function to fetch dashboard data
  const getDashboardData = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );

      console.log("Dashboard statistics:", response.data.statistics);

      if (response.data) {
        setDashboardData(response.data);
        prepareChartData(response.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Function to handle "See More" button click
  const onSeeMore = () => {
    navigate("/admin/tasks");
  };

  // useEffect to fetch dashboard data on component mount
  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">

      
      {/* summary info section */}
      <div className="card my-5 ">
        <div className="">
          <div className="col-span-3">
            <h2 className="text-xl md:text-2xl text-[#893941]">
              {" "}
              Good to See You again!! {user?.name}
            </h2>
            <p className="text-xs md:text-[13px] text-[#8f6c6c] mt-1.5">
              {moment().format("dddd Do MMM YYYY")}
            </p>
          </div>
        </div>


      {/* InfoCard */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-6 my-4 md:my-6">
        

        {/* Pie chart */}
        <div>
          <div className="card h-full">
            <div className="flex justify-between items-center">
              <h5 className="text-lg  text-[#893941]"> Task Distribution</h5>
            </div>

            <CustomPieChart 
            data={pieChartData} 
            colors={COLORS} />
          </div>
        </div>


        {/* Bar chart */}
        <div>
          <div className="card h-full">
            <div className="flex justify-between items-center">
              <h5 className="text-lg  text-[#893941]"> Task Priority Levels</h5>
            </div>

            <CustomBarChart 
            data={barChartData} />
          </div>
        </div>


        {/* Recent tasks section */}
        <div className="md:col-span-2">
          <div className="card  ">
            <div className="flex justify-between items-center">
              <h5 className="text-lg  text-[#893941]"> Recent Tasks</h5>

              <button className="card-btn" onClick={onSeeMore}>
                {" "}
                See All <LuArrowRight className="text-base" />
              </button>
            </div>

            <TaskListTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
