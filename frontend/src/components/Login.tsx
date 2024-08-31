

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../store/auth';
import { RootState } from '../store';

const Login: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);

  if (isLoggedIn === true) {
    navigate("/");
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // const response = await fetch('http://localhost:5000/api/users/login', {
      const response = await fetch('https://task-management-backend-j77h.onrender.com/api/users/login', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Invalid login credentials!');
      }

      const data = await response.json();
      console.log('Login Successful:', data);

      // Store the user's email and auth token in localStorage
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('authToken', data.token);
      dispatch(authActions.login());
      console.log(localStorage.getItem('authToken'));
      navigate('/'); 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center px-4">
      <div className="p-4 w-full max-w-md rounded bg-gray-800">
        <form onSubmit={handleSubmit}>
          <div className="text-2xl font-semibold text-white mb-4">Login</div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-gray-700 px-3 py-2 my-3 w-full rounded text-white"
          />
          <div className="w-full flex flex-col md:flex-row items-center justify-between">
            <button type="submit" className="bg-blue-400 font-semibold text-black px-3 py-2 rounded mb-3 md:mb-0">
              Login
            </button>
            <Link to="/signup" className="text-gray-400 hover:text-gray-200">
              Not having an account? Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
