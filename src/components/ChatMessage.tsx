import React from 'react';
import { Message } from '../types/chat';
import { User, Bot } from 'lucide-react';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  return (
    <div className={`flex gap-3 mb-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex gap-3 max-w-[80%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
          isUser ? 'bg-[#ff3b9d] bg-opacity-20' : 'bg-[#ffeb3b] bg-opacity-20'
        }`}>
          {isUser ? 
            <User className="w-5 h-5 text-[#ff3b9d]" /> : 
            <Bot className="w-5 h-5 text-[#ffeb3b]" />
          }
        </div>
        <div className={`rounded-lg p-4 ${
          isUser ? 
            'bg-[#ff3b9d] bg-opacity-20 border border-[#ff3b9d] border-opacity-30' : 
            'bg-zinc-900 border border-zinc-800'
        }`}>
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <span className="text-xs mt-1 block opacity-50">
            {message.timestamp.toLocaleTimeString()}
          </span>
        </div>
      </div>
    </div>
  );
};