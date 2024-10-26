import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { Message } from './types/chat';
import { getAIResponse } from './services/chat';

function App() {
  const [messages, setMessages] = useState<Message[]>([{
    id: '0',
    content: 'Привет! 👋 Я бот Welcome Bar, и я здесь, чтобы помочь тебе! Могу рассказать про наши коктейли, забронировать столик или ответить на любые вопросы о баре. Что тебя интересует? 😊',
    role: 'assistant',
    timestamp: new Date()
  }]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await getAIResponse(content);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        role: 'assistant',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "Извините, у меня возникли проблемы с подключением. Пожалуйста, попробуйте еще раз позже.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      <main className="flex-1 overflow-y-auto p-4 relative">
        <div className="star text-[#ffeb3b] text-4xl absolute top-10 right-10">✨</div>
        <div className="star text-[#ffeb3b] text-4xl absolute top-40 left-20">✨</div>
        <div className="star text-[#ffeb3b] text-4xl absolute bottom-32 right-24">✨</div>
        <div className="star text-[#ffeb3b] text-4xl absolute top-60 right-32">✨</div>
        <div className="max-w-3xl mx-auto space-y-4">
          {messages.map(message => (
            <ChatMessage key={message.id} message={message} />
          ))}
          
          {isLoading && (
            <div className="flex items-center justify-center gap-2 p-4">
              <div className="w-2 h-2 bg-[#ff3b9d] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-[#ff3b9d] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-[#ff3b9d] rounded-full animate-bounce"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </main>

      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
    </div>
  );
}

export default App;