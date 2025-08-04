import React, { useEffect, useState } from "react";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuFileSpreadsheet } from "react-icons/lu";
import TaskStatusTabs from "../../componets/TaskStatusTabs";
import TaskCard from "../../componets/Cards/TaskCard";

const ManageTask = () => {
  const [allTask, setAllTask] = useState([]);

  const [tabs, setTabs] = useState([]);
  const [filterStatus, setFilterStatus] = useState("All");

  const navigate = useNavigate();

  // api call to get all tasks
  const getAllTasks = async () => {
    try {
      // Map tab labels to backend status values
      const statusMap = {
        All: "",
        Pending: "pending",
        "In Progress": "in-progress",
        complete: "complete",
      };
      const statusParam = statusMap[filterStatus] || "";

      const response = await axiosInstance.get(API_PATHS.TASKS.GET_ALL_TASKS, {
        params: {
          status: statusParam,
        },
      });

      console.log("API response tasks:", response.data?.tasks); // Debug log to check todoChecklist data

      setAllTask(
        response.data?.tasks && response.data.tasks.length > 0
          ? response.data.tasks
          : []
      );

      // map status summary data with fixed labels and orders (API call to get all tasks)
      const statusSummary = response.data?.statusSummary || {};

      const statusArray = [
        { label: "All", count: statusSummary.all || 0 },
        { label: "Pending", count: statusSummary.pendingTasks || 0 },
        { label: "In Progress", count: statusSummary.inProgressTasks || 0 },
        { label: "complete", count: statusSummary.completedTasks || 0 },
      ];

      setTabs(statusArray);
    } catch (error) {
      console.error("error fetching users", error);
    }
  };
  // handle tab change
  const handleClick = (taskData) => {
    navigate(`/admin/create-task`, { state: { taskId: taskData._id } });
  };

  // download task report
  const handleDownloadReport = async () => {};

  // filter tasks by status
  useEffect(() => {
    getAllTasks(filterStatus);
    return () => {};
  }, [filterStatus]);

  return (
    <DashboardLayout activeMenu="Manage Task">
      <div className="my-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between ">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl md:text-xl font-medium text-[#893941]">
              {" "}
              My Tasks{" "}
            </h2>
            <button
              className="flex item-center gap-3 text-[15px] font-bold md:text[13px] bg-[#d4d994] text-[#536623] px-2 md:px-3 py-2 rounded border hover:bg-[#d2d96d] hover:text-[#3d4d1a] cursor-pointer lg:hidden"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>

          <div className="flex item-center gap-3">
            <TaskStatusTabs
              tabs={tabs}
              activeTab={filterStatus}
              setActiveTab={setFilterStatus}
            />

            <button
              className="md:flex hidden item-center gap-3 text-[15px] font-bold md:text[13px] bg-[#d4d994] text-[#536623] px-2 md:px-3 py-2 rounded border hover:bg-[#d2d96d] hover:text-[#3d4d1a] cursor-pointer"
              onClick={handleDownloadReport}
            >
              <LuFileSpreadsheet className="text-lg" />
              Download Report
            </button>
          </div>
        </div>
      </div>

      {/* display task card in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {allTask?.map((item, index) => (
          <TaskCard
            key={item._id}
            title={item.title}
            description={item.description}
            priority={item.priority}
            status={item.status}
            progress={item.progress}
            createdAt={item.createdAt}
            dueDate={item.dueDate}
            assignedTo={item.assignedTo?.map((user) => user.profileImageUrl)}
            attachmentCount={item.attachments?.length || 0}
            completedTodoCount={item.completedTodoCount || 0}
            todoChecklist={item.todoChecklist || []}
            onClick={() => handleClick(item)}
          />
        ))}
      </div>
    </DashboardLayout>
  );
};

export default ManageTask;
