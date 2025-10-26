import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const ComingSoon = styled.div`
  background: white;
  padding: 3rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  text-align: center;
  color: #6b7280;
  
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }
`;

const Placements = () => {
  return (
    <Container>
      <ComingSoon>
        <h2>Placement Records</h2>
        <p>View and manage placement records here.</p>
      </ComingSoon>
    </Container>
  );
};

export default Placements;

