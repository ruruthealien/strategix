import React, { useState } from "react";
import DashboardLayout from "../../componets/layout/DashboardLayout";
import { PRIORITY_DATA } from "../../utils/data";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import toast from "react-hot-toast";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { LuTrash2 } from "react-icons/lu";
import SelectDropdown from "../../componets/Inputs/SelectDropdown";
import SelectUser from "../../componets/Inputs/SelectUser";
import TodoListInput from "../../componets/Inputs/TodoListInput";
import AddAttachmentInput from "../../componets/Inputs/AddAttachmentInput";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "low",
    dueDate: null,
    assignedTo: [],
    todoChecklist: [],
    attachments: [],
  });

  const [currentTask, setCurrentTask] = useState(null);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [openDeleteAlert, setOpenDeleteAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const clearData = () => {
    // reset form data
    setTaskData({
      title: "",
      description: "",
      priority: "low",
      dueDate: "", // instead of null
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });
  };

  // create task
  const createTask = async () => {
    setLoading(true);

    try {
      const todoList = taskData.todoChecklist?.map((item) => ({
        text: item,
        complete: false,
      }));

      // assignedTo is already an array of user IDs (strings)
      const assignedToIds = taskData.assignedTo;

      const response = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        priority: taskData.priority.toLowerCase(),
        dueDate: new Date(taskData.dueDate).toISOString(),
        todoChecklist: todoList,
        assignedTo: assignedToIds,
      });

      toast.success("Task created successfully");
      clearData();
    } catch (error) {
      // Properly set error message
      setError(error.response?.data?.message || "Error creating task");
    } finally {
      setLoading(false);
    }
  };

  // Update task
  const updateTask = async () => {};

  const handleSubmit = async () => {
    setError(null);

    // input validation
    if (!taskData.title.trim()) {
      setError("Please enter a title");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Please enter a description");
      return;
    }
    if (!taskData.dueDate) {
      setError("Please enter a due date");
      return;
    }
    if (taskData.assignedTo?.length === 0) {
      setError("Please select at least one task assigned to any member");
      return;
    }
    if (taskData.todoChecklist?.length === 0) {
      setError("Please select at least one task to do");
      return;
    }
    if (taskId) {
      updateTask();
    } else {
      createTask();
    }
  };

  // get task info by id
  const getTaskDetailsbyId = async () => {};

  // delete task
  const deleteTask = async () => {};

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="bg-[#fceeee] p-6 rounded-xl shadow-md border border-gray-300 col-span-3 w-full space-y-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl md:text-xl font-medium text-[#893941]">
                {taskId ? "Update Task" : "Create Task"}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-[#e1c4c7] bg-rose-900 rounded border border-gray-700 px-2 py-1 hover:text-[#ebc6c6] hover:bg-rose-800 transition-all duration-300 cursor pointer"
                  onClick={() => {
                    setOpenDeleteAlert(true);
                  }}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>

            {/* form  title */}
            <div className="mt-4">
              <label className="text-[15px] font-medium text-[#893941]">
                Task Title
              </label>

              <input
                placeholder="Create App UI"
                className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-900"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            {/* Description section */}
            <div className="mt-3">
              <label className="text-[15px] font-medium text-[#893941]">
                Description
              </label>
              <textarea
                placeholder="Describe task"
                className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-1 focus:ring-red-900"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>

            {/*  the row consists of : */}
            <div className="grid grid-cols-12 gap-4 mt-2">
              {/* Priority */}
              <div className="col-span-12 md:col-span-4">
                <label className="text-[15px] font-medium text-[#893941] ">
                  Priority
                </label>
                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Low"
                />
              </div>

              {/* Due Date */}
              <div className="col-span-12 md:col-span-4">
                <label className="text-[15px] font-medium text-[#893941]">
                  Due Date
                </label>
                <input
                  type="date"
                  placeholder="dd-mm-yyyy"
                  className="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md text-sm outline-none focus:ring-1 focus:ring-red-900"
                  value={taskData.dueDate || ""}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                />
              </div>

              {/* Assign To*/}
              <div className="col-span-12 md:col-span-4">
                <label className="text-[15px] font-medium text-[#893941]">
                  Assign To
                </label>
                <SelectUser
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignedTo", value);
                  }}
                />
              </div>
            </div>

            {/* Todo tasks */}
            <div className="mt-3">
              <label className="text-[15px] font-medium text-[#893941]">
                Todo Checklist
              </label>
              <TodoListInput
                todoList={taskData?.todoChecklist}
                setTodoList={(value) => {
                  handleValueChange("todoChecklist", value);
                }}
              />
            </div>

            {/* Add Attachment */}
            <div className="mt-3">
              <label className="text-[15px] font-medium text-[#893941]">
                Add Attachment
              </label>

              <AddAttachmentInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>

            {error && (
              <p className="text-xs font-medium text-red-800 mt-5">{error}</p>
            )}

            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
