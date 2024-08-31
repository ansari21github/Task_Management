// src/pages/IncompletedTasks.tsx
import React,{useEffect , useState} from 'react';
import axios from 'axios';
import Cards from '../components/Cards';
const IncompletedTasks: React.FC = () => {
    const [data, setData] = useState([])
    const headers = {authorization: `Bearer ${localStorage.getItem('authToken')}`}
    useEffect(()=>{
        const fetch = async () => {
        //    const response = await axios.get("http://localhost:5000/api/tasks/pending",
           const response = await axios.get("https://task-management-backend-j77h.onrender.com/api/tasks/pending",

            {headers,}
           ); 
        console.log(response.data)
        setData(response.data)
        };
        fetch();
    });
    return <div>
        <Cards home={"false"} data={data}/>
        </div>;
};

export default IncompletedTasks;