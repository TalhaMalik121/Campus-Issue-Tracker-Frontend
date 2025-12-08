import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn as LogInIcon } from 'lucide-react';
import AuthLayout from './AuthLayout'; 

// *** MOVED INPUTGROUP OUTSIDE THE MAIN COMPONENT ***
// This prevents it from being redefined on every keystroke, fixing the focus issue.
const InputGroup = ({ name, type, placeholder, icon: Icon, formData, handleChange }) => (
    <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={handleChange} 
            required 
            value={formData[name]} 
            className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500  focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:focus:bg-slate-700 dark:placeholder-gray-400 transition duration-200 shadow-inner"
        />
    </div>
);


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
        // ... (API submission logic remains the same)
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/login', 
                formData
            );
            
            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            
            if (onLoginSuccess) onLoginSuccess(); 

            alert(`Welcome back, ${user.name}!`);
            navigate('/'); 

        } catch (error) {
            alert(error.response.data.error || 'Login failed');
        }
    };

    return (
        <AuthLayout formType="login">
            <form onSubmit={handleSubmit} className="space-y-6">
                <InputGroup name="email" type="email" placeholder="Email Address" icon={Mail} formData={formData} handleChange={handleChange} />
                <InputGroup name="password" type="password" placeholder="Password" icon={Lock} formData={formData} handleChange={handleChange} />
                
                <button type="submit"
                    className="w-full py-3.5 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl transition duration-200 shadow-lg hover:shadow-xl shadow-indigo-500/50"
                >
                    <LogInIcon className="w-5 h-5" />
                    <span>Log In</span>
                </button>
            </form>
            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Don't have an account? <Link to="/signup" className="text-indigo-600 hover:text-indigo-500 font-semibold transition duration-150">Sign Up Now</Link>
            </p>
        </AuthLayout>
    );
}

export default Login;