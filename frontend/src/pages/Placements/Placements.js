import React from 'react';
import styled from 'styled-components';
import { FiTrendingUp } from 'react-icons/fi';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  
  h1 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a202c;
    margin-bottom: 1rem;
  }
  
  p {
    color: #6b7280;
    font-size: 1.125rem;
  }
`;

const ComingSoon = styled.div`
  background: white;
  border-radius: 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 3rem;
  text-align: center;
  
  .icon {
    font-size: 4rem;
    color: #3b82f6;
    margin-bottom: 1rem;
  }
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #6b7280;
    font-size: 1rem;
  }
`;

const Placements = () => {
  return (
    <Container>
      <Header>
        <h1>Placement Records</h1>
        <p>Track and manage placement information</p>
      </Header>
      
      <ComingSoon>
        <FiTrendingUp className="icon" />
        <h2>Placements Page Coming Soon</h2>
        <p>This page will display placement records with search, filter, and management capabilities.</p>
      </ComingSoon>
    </Container>
  );
};

export default Placements;
