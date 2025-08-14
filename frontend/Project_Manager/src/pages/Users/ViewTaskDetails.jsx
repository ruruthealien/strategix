import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import DashboardLayout from "../../componets/layout/DashboardLayout";

const ViewTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "complete":
        return "bg-[#94c3aa] text-[#1d5e20] border border-[#000000]";
      case "in-progress":
        return "bg-[#dcc68c] text-[#1d5e20] border border-[#000000]";
      case "pending":
        return "bg-[#92a5bd] text-[#1d5e20] border border-[#000000]";
      default:
        return "bg-[#f9d6d5] text-[#8c3d3b] border border-[#f1bfbf]";
    }
  };

  // Get task info by ID
  const getTaskInfoByID = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(id)
      );
      if (response.data) {
        setTask(response.data);
      } else {
        console.warn("No task found for ID:", id);
      }
    } catch (error) {
      console.error("Error fetching task:", error);
    }
  };

  // Handle todo checklist
  const updateTodoChecklist = async (index) => {
    // Logic to update the checklist
  };

  // Handle attachment link click
  const handleLinkClick = (link) => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskInfoByID();
    }
  }, [id]);

      return (
      <DashboardLayout activeMenu="My Tasks">
        <div className="mt-5">
          {task ? (
            <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
              <div className="bg-[#fceeee] p-6 rounded-xl shadow-md border border-gray-300 col-span-3 w-full space-y-5">
                {/* Title */}
                <h2 className="text-xl font-bold">{task.title}</h2>

                {/* Status + Priority */}
                <div className="flex items-center justify-between">
                  <span
                    className={`status-tag ${getStatusTagColor(task.status)}`}
                  >
                    {task.status}
                  </span>
                  <span className="text-gray-500">{task.priority}</span>
                </div>

                {/* Task Info */}
                <div className="mt-4 space-y-3">
                  <InfoBox
                    label="Description"
                    value={task.description || "No description"}
                  />
                  <InfoBox
                    label="Due Date"
                    value={
                      task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "N/A"
                    }
                  />
                  <InfoBox
                    label="Assigned To"
                    value={
                      task.assignedTo?.length
                        ? task.assignedTo.map((user) => user.name).join(", ")
                        : "N/A"
                    }
                  />
                </div>

                {/* Todo Checklist */}
                <div className="mt-4">
                  <h3 className="font-semibold">Todo Checklist</h3>
                  {task.todoChecklist?.length ? (
                    <ul className="list-disc pl-5 space-y-2">
                      {task.todoChecklist.map((item, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={item.completed}
                            onChange={() => updateTodoChecklist(index)}
                          />
                          <span>{item.text}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No checklist items</p>
                  )}
                </div>

                {/* Attachments */}
                <div className="mt-4">
                  <h3 className="font-semibold">Attachments</h3>
                  {task.attachments?.length ? (
                    <ul className="list-disc pl-5 space-y-1">
                      {task.attachments.map((link, index) => (
                        <li key={index}>
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              handleLinkClick(link);
                            }}
                            className="text-blue-600 underline"
                          >
                            {link}
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-500">No attachments</p>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Loading task details...</p>
          )}
        </div>
      </DashboardLayout>
      );
};

export default ViewTaskDetails;
