
import { Route, Routes } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './pages/Home';
import CompletedTasks from './pages/CompletedTasks';
import IncompletedTasks from './pages/IncompletedTasks';
import AllTasks from './pages/AllTasks';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { RootState } from './store'; 
import { useEffect } from 'react';
import {authActions} from './store/auth';
function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: RootState)=> state.auth.isAuthenticated);
useEffect(()=>{
  if(localStorage.getItem('userEmail') && localStorage.getItem('authToken') ){
    dispatch(authActions.login())
  }
  else if(isLoggedIn === false){
    navigate("/signup")
  }
},[]);
  return (
    <div className='bg-gray-900 text-white h-screen p-2 relative'>
    
     <Routes>
             <Route  path="/" element={<Home/>} >
             <Route index element={<AllTasks/>} />
             <Route path="/completed" element={<CompletedTasks/>} />
             <Route path="/incomplete" element={<IncompletedTasks/>} />
             </Route>
             <Route path="/login" element={<Login/>} />
     <Route path="/signup" element={<Signup/>} />
     
         </Routes>
         
         </div>
  );
}

export default App;
