import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user?.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
  }, [user]);

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-[#ae6e78] border-r border-[#893941] sticky top-[61px] z-20">
      {/* Profile Section */}
      <div className="flex flex-col items-center justify-center mb-7 pt-5 ">
        <div className="relative">
          <img
            src={user?.profileImageUrl || "/default-profile.png"}
            alt="Profile Image"
            className="w-25 h-25 rounded-full object-cover border-2 border-white"
          />
        </div>

        {user?.role === "admin" && (
          <div className="text-[12px] font-semibold text-white bg-[#893941] px-3 py-0.5 rounded mt-2.5 ">
            Admin
          </div>
        )}

        <h5 className="text-white font-semibold text-[20px] leading-6 mt-3">
          {user?.name || "User"}
        </h5>
        <p className="text-[12px] text-white/80">{user?.email || ""}</p>
      </div>

      {/* Side Menu Items */}
      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] transition-all duration-200 px-6 py-3 mb-1
            rounded-l-full 
            ${
              activeMenu === item.label
                ? "bg-[#D4D994] text-[#5E6623] font-semibold shadow-md"
                : "text-white hover:bg-[#893941] hover:text-[#D4D994]"
            }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
