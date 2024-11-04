// src/components/VideoCallPage.tsx

import React, { useEffect, useRef } from 'react';
import { connectWebSocket } from '../utils/websocket';

const VideoCallPage: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const roomName = 'myRoom'; // Replace this with the actual room name logic
        const ws = connectWebSocket(roomName);

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            console.log('Received message:', message);
            // Handle incoming messages here
        };

        return () => {
            ws.close(); // Clean up the WebSocket connection on component unmount
        };
    }, []);

    return (
        <div>
            <h1>Video Call</h1>
            <video ref={videoRef} autoPlay></video>
            {/* Add more video call UI elements here */}
        </div>
    );
};

export default VideoCallPage;
