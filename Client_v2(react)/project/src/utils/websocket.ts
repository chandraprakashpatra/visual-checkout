// src/utils/websocket.ts

const connectWebSocket = (roomName: string) => {
    const token = localStorage.getItem('token'); // Get the token from localStorage
    const ws = new WebSocket(`ws://localhost:8000/ws/call/${roomName}/`);

    ws.onopen = () => {
        console.log('WebSocket connection opened');
        // Send token if needed; otherwise, handle it in Django Channels middleware
    };

    ws.onclose = () => {
        console.log('WebSocket connection closed');
    };

    return ws;
};

export { connectWebSocket };
