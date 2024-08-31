import React from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { authActions } from '../store/auth';
import { useDispatch } from 'react-redux';
interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DropdownMenu: React.FC<DropdownMenuProps> = ({ isOpen, onClose }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(authActions.logout());
        localStorage.removeItem('userEmail');
        localStorage.removeItem('authToken');
        navigate("/login")
    }
  return (
    <div className={`fixed top-0 left-0 w-full h-full bg-gray-800 text-white z-30 ${isOpen ? 'block' : 'hidden'}`}>
      <div className="flex justify-between p-4">
        <h1 className="text-xl font-bold">Menu</h1>
        <button onClick={onClose} className="text-gray-400 hover:text-white">
          <FaTimes size={24} />
        </button>
      </div>
      <nav className="flex flex-col p-4">
        <Link to="/" onClick={onClose} className="my-2 flex items-center hover:bg-gray-500 p-2 rounded transition-all duration-300">All Tasks</Link>
        <Link to="/completed" onClick={onClose} className="my-2 flex items-center hover:bg-gray-500 p-2 rounded transition-all duration-300">Completed Tasks</Link>
        <Link to="/incomplete" onClick={onClose} className="my-2 flex items-center hover:bg-gray-500 p-2 rounded transition-all duration-300">Incompleted Tasks</Link>
        <button onClick={logout} className="bg-gray-600 w-full p-2 rounded">Logout</button>
      </nav>
    </div>
  );
};

export default DropdownMenu;
