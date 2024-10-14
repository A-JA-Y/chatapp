import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, receiveMessage } from './chatSlice';
import { RootState, AppDispatch } from './store';

export default function ChatInterface() {
  const dispatch = useDispatch<AppDispatch>();
  const chatState = useSelector((state: RootState) => state.chat) as { messages: { text: string, sender: string, timestamp: string }[], currentUser: string };
  const [input, setInput] = React.useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatState.messages]);

  return (
    <div className="container mx-auto max-w-2xl">
      <div className="bg-white shadow-md rounded-lg h-[80vh] flex flex-col mt-4">
        <div className="flex-grow overflow-auto p-4">
          {chatState.messages.map((message, index) => (
            <div key={index} className={`flex ${message.sender === chatState.currentUser ? 'justify-end' : 'justify-start'} mb-4`}>
              <div className={`rounded-lg p-3 max-w-[70%] ${message.sender === chatState.currentUser ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                <p>{message.text}</p>
                <p className="text-xs mt-1 text-gray-500">
                  {message.sender} - {new Date(message.timestamp).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="p-4 border-t">
          <div className="flex">
            <input
              type="text"
              className="flex-grow rounded-l-lg p-2 border-2 border-gray-300 focus:outline-none focus:border-blue-500"
              placeholder="Type a message"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button
              className="bg-blue-500 text-white rounded-r-lg px-4 py-2 hover:bg-blue-600 transition duration-300"
              onClick={handleSend}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}