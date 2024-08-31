

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { RxCross2 } from "react-icons/rx";

interface InputDataProps {
    InputDiv: string;
    setInputDiv: React.Dispatch<React.SetStateAction<string>>;
    updatedData?: { id: number; title: string; description: string } | null;
    setUpdatedData?: React.Dispatch<React.SetStateAction<{ id: number; title: string; description: string } | null>>;
}

const InputData: React.FC<InputDataProps> = ({ InputDiv, setInputDiv, updatedData, setUpdatedData }) => {
    const [Data, setData] = useState({ title: "", description: "" });

    useEffect(() => {
        if (updatedData) {
            setData({
                title: updatedData.title,
                description: updatedData.description
            });
        }
    }, [updatedData]);

    const change = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData({ ...Data, [name]: value });
    };

    const headers = { authorization: `Bearer ${localStorage.getItem('authToken')}` };

    const submitData = async () => {
        if (Data.title === "" || Data.description === "") {
            alert("All fields are required");
        } else {
            // await axios.post("http://localhost:5000/api/tasks", Data, { headers });
            await axios.post("https://task-management-backend-j77h.onrender.com/api/tasks", Data, { headers });

            setData({ title: "", description: "" });
            setInputDiv("hidden");
        }
    };

    const UpdateTask = async () => {
        if (!updatedData || !updatedData.id) {
            alert("Invalid task data");
            return;
        }

        if (Data.title === "" || Data.description === "") {
            alert("All fields are required");
        } else {
            try {
                // await axios.put(`http://localhost:5000/api/tasks/${updatedData.id}`, Data, { headers });
                await axios.put(`https://task-management-backend-j77h.onrender.com/api/tasks/${updatedData.id}`, Data, { headers });

                setData({ title: "", description: "" });
                setInputDiv("hidden");
                if (setUpdatedData) {
                    setUpdatedData(null);
                }
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <div className={`${InputDiv} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
            <div className={`${InputDiv} fixed top-0 left-0 flex items-center justify-center h-screen w-full`}>
                <div className="w-11/12 sm:w-3/4 md:w-2/4 lg:w-2/6 bg-gray-900 p-4 rounded shadow-lg">
                    <div className="flex justify-end">
                        <button
                            onClick={() => {
                                setInputDiv("hidden");
                                setData({ title: "", description: "" });
                                if (setUpdatedData) {
                                    setUpdatedData(null);
                                }
                            }}
                            className="text-2xl"
                        >
                            <RxCross2 />
                        </button>
                    </div>
                    <input
                        type="text"
                        placeholder="Title"
                        name="title"
                        value={Data.title}
                        onChange={change}
                        className="px-3 py-2 rounded w-full bg-gray-700 my-3"
                    />
                    <textarea
                        name="description"
                        cols={30}
                        rows={5}
                        placeholder="Description..."
                        value={Data.description}
                        onChange={change}
                        className="px-3 py-2 rounded w-full bg-gray-700 my-3"
                    ></textarea>
                    {updatedData === null ? (
                        <button onClick={submitData} className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold w-full">
                            Submit
                        </button>
                    ) : (
                        <button onClick={UpdateTask} className="px-3 py-2 bg-blue-400 rounded text-black text-xl font-semibold w-full">
                            Update
                        </button>
                    )}
                </div>
            </div>
        </>
    );
};

export default InputData;
