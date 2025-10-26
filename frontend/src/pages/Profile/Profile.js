<<<<<<< HEAD
import React from 'react';
import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';

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

const Profile = () => {
  return (
    <Container>
      <Header>
        <h1>Profile Management</h1>
        <p>Manage your professional profile and preferences</p>
      </Header>
      
      <ComingSoon>
        <FiUser className="icon" />
        <h2>Profile Page Coming Soon</h2>
        <p>This page will allow you to manage your profile, skills, experience, and career preferences.</p>
      </ComingSoon>
    </Container>
  );
};

export default Profile;
=======
import React from 'react';
import styled from 'styled-components';
import { FiUser } from 'react-icons/fi';

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

const Profile = () => {
  return (
    <Container>
      <Header>
        <h1>Profile Management</h1>
        <p>Manage your professional profile and preferences</p>
      </Header>
      
      <ComingSoon>
        <FiUser className="icon" />
        <h2>Profile Page Coming Soon</h2>
        <p>This page will allow you to manage your profile, skills, experience, and career preferences.</p>
      </ComingSoon>
    </Container>
  );
};

export default Profile;
>>>>>>> 6da5be8cee5bf37ced3c94567921457d10bf2dea
