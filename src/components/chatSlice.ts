import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  text: string;
  sender: string;
  timestamp: string;
}

interface ChatState {
  messages: Message[];
  currentUser: string;
}

const initialState: ChatState = {
  messages: [],
  currentUser: 'User',
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    sendMessage: (state: ChatState, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    receiveMessage: (state: ChatState, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
  },
});

export const { sendMessage, receiveMessage } = chatSlice.actions;

export default chatSlice.reducer;