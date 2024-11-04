// src/components/Home.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserSearch from './UserSearch';

const Home: React.FC = () => {
    const [users, setUsers] = useState<any[]>([]); // Adjust type as needed

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/users/');
                setUsers(response.data);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };
        fetchUsers();
    }, []);

    return (
        <div>
            <h2>Home Page</h2>
            <UserSearch users={users} />
        </div>
    );
};

export default Home;
