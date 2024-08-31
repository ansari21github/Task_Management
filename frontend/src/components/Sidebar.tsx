// src/components/Sidebar.tsx
import React, { useEffect, useState } from 'react';
import { CgNotes } from "react-icons/cg";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
const Sidebar: React.FC = () => {
   
    const data = [
        {
            title: "All tasks",
            icon: <CgNotes />,
            link: "/"
        },
        {
            title: "Completed tasks",
            icon: <FaCheckDouble />,
             link: "/completed"
        },
        {
            title: "Incompleted tasks",
            icon: <TbNotebookOff />,
             link: "/incomplete"
        },
    ];
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('userEmail');
        localStorage.removeItem('authToken');
        navigate("/login")
    }
    return (
        <>
            <div>
            <h2 className="text-xl font-semibold">Task Management</h2>
            <h4 className="mb-1 text-gray-400">{localStorage.getItem('userEmail')}</h4>
            <hr/>
        </div>
        <div>
            {data.map((items,i)=>
            <Link to={items.link} key={i} className="my-2 flex items-center hover:bg-gray-500 p-2 rounded transition-all duration-300">
               {items.icon}&nbsp; {items.title}
            </Link>)}
        </div>
        <div>
            <button onClick={logout} className="bg-gray-600 w-full p-2 rounded">Logout</button>
        </div>
        </>
    );
};

export default Sidebar;

