// frontend/src/pages/Signup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout'; // Assuming AuthLayout.jsx is in the same directory

function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/signup', 
                formData
            );
            
            console.log(response.data.message);
            alert('Registration successful! Please log in.');
            navigate('/login'); // Redirect to login page

        } catch (error) {
            // Handle error messages from the backend
            alert(error.response.data.error || 'Registration failed');
        }
    };

    return (
        <AuthLayout formType="signup">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inputs with basic styling for visual structure */}
                <input type="text" name="name" placeholder="Name" onChange={handleChange} required 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-150"
                >
                    Sign Up
                </button>
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-medium">Log In</Link>
            </p>
        </AuthLayout>
    );
}

export default Signup;