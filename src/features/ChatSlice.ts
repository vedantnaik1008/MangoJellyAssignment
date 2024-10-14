import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  currentUser: string;
}

const initialState: ChatState = {
  messages: [],
  currentUser: 'John Doe',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state, action: PayloadAction<string>) => {
      const newMessage: Message = {
        id: uuidv4(),
        text: action.payload,
        sender: state.currentUser,
        timestamp: Date.now(),
      };
      state.messages.push(newMessage);
    },
    receiveMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;

export default chatSlice.reducer;
