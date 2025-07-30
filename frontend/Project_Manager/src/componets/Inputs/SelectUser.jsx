import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { LuUsers } from "react-icons/lu";
import Model from "../Model";

const SelectUser = ({ selectedUsers, setSelectedUsers }) => {
  const [allUsers, setAllUsers] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [tempSelectUsers, setTempSelectUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS);
      setAllUsers(response.data);
      console.log(allUsers)
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const toggleUserSelection = (userId) => {
    setTempSelectUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

   const handleAssign = () => {
    setSelectedUsers(tempSelectUsers);
    setIsModelOpen(false);
  };

  const selectedUserAvatars = allUsers
  .filter((user) => Array.isArray(selectedUsers) && selectedUsers.includes(user._id))
  .map((user) => user.profileImage);

  useEffect(() => {
    getAllUsers();
    if (selectedUsers.length === 0) {
      setTempSelectUsers([]);
    }

    return () => {};
  }, [selectedUsers]);

  return (
    <div className="space-y-2 mt-2">
      {selectedUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setIsModelOpen(true)}>
          <LuUsers className="text-sm" /> Add Members
        </button>
      )}

      <Model
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        title="Select Users">
        
        <div className="space-y-4 h-[60vh] overflow-auto">
          {allUsers.map((user) => (
            <div 
              key={user._id}  
              className="flex items-center gap-4 p-3 border-b border-gray-200">
              
              <img 
                src={user.profileImageUrl} 
                alt={user.name} 
                className="w-10 h-10 rounded-full" />
              
              <div className="flex-1">
                <p className="font-medium text-gray-800 ">{user.name}</p>
                <p className="text-[13px] text-gray-600 ">{user.email}</p>
              </div>

              <input
                type="checkbox"
                checked= {tempSelectUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className="w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none"/>
            </div>
          ))}
        </div>
      </Model>
    </div>
  );
};

export default SelectUser;
