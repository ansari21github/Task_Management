
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { RootState } from '../store';

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isAuthenticated);
  
  if (isLoggedIn === true) {
    navigate("/");
  }

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // const response = await fetch('http://localhost:5000/api/users/register', {
      const response = await fetch('https://task-management-backend-j77h.onrender.com/api/users/register', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to register. Please try again!');
      }

      const data = await response.json();
      console.log('Signup Successful:', data);

      // Store the user's email and auth token in localStorage
      localStorage.setItem('userEmail', formData.email);
      localStorage.setItem('authToken', data.authToken);
      console.log(localStorage.getItem('authToken'));

      // Navigate to the login page after successful signup
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="h-[98vh] flex items-center justify-center px-4">
      <div className="p-4 w-full max-w-md rounded bg-gray-800">
        <form onSubmit={handleSubmit}>
          <div className="text-2xl font-semibold text-white mb-4">Signup</div>
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
              Signup
            </button>
            <Link to="/login" className="text-gray-400 hover:text-gray-200">
              Already have an account? Login here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
