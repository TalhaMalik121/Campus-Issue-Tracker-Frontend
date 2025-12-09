import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn as LogInIcon, Loader2 } from 'lucide-react';
import AuthLayout from './AuthLayout';

const InputGroup = ({ name, type, placeholder, icon: Icon, formData, handleChange }) => (
    <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 group-focus-within:text-primary-500 transition-colors duration-300" />
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={handleChange}
            required
            value={formData[name]}
            className="w-full pl-12 pr-4 py-3.5 bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-surface-900 dark:text-white placeholder-surface-400 transition-all duration-300"
        />
    </div>
);

function Login({ onLoginSuccess }) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:3000/api/auth/login',
                formData
            );

            const { token, user } = response.data;
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));

            if (onLoginSuccess) onLoginSuccess();
            navigate('/');

        } catch (error) {
            alert(error.response?.data?.error || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout formType="login">
            <form onSubmit={handleSubmit} className="space-y-5">
                <InputGroup name="email" type="email" placeholder="Email Address" icon={Mail} formData={formData} handleChange={handleChange} />
                <InputGroup name="password" type="password" placeholder="Password" icon={Lock} formData={formData} handleChange={handleChange} />

                <button type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-primary-600/20 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                        <>
                            <span>Log In</span>
                            <LogInIcon className="w-4 h-4" />
                        </>
                    )}
                </button>
            </form>
            <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-6">
                Don't have an account? <Link to="/signup" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">Sign Up</Link>
            </p>
        </AuthLayout>
    );
}

export default Login;