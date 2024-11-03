// src/components/ChatModal.jsx

import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Stomp } from '@stomp/stompjs'; // Import Stomp directly
import SockJS from 'sockjs-client';

let stompClient = null;

function ChatModal({ open, onClose, currentUserId, postAuthorId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');

    useEffect(() => {
        if (open) {
            const socket = new SockJS('http://localhost:8080/ws-chat');
            stompClient = Stomp.over(socket); // Use Stomp.over to create the client
            stompClient.connect({}, onConnected, onError);
        }

        return () => {
            if (stompClient) stompClient.disconnect();
        };
    }, [open]);

    const onConnected = () => {
        // Subscribe to receive messages sent to this user only
        stompClient.subscribe(`/user/${currentUserId}/queue/messages`, onMessageReceived);
    };

    const onError = (err) => {
        console.error('Error connecting to WebSocket:', err);
    };

    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const sendMessage = () => {
        if (stompClient && newMessage.trim()) {
            const chatMessage = {
                senderId: currentUserId,
                recipientId: postAuthorId, // Send directly to the post author
                content: newMessage,
                timestamp: new Date().toISOString(),
            };
            stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage));
            setNewMessage('');
        }
    };

    return (
        <Box sx={{ display: open ? 'block' : 'none' }}>
            <Button onClick={onClose}>Close Chat</Button>
            <Box>
                {messages.map((msg, index) => (
                    <Typography
                        key={index}
                        align={msg.senderId === currentUserId ? 'right' : 'left'}
                        sx={{ marginBottom: '10px' }}
                    >
                        {msg.content}
                    </Typography>
                ))}
            </Box>
            <TextField
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            />
            <Button onClick={sendMessage} variant="contained" sx={{ marginTop: '10px' }}>
                Send
            </Button>
        </Box>
    );
}

export default ChatModal;
