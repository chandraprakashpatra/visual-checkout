// src/components/Login.tsx
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface LoginProps {
    onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState('');
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/users/login/', {
                username,
                password,
            });
            
            const token = response.data.token;
            localStorage.setItem('token',token);//storing the token to local storage for future authorised requests
            console.log('logged In Succesfully')
            onLogin(); // Notify the parent component to navigate to home
            navigate('/home');
           
        } catch (error) {
            const axiosError = error as AxiosError; // Type assertion

            if (axiosError.response) {
                // If we receive a response from the server
                if (axiosError.response.status === 401) {
                    setErrorMessage('Unauthorized Credentials or not registered'); // Set the error message state
                } else {
                    console.error('Login error:', axiosError.response.data);
                    setErrorMessage('An unexpected error occurred. Please try again.'); // General error message
                }
            } else {
                // Handle network errors
                console.error('Login failed:', axiosError.message);
                setErrorMessage('Network error. Please try again later.'); // Network error message
            }
        }
    };

    return (
        <div id='login'>
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Login</button>
            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>} {/* Display error message */}
        </form>
        
        <a href="/register">Click to register</a>
        </div>
    );
};

export default Login;
