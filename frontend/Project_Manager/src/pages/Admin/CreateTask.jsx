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
    todoCheckList: [],
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
      dueDate: "", // instead of mull
      assignedTo: [],
      todoCheckList: [],
      attachments: [],
    });
  };

  // create task
  const createTask = async () => {};

  // Update task
  const updateTask = async () => {};

  const handleSubmit = async () => {};

  // get task info by id
  const getTaskDetailsbyId = async () => {};

  // delete task
  const deleteTask = async () => {};

  return (
    <DashboardLayout activeMenu="Create Task">
      <div className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="bg-[#fceeee] p-6 rounded-xl shadow-md border border-gray-300 col-span-3 w-full space-y-7">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl md:text-xl font-medium text-[#893941]">
                {" "}
                {taskId ? "Update Task" : "Create Task"}{" "}
              </h2>
              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-[#893941] bg-rose-50 rounded border border-rose-200 px-2 py-1 hover:bg-rose-100 transition-all duration-300 cursor pointer"
                  onClick={() => {
                    setOpenDeleteAlert(true);
                  }}
                >
                  <LuTrash2 className="text-base" /> Delete
                </button>
              )}
            </div>

            {/* form  */}
            <div className="mt-4">
              <label className="text-[15px] font-medium text-[#893941]">
                Task Title
              </label>

              <input
                placeholder="Create App UI"
                className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>

            {/* Description section */}
            <div className="mt-3">
              <label className="text-[15px] font-medium text-[#893941]">
                {" "}
                Description
              </label>
              <textarea
                placeholder="Describe task"
                className="w-full mt-1 px-3 py-2 border border-gray-400 rounded-md focus:outline-none focus:ring-2 focus:ring-red-900"
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
                  className="w-full px-3 py-2 mt-1 border border-gray-400 rounded-md text-sm outline-none focus:ring-2 focus:ring-red-900"
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
                 <label className="text-[15px] font-medium text-[#893941]"> TODO Checklist </label> 
                 <TodoListInput
                  todoList={taskData?.todoCheckList}
                  setTodoList={(value) => 
                  {handleValueChange("todoCheckList", value)}}/>
            </div>


          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreateTask;
