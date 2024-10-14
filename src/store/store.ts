// src/app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import chatReducer from '../features/ChatSlice';

export const store = configureStore({
    reducer: {
        chat: chatReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
