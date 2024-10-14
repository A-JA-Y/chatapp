
export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';


export const sendMessage = (message: { text: string; sender: string; timestamp: string }) => ({
  type: SEND_MESSAGE,
  payload: message,
});

export const receiveMessage = (message: { text: string; sender: string; timestamp: string }) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
});