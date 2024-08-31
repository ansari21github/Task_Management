// src/pages/AllTasks.tsx
import React,{useEffect, useState} from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
import { IoAddCircleSharp } from "react-icons/io5";
import InputData from '../components/InputData';
const AllTasks: React.FC = () => {
    const [data, setData] = useState([])
    const [updatedData, setUpdatedData] = useState<{ id: number; title: string; description: string } | null>(null);
    const [InputDiv, setInputDiv] = useState<string>("hidden");

    const headers = {authorization: `Bearer ${localStorage.getItem('authToken')}`}
    useEffect(()=>{
        const fetch = async () => {
        //    const response = await axios.get("http://localhost:5000/api/tasks",
           const response = await axios.get("https://task-management-backend-j77h.onrender.com/api/tasks",

            {headers,}
           ); 
        console.log(response.data)
        setData(response.data)
        };
        if(localStorage.getItem("authToken")){
            fetch();
        }
        
    });
    // console.log(data)
    return (
        <>
        <div>
<div className="w-full flex justify-end px-4 py-2">
    <button onClick={()=>setInputDiv("fixed")}>
    <IoAddCircleSharp className="text-4xl text-gray-300 hover:text-gray-100 transition-all duration-300"/> 
    </button>
</div>
<Cards home={"true"} setInputDiv={setInputDiv} data={data} setUpdatedData={setUpdatedData} />
        </div>
        <InputData InputDiv={InputDiv} setInputDiv={setInputDiv}  updatedData={updatedData} setUpdatedData={setUpdatedData} />
        </>
    )
};

export default AllTasks;