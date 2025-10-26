import React from 'react';
import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f8fafc;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 1rem;
`;

const Text = styled.p`
  color: #6b7280;
  font-size: 1rem;
`;

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <Container>
      <Spinner />
      <Text>{text}</Text>
    </Container>
  );
};

export default LoadingSpinner;

