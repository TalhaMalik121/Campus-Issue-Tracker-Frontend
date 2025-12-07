// frontend/src/pages/Login.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AuthLayout from './AuthLayout'; // Assuming AuthLayout.jsx is in the same directory

// The onLoginSuccess prop will be passed from App.jsx to update the main state
function Login({ onLoginSuccess }) { 
    const [formData, setFormData] = useState({
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
                'http://localhost:3000/api/auth/login', 
                formData
            );
            
            // Success! Store the token
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            // Crucial: Update the parent state to trigger full app rendering
            if (onLoginSuccess) onLoginSuccess(); 

            alert(`Welcome back, ${user.name}!`);
            navigate('/'); // Redirect to main issue tracker page

        } catch (error) {
            alert(error.response.data.error || 'Login failed');
        }
    };

    return (
        <AuthLayout formType="login">
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Inputs with basic styling for visual structure */}
                <input type="email" name="email" placeholder="Email" onChange={handleChange} required 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <input type="password" name="password" placeholder="Password" onChange={handleChange} required 
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <button type="submit"
                    className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-150"
                >
                    Log In
                </button>
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
                Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-medium">Sign Up</Link>
            </p>
        </AuthLayout>
    );
}

export default Login;