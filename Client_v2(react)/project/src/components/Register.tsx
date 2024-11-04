// src/components/Register.tsx
import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

interface RegisterProps {
    onRegister: () => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/users/register/', {
                username,
                email,
                password,
            });
            console.log('Registered')
            onRegister(); // Notify the parent component to navigate to login
            navigate('/login');
            
        } catch (error) {
            const axiosError = error as AxiosError; // Type assertion
            console.error("Registration error:", axiosError.response?.data);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input 
                type="text" 
                placeholder="Username" 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                required 
            />
            <input 
                type="email" 
                placeholder="Email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
            />
            <input 
                type="password" 
                placeholder="Password" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
            />
            <button type="submit">Click to Register</button>
        </form>
        <a href="/login">Log in</a>
        </div>
    );
};

export default Register;
