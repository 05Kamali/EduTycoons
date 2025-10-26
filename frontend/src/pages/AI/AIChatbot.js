import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { aiAPI } from '../../services/api';
import styled from 'styled-components';
import { FiMessageCircle, FiSend, FiUser, FiBot } from 'react-icons/fi';
import toast from 'react-hot-toast';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 200px);
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem 1rem 0 0;
  
  h1 {
    font-size: 2rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
  }
  
  p {
    opacity: 0.9;
    font-size: 1.125rem;
  }
`;

const ChatContainer = styled.div`
  background: white;
  border-radius: 0 0 0.75rem 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
`;

const MessagesArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Message = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  
  .message-content {
    max-width: 70%;
    padding: 1rem;
    border-radius: 1rem;
    background: ${props => props.isUser ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6'};
    color: ${props => props.isUser ? 'white' : '#1a202c'};
    line-height: 1.6;
  }
  
  .message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: ${props => props.isUser ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#f3f4f6'};
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    flex-shrink: 0;
  }
`;

const InputArea = styled.div`
  padding: 1.5rem;
  border-top: 1px solid #e5e7eb;
  
  form {
    display: flex;
    gap: 1rem;
    
    input {
      flex: 1;
      padding: 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.5rem;
      font-size: 1rem;
      
      &:focus {
        outline: none;
        border-color: #3b82f6;
        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
      }
    }
    
    button {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-weight: 500;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      transition: transform 0.2s ease;
      
      &:hover:not(:disabled) {
        transform: translateY(-1px);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
`;

const WelcomeMessage = styled.div`
  text-align: center;
  padding: 3rem 1rem;
  color: #6b7280;
  
  .icon {
    font-size: 3rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
  
  h3 {
    font-size: 1.125rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1a202c;
  }
`;

const AIChatbot = () => {
    const { user } = useAuth();
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputMessage.trim() || loading) return;

        const userMessage = {
            text: inputMessage,
            isUser: true,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputMessage('');
        setLoading(true);

        try {
            const response = await aiAPI.chatWithBot(inputMessage, user.role);
            const botMessage = {
                text: response.data.response,
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            toast.error('Failed to get response from AI');
            console.error(error);
            const errorMessage = {
                text: 'Sorry, I encountered an error. Please try again.',
                isUser: false,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Header>
                <h1>
                    <FiMessageCircle style={{ display: 'inline', marginRight: '0.5rem' }} />
                    AI Career Helpline
                </h1>
                <p>{user?.role === 'jobseeker' ? 'Get personalized career guidance and advice' : 'Get recruitment tips and best practices'}</p>
            </Header>

            <ChatContainer>
                <MessagesArea>
                    {messages.length === 0 ? (
                        <WelcomeMessage>
                            <FiMessageCircle className="icon" />
                            <h3>Welcome to AI Career Helpline!</h3>
                            <p>
                                {user?.role === 'jobseeker'
                                    ? 'Ask me anything about career planning, skill development, or job search strategies.'
                                    : 'Ask me about talent acquisition, recruitment strategies, or hiring best practices.'}
                            </p>
                        </WelcomeMessage>
                    ) : (
                        messages.map((message, index) => (
                            <Message key={index} isUser={message.isUser}>
                                {!message.isUser && (
                                    <div className="message-avatar">
                                        <FiBot />
                                    </div>
                                )}
                                <div className="message-content">
                                    {message.text}
                                </div>
                                {message.isUser && (
                                    <div className="message-avatar">
                                        <FiUser />
                                    </div>
                                )}
                            </Message>
                        ))
                    )}
                    {loading && (
                        <Message isUser={false}>
                            <div className="message-avatar">
                                <FiBot />
                            </div>
                            <div className="message-content">
                                Thinking...
                            </div>
                        </Message>
                    )}
                    <div ref={messagesEndRef} />
                </MessagesArea>

                <InputArea>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Type your message here..."
                            value={inputMessage}
                            onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <button type="submit" disabled={loading}>
                            <FiSend />
                            Send
                        </button>
                    </form>
                </InputArea>
            </ChatContainer>
        </Container>
    );
};

export default AIChatbot;

