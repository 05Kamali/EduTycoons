import React from 'react';
import styled from 'styled-components';
import { FiBriefcase, FiTarget, FiTrendingUp, FiBookOpen } from 'react-icons/fi';

const DashboardContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const WelcomeSection = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 2rem;
  border-radius: 1rem;
  margin-bottom: 2rem;
  
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

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const StatCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  
  .icon {
    width: 48px;
    height: 48px;
    border-radius: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1rem;
    font-size: 1.5rem;
    color: white;
    background: ${props => props.color || '#3b82f6'};
  }
  
  .content {
    flex: 1;
    
    .number {
      font-size: 2rem;
      font-weight: 700;
      color: #1a202c;
      margin-bottom: 0.25rem;
    }
    
    .label {
      color: #6b7280;
      font-size: 0.875rem;
    }
  }
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

const JobSeekerDashboard = () => {
  const stats = [
    { icon: FiBriefcase, number: 0, label: 'Applications', color: '#3b82f6' },
    { icon: FiTarget, number: 0, label: 'Profile Views', color: '#10b981' },
    { icon: FiTrendingUp, number: 0, label: 'Interviews', color: '#f59e0b' },
    { icon: FiBookOpen, number: 0, label: 'Skills', color: '#8b5cf6' }
  ];

  return (
    <DashboardContainer>
      <WelcomeSection>
        <h1>Welcome to your Career Dashboard</h1>
        <p>Track your progress, discover opportunities, and advance your career</p>
      </WelcomeSection>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index} color={stat.color}>
            <div className="icon">
              <stat.icon />
            </div>
            <div className="content">
              <div className="number">{stat.number}</div>
              <div className="label">{stat.label}</div>
            </div>
          </StatCard>
        ))}
      </StatsGrid>

      <ComingSoon>
        <h2>Dashboard Details Coming Soon</h2>
        <p>Complete your profile and start applying to jobs to see detailed statistics here.</p>
      </ComingSoon>
    </DashboardContainer>
  );
};

export default JobSeekerDashboard;

