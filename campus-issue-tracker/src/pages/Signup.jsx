import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, CheckCircle, RotateCw, ArrowRight } from 'lucide-react';
import AuthLayout from './AuthLayout';

const InputGroup = ({ name, type, placeholder, icon: Icon, value, onChange }) => (
    <div className="relative group">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 group-focus-within:text-primary-500 transition-colors duration-300" />
        <input
            type={type}
            name={name}
            placeholder={placeholder}
            onChange={onChange}
            required
            value={value}
            className="w-full pl-12 pr-4 py-3.5 bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-surface-900 dark:text-white placeholder-surface-400 transition-all duration-300"
        />
    </div>
);

function Signup() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [otp, setOtp] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formError, setFormError] = useState('');

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormError('');
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value);
        setFormError('');
    };

    const handleSendOtp = async (e) => {
        e.preventDefault();
        setFormError('');
        setIsLoading(true);

        const requiredDomain = ".edu.pk";
        if (!formData.email.toLowerCase().endsWith(requiredDomain)) {
            setFormError(`Registration is restricted to institutional emails ending in ${requiredDomain}.`);
            setIsLoading(false);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setFormError("Passwords do not match.");
            setIsLoading(false);
            return;
        }

        try {
            await axios.post('http://localhost:3000/api/auth/send-otp', { email: formData.email });
            setStep(2);
        } catch (error) {
            setFormError(error.response?.data?.error || 'Failed to send verification code.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleVerifyOtpAndSignup = async (e) => {
        e.preventDefault();
        setFormError('');
        setIsLoading(true);

        if (otp.length !== 6) {
            setFormError('Please enter a valid 6-digit OTP.');
            setIsLoading(false);
            return;
        }

        const { confirmPassword, ...dataToSubmit } = formData;

        try {
            await axios.post('http://localhost:3000/api/auth/signup', { ...dataToSubmit, otp });
            alert('Registration successful! Please log in.');
            navigate('/login');
        } catch (error) {
            setFormError(error.response?.data?.error || 'OTP verification failed.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleResendOtp = async () => {
        if (isResending) return;
        setIsResending(true);
        setFormError('');

        try {
            await axios.post('http://localhost:3000/api/auth/send-otp', { email: formData.email });
            alert('New code sent!');
        } catch (error) {
            setFormError('Failed to resend code.');
        } finally {
            setTimeout(() => setIsResending(false), 5000);
        }
    };

    return (
        <AuthLayout
            formType="signup"
            titleOverride={step === 1 ? 'Create Account' : 'Verify Email'}
            subtitleOverride={step === 1 ? 'Join the community today' : `Enter the code sent to ${formData.email}`}
        >

            {formError && (
                <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-xl text-sm text-center border border-red-100 dark:border-red-900/50">
                    {formError}
                </div>
            )}

            {step === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-4">
                    <InputGroup name="name" type="text" placeholder="Full Name" icon={User} value={formData.name} onChange={handleChange} />
                    <InputGroup name="email" type="email" placeholder="Email (e.g., user@university.edu.pk)" icon={Mail} value={formData.email} onChange={handleChange} />
                    <InputGroup name="password" type="password" placeholder="Password (min 6 chars)" icon={Lock} value={formData.password} onChange={handleChange} />
                    <InputGroup name="confirmPassword" type="password" placeholder="Confirm Password" icon={Lock} value={formData.confirmPassword} onChange={handleChange} />

                    <button type="submit"
                        disabled={isLoading}
                        className="w-full mt-4 py-3.5 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-primary-600/20 disabled:opacity-70"
                    >
                        <span>Continue</span>
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyOtpAndSignup} className="space-y-6">
                    <div className="relative group">
                        <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-surface-400 group-focus-within:text-primary-500 transition-colors" />
                        <input
                            type="text"
                            name="otp"
                            placeholder="000000"
                            value={otp}
                            onChange={handleOtpChange}
                            maxLength={6}
                            required
                            className="w-full pl-12 pr-4 py-3.5 bg-surface-50 dark:bg-surface-900/50 border border-surface-200 dark:border-surface-700 rounded-xl focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 outline-none text-surface-900 dark:text-white placeholder-surface-400 transition-all duration-300 text-center text-lg tracking-[0.5em] font-mono"
                        />
                    </div>

                    <button type="submit"
                        disabled={isLoading}
                        className="w-full py-3.5 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-primary-600/20 disabled:opacity-70"
                    >
                        <UserPlus className="w-4 h-4" />
                        <span>Complete Registration</span>
                    </button>

                    <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={isResending}
                        className={`flex items-center justify-center mx-auto gap-2 text-sm font-medium transition-colors ${isResending ? 'text-surface-400 cursor-not-allowed' : 'text-primary-600 hover:text-primary-700'
                            }`}
                    >
                        <RotateCw size={14} className={isResending ? 'animate-spin' : ''} />
                        {isResending ? 'Sending...' : 'Resend Code'}
                    </button>
                </form>
            )}

            <p className="text-center text-sm text-surface-500 dark:text-surface-400 mt-6">
                Already have an account? <Link to="/login" className="text-primary-600 hover:text-primary-700 font-semibold transition-colors">Log In</Link>
            </p>
        </AuthLayout>
    );
}

export default Signup;