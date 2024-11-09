import React, { useState, useEffect, useRef } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

function ChatModal({ open, onClose, currentUserId, postAuthorId }) {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null); // For auto-scrolling to the latest message

    useEffect(() => {
        if (open) {
            // Connect to WebSocket server using SockJS and STOMP
            const socket = new SockJS('http://localhost:8080/ws-chat');
            stompClient = new Client({
                webSocketFactory: () => socket,
                onConnect: onConnected,
                onDisconnect: onDisconnected,
                onStompError: onError,
            });
            stompClient.activate();
        }

        return () => {
            if (stompClient) {
                stompClient.deactivate();
                console.log('Disconnected from WebSocket');
            }
        };
    }, [open]);

    const onConnected = () => {
        // Subscribe to receive messages for the current user
        stompClient.subscribe(`/user/${currentUserId}/queue/messages`, onMessageReceived);
        console.log('Connected to WebSocket');
    };

    const onDisconnected = () => {
        console.log('Disconnected from WebSocket');
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
                recipientId: postAuthorId,
                content: newMessage,
                timestamp: new Date().toISOString(),
            };

            // Publish the message to the "/app/chat.sendMessage" endpoint
            stompClient.publish({
                destination: '/app/chat.sendMessage',
                body: JSON.stringify(chatMessage), // The message content
            });

            setNewMessage(''); // Clear the message input after sending
        }
    };

    useEffect(() => {
        // Scroll to the newest message when messages update
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <Box
            sx={{
                display: open ? 'flex' : 'none',
                flexDirection: 'column',
                padding: '20px',
                border: '1px solid #ccc',
                maxWidth: '400px',
                margin: '0 auto',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px',
            }}
        >
            <Button onClick={onClose} variant="contained" sx={{ alignSelf: 'flex-end', marginBottom: '10px' }}>
                Close Chat
            </Button>
            <Box
                sx={{
                    maxHeight: '300px',
                    overflowY: 'auto',
                    padding: '10px',
                    borderBottom: '1px solid #ccc',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '8px',
                }}
            >
                {messages.map((msg, index) => (
                    <Typography
                        key={index}
                        align={msg.senderId === currentUserId ? 'right' : 'left'}
                        sx={{
                            backgroundColor: msg.senderId === currentUserId ? '#d1e7dd' : '#f8d7da',
                            borderRadius: '8px',
                            padding: '8px',
                            marginBottom: '5px',
                            display: 'inline-block',
                            maxWidth: '80%',
                        }}
                    >
                        {msg.content}
                    </Typography>
                ))}
                <div ref={messagesEndRef} />
            </Box>
            <TextField
                fullWidth
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                sx={{ marginTop: '10px' }}
            />
            <Button onClick={sendMessage} variant="contained" sx={{ marginTop: '10px' }}>
                Send
            </Button>
        </Box>
    );
}

export default ChatModal;
