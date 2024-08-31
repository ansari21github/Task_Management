

import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import DropdownMenu from '../components/DropdownMenu';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';

const Home: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdownMenu = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="h-[98vh] flex flex-col md:flex-row">
      
      <div className="md:hidden flex justify-between items-center p-4 bg-gray-800 text-white">
        <button onClick={toggleDropdownMenu} className="text-gray-400 hover:text-white">
          <FaBars size={24} />
        </button>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold">Task Management</h1>
          <h2 className="mb-1 text-gray-400">{localStorage.getItem('userEmail')}</h2>
        </div>
      </div>

      
      <DropdownMenu isOpen={isDropdownOpen} onClose={() => setIsDropdownOpen(false)} />

      
      <div className="hidden md:flex md:flex-col md:w-1/6 border border-gray-500 rounded-xl p-4 h-full justify-between">
        <Sidebar />
      </div>

     
      <div className="w-full md:w-5/6 border border-gray-500 rounded-xl p-4 flex-1 mt-12 md:mt-0">
        <Outlet />
      </div>
    </div>
  );
};

export default Home;






