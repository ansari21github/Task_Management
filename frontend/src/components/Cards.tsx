

import React from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoAddCircleSharp } from "react-icons/io5";
import axios from 'axios';

interface CardsProps {
    home: string;
    setInputDiv?: React.Dispatch<React.SetStateAction<string>>;
    data?: { id: number; title: string; description: string; status: boolean }[];
    setUpdatedData?: React.Dispatch<React.SetStateAction<{ id: number; title: string; description: string } | null>>;
}

const Cards: React.FC<CardsProps> = ({ home, setInputDiv, data, setUpdatedData }) => {
    const headers = { authorization: `Bearer ${localStorage.getItem('authToken')}` };

    const handleCompletedTask = async (id: number, currentStatus: boolean) => {
        try {
            const newStatus = !currentStatus;
            // await axios.patch(`http://localhost:5000/api/tasks/${id}/status`, { status: newStatus }, { headers });
            await axios.patch(`https://task-management-backend-j77h.onrender.com/api/tasks/${id}/status`, { status: newStatus }, { headers });

        } catch (error) {
            console.log(error);
        }
    };

    const handleUpdate = async (id: number, title: string, description: string) => {
        setUpdatedData?.({ id: id, title: title, description: description });
        setInputDiv?.("fixed");
    };

    const deleteTask = async (id: number) => {
        try {
            // await axios.delete(`http://localhost:5000/api/tasks/${id}`, { headers });
            await axios.delete(`https://task-management-backend-j77h.onrender.com/api/tasks/${id}`, { headers });

        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {data && data.map((items, i) => (
                <div key={i} className="flex flex-col justify-between bg-gray-800 rounded-sm p-4">
                    <div>
                        <h3 className="text-xl font-semibold">{items.title}</h3>
                        <p className="text-gray-300 my-2">{items.description}</p>
                    </div>
                    <div className="mt-4 w-full flex items-center">
                        <button
                            className={`${items.status ? "bg-green-700" : "bg-red-400"} p-2 rounded w-3/6`}
                            onClick={() => handleCompletedTask(items.id, items.status)}
                        >
                            {items.status ? "Completed" : "Incompleted"}
                        </button>
                        <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                            {home !== "false" && (
                                <button onClick={() => handleUpdate(items.id, items.title, items.description)}>
                                    <FaEdit />
                                </button>
                            )}
                            <button onClick={() => deleteTask(items.id)}>
                                <MdDelete />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
            {home === "true" && setInputDiv && (
                <button
                    onClick={() => setInputDiv("fixed")}
                    className="flex flex-col justify-center items-center bg-gray-800 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300"
                >
                    <IoAddCircleSharp className="text-5xl" />
                    <h2 className="text-2xl mt-4">Add Task</h2>
                </button>
            )}
        </div>
    );
};

export default Cards;
