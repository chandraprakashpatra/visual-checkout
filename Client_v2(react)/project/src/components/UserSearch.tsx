import React, { useState, useRef  } from 'react';
import axios from 'axios';

interface User {
    id: number;
    username: string;
}

interface UserSearchProps {
    users: User[];
}

const UserSearch: React.FC<UserSearchProps> = ({ users }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedUsers, setSearchedUsers] = useState<User[]>([]);
    const [notFound, setNotFound] = useState(false);
    const [currentRoom, setCurrentRoom] = useState<string | null>(null);//vc
    const socketRef = useRef<WebSocket | null>(null);//vc
    const handleSearch = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`http://localhost:8000/api/users/search/?username=${searchQuery}`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Include the token in the Authorization header
                },
            });
            setSearchedUsers(response.data);
            //if data not found
            if (response.data.length === 0) {
                setNotFound(true); // Set to true if no users found
            } else {
                setNotFound(false); // Reset if users are found
            }
        } catch (error) {
            console.log('Error during search');
            setNotFound(true); // Handle search failure as "not found"
        }
    };

    const handleCall = (user: User) => {
        const roomName = `call_${user.id}`; // Unique room name based on the user ID
        setCurrentRoom(roomName);

        // Initialize WebSocket for signaling
        socketRef.current = new WebSocket(`ws://localhost:8000/ws/call/${roomName}/`);
        
        socketRef.current.onopen = () => {
            console.log(`Connected to room: ${roomName}`);
            socketRef.current?.send(JSON.stringify({
                type: 'call_initiate',
                to: user.username
            }));
        };

        socketRef.current.onmessage = (event) => {
            const data = JSON.parse(event.data);
            console.log('Received message:', data);
            // Implement signaling logic here
        };

        socketRef.current.onclose = () => {
            console.log('WebSocket connection closed');
        };
    };

    return (
        <div>
            <input 
                type="text" 
                placeholder="Search Users" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>
            
            {notFound && <p>No person found With This Name</p>}
            
            <ul>
                {searchedUsers.map(user => (
                    <li key={user.id}>
                        {user.username} <button onClick={() => handleCall(user)}>Call</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserSearch;

