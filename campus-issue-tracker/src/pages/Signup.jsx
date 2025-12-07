// export default Signup;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, UserPlus, CheckCircle, RotateCw } from 'lucide-react'; // Added icons
import AuthLayout from './AuthLayout'; 

// *** MOVED INPUTGROUP OUTSIDE THE MAIN COMPONENT ***
const InputGroup = ({ name, type, placeholder, icon: Icon, value, onChange }) => (
    <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500" />
        <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            onChange={onChange} 
            required 
            value={value} 
            className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-200 shadow-inner"
        />
    </div>
);

function Signup() {
    // Step 1: User details, Step 2: OTP validation
    const [step, setStep] = useState(1); 
    
    // Form data state
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '', 
    });
    
    // OTP state
    const [otp, setOtp] = useState('');
    const [isResending, setIsResending] = useState(false);
    const [formError, setFormError] = useState('');
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setFormError(''); // Clear error on input change
    };
    
    const handleOtpChange = (e) => {
        setOtp(e.target.value);
        setFormError('');
    };

    // --- Step 1 Handler: Submitting Details and Sending OTP ---
    const handleSendOtp = async (e) => {
        e.preventDefault();
        setFormError('');

        // 1. Client-side domain and password validation
        const requiredDomain = ".edu.pk";
        if (!formData.email.toLowerCase().endsWith(requiredDomain)) {
            setFormError(`Registration is restricted to institutional emails ending in ${requiredDomain}.`);
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setFormError("Passwords do not match. Please ensure both password fields are identical.");
            return; 
        }

        try {
            // 🔑 CALL BACKEND TO GENERATE AND SEND OTP
            // This API should return success if the email is valid and OTP sent.
            const response = await axios.post(
                'http://localhost:3000/api/auth/send-otp', 
                { email: formData.email }
            );

            console.log(response.data.message);
            alert('Verification code sent to your email.');
            setStep(2); // Move to OTP verification step

        } catch (error) {
            setFormError(error.response?.data?.error || 'Failed to send verification code.');
        }
    };
    
    // --- Step 2 Handler: Validating OTP and Finalizing Registration ---
    const handleVerifyOtpAndSignup = async (e) => {
        e.preventDefault();
        setFormError('');

        if (otp.length !== 6) { // Assuming OTP is 6 digits long
            setFormError('Please enter a valid 6-digit OTP.');
            return;
        }

        // Prepare data for the final API call (excluding confirmPassword)
        const { confirmPassword, ...dataToSubmit } = formData;
        
        try {
            // 🔑 CALL BACKEND TO VALIDATE OTP AND REGISTER USER
            const response = await axios.post(
                'http://localhost:3000/api/auth/signup', 
                { ...dataToSubmit, otp } // Send user details + validated OTP
            );
            
            console.log(response.data.message);
            alert('Registration successful! Your email is verified. Please log in.');
            navigate('/login'); 

        } catch (error) {
            setFormError(error.response?.data?.error || 'OTP verification or registration failed.');
        }
    };
    
    // --- Resend OTP Logic ---
    const handleResendOtp = async () => {
        if (isResending) return;
        setIsResending(true);
        setFormError('');
        
        try {
            // 🔑 CALL BACKEND TO GENERATE AND SEND A NEW OTP
            const response = await axios.post(
                'http://localhost:3000/api/auth/send-otp', 
                { email: formData.email }
            );

            console.log(response.data.message);
            alert('New verification code sent!');

        } catch (error) {
            setFormError(error.response?.data?.error || 'Failed to resend verification code.');
        } finally {
            // Wait a few seconds before allowing resend again
            setTimeout(() => setIsResending(false), 5000); 
        }
    };
    
    // Determine title based on step
    const currentTitle = step === 1 ? 'Create Account' : 'Verify Email';
    const currentSubtitle = step === 1 
        ? 'Register to start logging new issues.'
        : `A 6-digit code has been sent to ${formData.email}.`;

    return (
        <AuthLayout formType="signup" titleOverride={currentTitle} subtitleOverride={currentSubtitle}>
            
            {/* Display general error message */}
            {formError && (
                <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-3 rounded-lg text-sm text-center">
                    {formError}
                </div>
            )}
            
            {/* --- STEP 1: Registration Details --- */}
            {step === 1 && (
                <form onSubmit={handleSendOtp} className="space-y-6">
                    <InputGroup name="name" type="text" placeholder="Full Name" icon={User} value={formData.name} onChange={handleChange} />
                    <InputGroup name="email" type="email" placeholder="Email Address (e.g., user@university.edu.pk)" icon={Mail} value={formData.email} onChange={handleChange} />
                    <InputGroup name="password" type="password" placeholder="Password (min 6 characters)" icon={Lock} value={formData.password} onChange={handleChange} />
                    <InputGroup name="confirmPassword" type="password" placeholder="Confirm Password" icon={Lock} value={formData.confirmPassword} onChange={handleChange} />

                    <button type="submit"
                        className="w-full py-3.5 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl transition duration-200 shadow-lg hover:shadow-xl shadow-indigo-500/50"
                    >
                        <Mail className="w-5 h-5" />
                        <span>Continue & Send Code</span>
                    </button>
                </form>
            )}

            {/* --- STEP 2: OTP Verification --- */}
            {step === 2 && (
                <form onSubmit={handleVerifyOtpAndSignup} className="space-y-6">
                    <div className="relative">
                        <CheckCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" />
                        <input 
                            type="text" 
                            name="otp"
                            placeholder="Enter 6-digit code" 
                            value={otp} 
                            onChange={handleOtpChange} 
                            maxLength={6}
                            required 
                            className="w-full pl-12 pr-4 py-3.5 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition duration-200 shadow-inner text-center text-lg tracking-widest"
                        />
                    </div>

                    <button type="submit"
                        className="w-full py-3.5 flex items-center justify-center space-x-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-bold rounded-xl transition duration-200 shadow-lg hover:shadow-xl shadow-indigo-500/50"
                    >
                        <UserPlus className="w-5 h-5" />
                        <span>Verify & Complete Registration</span>
                    </button>
                    
                    {/* Resend OTP Button */}
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={handleResendOtp}
                            disabled={isResending}
                            className={`flex items-center justify-center mx-auto gap-2 text-sm font-medium transition duration-200 ${
                                isResending 
                                    ? 'text-gray-400 cursor-not-allowed'
                                    : 'text-indigo-600 hover:text-indigo-500'
                            }`}
                        >
                            <RotateCw size={16} className={isResending ? 'animate-spin' : ''} />
                            {isResending ? 'Sending new code...' : 'Resend OTP'}
                        </button>
                    </div>
                </form>
            )}

            <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
                Already have an account? <Link to="/login" className="text-indigo-600 hover:text-indigo-500 font-semibold transition duration-150">Log In</Link>
            </p>
        </AuthLayout>
    );
}

export default Signup;