import React from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



const Navbar = ({ isShrunk }) => {

  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:3005/logout", {}, { withCredentials: true });
      if (response.status === 200) {
        localStorage.clear();
        navigate("/");
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div
      className={`bg-gray-900 text-white flex justify-between items-center px-4 py-3 transition-all duration-300 ${isShrunk ? "ml-[80px]" : "ml-[300px]"} ${isShrunk ? "w-[calc(100%-80px)]" : "w-[calc(100%-300px)]"} `}
    >
      <div className="text-2xl font-bold text-[#e82574]">
        Hostel Sync
      </div>
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <button className="btn bg-[#e82574] text-white py-2 px-4 rounded hover:bg-pink-500" onClick={handleLogout}>Logout</button>
          <img src="https://via.placeholder.com/30" alt="Profile" className="w-8 h-8 rounded-full" />
          <span className="font-semibold">warden</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
