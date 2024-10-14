import  { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { sendMessage, receiveMessage, Message } from '../features/ChatSlice';
import { RootState } from '../store/store';

const useMessages = () => {
    const dispatch = useDispatch();
     const currentUser = useSelector(
         (state: RootState) => state.chat.currentUser
     );
    const messages = useSelector((state: RootState) => state.chat.messages);
    const messageInputRef = useRef<HTMLInputElement>(null);
    const lastMessageRef = useRef<HTMLDivElement>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Scroll to the last message
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]); // Run this effect whenever messages change

    useEffect(() => {
        // Simulate receiving a message every 5 seconds
        const intervalId = setInterval(() => {
            const simulatedMessage: Message = {
                id: Math.random().toString(36).substr(2, 9),
                text: `Simulated message ${Math.floor(Math.random() * 100)}`,
                sender: 'AI Assistant',
                timestamp: Date.now()
            };
            dispatch(receiveMessage(simulatedMessage));
        }, 5000);

        return () => clearInterval(intervalId);
    }, [dispatch]);

    const handleSendMessage = () => {
        if (messageInputRef.current && messageInputRef.current.value.trim()) {
            dispatch(sendMessage(messageInputRef.current.value));
            messageInputRef.current.value = '';
            setError(null); // Clear error state
        } else {
            setError('Please enter a message.');
        }
    };
    return {
        handleSendMessage,
        error,
        messageInputRef,
        messages,
        lastMessageRef,
        currentUser
    };
};

export default useMessages;
