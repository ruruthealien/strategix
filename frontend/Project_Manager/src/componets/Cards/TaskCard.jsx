import React from "react";
import Progress from "../Progress";
import AvatarGroup from "../AvatarGroup";
import { LuPaperclip } from "react-icons/lu";
import moment from "moment";
const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedTodoCount,
  todoChecklist,
  onClick,
}) => {
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

  const getPriorityTabColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-[#f5b3b3] text-[#7a1a1a] border border-[#a13d3d]"; // richer red
      case "medium":
        return "bg-[#f5c973] text-[#5a3b00] border border-[#c99e28]"; // deeper amber
      case "low":
        return "bg-[#9fd9b5] text-[#1d4d3a] border border-[#4fa17a]"; // deeper mint/green
      default:
        return "bg-[#dcdcdc] text-[#333333] border border-[#b0b0b0]";
    }
  };

  return (
    // for status 
    <div className="bg-[#fceeee] rounded-xl py-4 shadow-md shadow-gray-300 border border-black cursor-pointer" onClick={onClick}>
      <div className="flex items-end gap-3 px-4">
        <div
          className={`text-[11px] font-medium  ${getStatusTagColor(status)} px-4 py-0.5 rounded`}
        >
          {" "}
          {status}{" "}
        </div>

        {/* for priority */}  
        <div
          className={`text-[11px] font-medium ${getPriorityTabColor(priority)} px-4 py-0.5 rounded`}
        >
          {" "}
          {priority}{" "}
        </div>
      </div>

        {/* for checklist */}
      <div
        className={`px-4 border-l-[3px] ${
          status === "in-progress"
            ? "border-[#bc973a]"
            : status === "completed"
            ? "border-[#28b76b]"
            : "border-[#d32a25]"
        }`}
      >
        <p className="text-sm font-medium text-red-950 mt-4 line-clamp-2"> {title} </p>
        <p className="text-xs text-red-900 mt-1.5 leading-[18px]"> {description} </p>
        <p className="text-[13px] text-gray-700/80 font-medium mt-2 mb-2 leading-[18px]">
          {" "}
          Task Done:{" "}
          <span className="font-semibold text-gray-700">
            {completedTodoCount} / {todoChecklist.length || 0}
          </span>
        </p>
    
        <Progress progress={progress} status={status} />
      </div>

        {/* for Starting date and due date */}
      <div className="px-4">
        <div className="flex items-center justify-between my-1">
          <div>
            <label className="text-xs text-gray-800">Start Date</label>
            <p className="text-[13px] font-medium text-gray-900">{moment(createdAt).format("Do MMMM YYYY")}</p>
          </div>
          <div>
            <label className="text-xs text-gray-800">Due Date</label>
            <p className="text-[13px] font-medium text-gray-900">{moment(dueDate).format("Do MMMM YYYY")}</p>
          </div>
        </div>

        {/* for assigned user's avatar */}
        <div className="flex items-center justify-between mt-3">
          <AvatarGroup avatars={assignedTo || []} />
          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 bg-[#d7dc89] border border-black px-2.5 py-1.5 rounded-lg">
              <LuPaperclip className="text-[#5e6623]" /> {" "}
              <span className="text-xs text-gray-800">{attachmentCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
