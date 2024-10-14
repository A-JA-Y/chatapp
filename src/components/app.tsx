'use client'

import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import ChatInterface from './chatInterface';

export function AppComponent() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <ChatInterface />
      </div>
    </Provider>
  );
}