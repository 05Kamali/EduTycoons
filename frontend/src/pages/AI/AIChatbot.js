import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMessageCircle, FiSend } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { aiAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';

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

const EmptyState = styled.div`
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
  }
`;

const AIChatbot = () => {
  const { user } = useAuth();
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    setLoading(true);
    try {
      const response = await aiAPI.chatWithBot(inputMessage);
      console.log('AI Response:', response.data);
      toast.success('Message sent!');
    } catch (error) {
      toast.error('Failed to send message');
      console.error(error);
    } finally {
      setLoading(false);
      setInputMessage('');
    }
  };

  return (
    <Container>
      <Header>
        <h1><FiMessageCircle style={{ display: 'inline', marginRight: '0.5rem' }} /> AI Career Helpline</h1>
        <p>{user?.role === 'jobseeker' ? 'Get personalized career guidance and advice' : 'Get recruitment tips and best practices'}</p>
      </Header>

      <ChatContainer>
        <MessagesArea>
          <EmptyState>
            <FiMessageCircle className="icon" />
            <h3>Welcome to AI Career Helpline!</h3>
            <p>Start a conversation by typing a message below.</p>
          </EmptyState>
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
              <FiSend /> {loading ? 'Sending...' : 'Send'}
            </button>
          </form>
        </InputArea>
      </ChatContainer>
    </Container>
  );
};

export default AIChatbot;

