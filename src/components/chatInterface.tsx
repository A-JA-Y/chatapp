import React, { useRef } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage } from './actions'; // Adjust the import path as needed

const ChatInterface = () => {
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const chatState = useSelector((state: { chat: any }) => state.chat); 

  const handleSend = () => {
    if (input.trim()) {
      dispatch(sendMessage({ text: input, sender: chatState.currentUser, timestamp: new Date().toISOString() }));
      setInput('');
      simulateReceiveMessage();
    }
  };

  const simulateReceiveMessage = () => {
    setTimeout(() => {
      dispatch(receiveMessage({
        text: 'This is a simulated response!',
        sender: 'Bot',
        timestamp: new Date().toISOString()
      }));
    }, 1000);
  };

  return (
    <Box>
      <TextField
        value={input}
        onChange={(e) => setInput(e.target.value)}
        label="Type a message"
        variant="outlined"
        fullWidth
      />
      <Button
        onClick={handleSend}
        variant="contained"
        color="primary"
        style={{ marginTop: '10px' }}
      >
        Send
      </Button>
      <div ref={messagesEndRef} />
    </Box>
  );
};

export default ChatInterface;