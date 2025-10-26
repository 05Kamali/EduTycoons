<<<<<<< HEAD
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { 
  FiUsers, 
  FiBriefcase, 
  FiTrendingUp, 
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiMessageCircle
} from 'react-icons/fi';
import { jobsAPI, applicationsAPI, usersAPI } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import toast from 'react-hot-toast';

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

const Section = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #6b7280;
    font-size: 0.875rem;
  }
`;

const SectionContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
`;

const Button = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #2563eb;
  }
`;

const JobCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .job-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }
  
  .company {
    color: #3b82f6;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .location {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
  
  .salary {
    color: #059669;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .applications {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    
    .count {
      color: #6b7280;
      font-size: 0.875rem;
    }
  }
`;

const ApplicationCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  
  .candidate-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }
  
  .job-title {
    color: #3b82f6;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    .skill {
      background: #f3f4f6;
      color: #374151;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
    }
  }
  
  .actions {
    display: flex;
    gap: 0.5rem;
    
    button {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.accept {
        background: #d1fae5;
        color: #065f46;
        border: 1px solid #a7f3d0;
        
        &:hover {
          background: #a7f3d0;
        }
      }
      
      &.reject {
        background: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
        
        &:hover {
          background: #fecaca;
        }
      }
      
      &.view {
        background: #dbeafe;
        color: #1e40af;
        border: 1px solid #93c5fd;
        
        &:hover {
          background: #93c5fd;
        }
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
  
  p {
    font-size: 0.875rem;
  }
`;

const RecruiterDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch recruiter's jobs
  const { data: myJobs, isLoading: jobsLoading } = useQuery(
    'myJobs',
    () => jobsAPI.getMyJobs(),
    {
      refetchOnWindowFocus: false,
    }
  );

  // Fetch received applications
  const { data: applications, isLoading: applicationsLoading } = useQuery(
    'receivedApplications',
    () => applicationsAPI.getReceivedApplications(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleApplicationStatus = async (applicationId, status) => {
    try {
      await applicationsAPI.updateApplicationStatus(applicationId, status);
      toast.success(`Application ${status} successfully`);
    } catch (error) {
      toast.error('Failed to update application status');
    }
  };

  const stats = [
    {
      icon: FiBriefcase,
      number: myJobs?.length || 0,
      label: 'Active Jobs',
      color: '#3b82f6'
    },
    {
      icon: FiUsers,
      number: applications?.length || 0,
      label: 'Total Applications',
      color: '#10b981'
    },
    {
      icon: FiTrendingUp,
      number: 0, // This would come from analytics
      label: 'Profile Views',
      color: '#f59e0b'
    },
    {
      icon: FiMessageCircle,
      number: 0, // This would come from AI chatbot usage
      label: 'AI Consultations',
      color: '#8b5cf6'
    }
  ];

  if (jobsLoading || applicationsLoading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  return (
    <DashboardContainer>
      <WelcomeSection>
        <h1>Recruiter Dashboard</h1>
        <p>Manage your job postings and find the best candidates</p>
      </WelcomeSection>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <div className="icon" style={{ background: stat.color }}>
              <stat.icon />
            </div>
            <div className="content">
              <div className="number">{stat.number}</div>
              <div className="label">{stat.label}</div>
            </div>
          </StatCard>
        ))}
      </StatsGrid>

      <Section>
        <SectionHeader>
          <div>
            <h2>My Job Postings</h2>
            <p>Manage your active job postings</p>
          </div>
          <Button>
            <FiPlus />
            Post New Job
          </Button>
        </SectionHeader>
        <SectionContent>
          {myJobs?.length > 0 ? (
            myJobs.map((job) => (
              <JobCard key={job._id}>
                <div className="job-title">{job.title}</div>
                <div className="company">{job.company}</div>
                <div className="location">{job.location}</div>
                <div className="salary">₹{job.salary.toLocaleString()}</div>
                <div className="applications">
                  <span className="count">{job.applications.length} applications</span>
                  <Button>
                    <FiEye />
                    View Applications
                  </Button>
                </div>
              </JobCard>
            ))
          ) : (
            <EmptyState>
              <FiBriefcase className="icon" />
              <h3>No job postings yet</h3>
              <p>Create your first job posting to start attracting candidates</p>
            </EmptyState>
          )}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <h2>Recent Applications</h2>
          <p>Review and manage job applications</p>
        </SectionHeader>
        <SectionContent>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <FiSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <button
              style={{
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <FiFilter />
            </button>
          </div>

          {applications?.length > 0 ? (
            applications.map((application) => (
              <ApplicationCard key={application._id}>
                <div className="candidate-name">{application.jobseekerId?.name}</div>
                <div className="job-title">{application.jobId?.title}</div>
                <div className="skills">
                  {application.jobseekerId?.skills?.map((skill, index) => (
                    <span key={index} className="skill">{skill}</span>
                  ))}
                </div>
                <div className="actions">
                  <button 
                    className="view"
                    onClick={() => {/* Navigate to candidate profile */}}
                  >
                    View Profile
                  </button>
                  <button 
                    className="accept"
                    onClick={() => handleApplicationStatus(application._id, 'accepted')}
                  >
                    Accept
                  </button>
                  <button 
                    className="reject"
                    onClick={() => handleApplicationStatus(application._id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              </ApplicationCard>
            ))
          ) : (
            <EmptyState>
              <FiUsers className="icon" />
              <h3>No applications yet</h3>
              <p>Applications will appear here when candidates apply to your jobs</p>
            </EmptyState>
          )}
        </SectionContent>
      </Section>
    </DashboardContainer>
  );
};

export default RecruiterDashboard;
=======
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { 
  FiUsers, 
  FiBriefcase, 
  FiTrendingUp, 
  FiPlus,
  FiSearch,
  FiFilter,
  FiEye,
  FiMessageCircle
} from 'react-icons/fi';
import { jobsAPI, applicationsAPI, usersAPI } from '../../services/api';
import LoadingSpinner from '../../components/UI/LoadingSpinner';
import toast from 'react-hot-toast';

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

const Section = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const SectionHeader = styled.div`
  padding: 1.5rem 1.5rem 0 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  margin-bottom: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }
  
  p {
    color: #6b7280;
    font-size: 0.875rem;
  }
`;

const SectionContent = styled.div`
  padding: 0 1.5rem 1.5rem 1.5rem;
`;

const Button = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    background: #2563eb;
  }
`;

const JobCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: #3b82f6;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .job-title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }
  
  .company {
    color: #3b82f6;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .location {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 0.5rem;
  }
  
  .salary {
    color: #059669;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }
  
  .applications {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1rem;
    
    .count {
      color: #6b7280;
      font-size: 0.875rem;
    }
  }
`;

const ApplicationCard = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem;
  margin-bottom: 1rem;
  
  .candidate-name {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }
  
  .job-title {
    color: #3b82f6;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  .skills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1rem;
    
    .skill {
      background: #f3f4f6;
      color: #374151;
      padding: 0.25rem 0.5rem;
      border-radius: 0.25rem;
      font-size: 0.75rem;
    }
  }
  
  .actions {
    display: flex;
    gap: 0.5rem;
    
    button {
      padding: 0.5rem 1rem;
      border-radius: 0.5rem;
      font-size: 0.75rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.2s ease;
      
      &.accept {
        background: #d1fae5;
        color: #065f46;
        border: 1px solid #a7f3d0;
        
        &:hover {
          background: #a7f3d0;
        }
      }
      
      &.reject {
        background: #fee2e2;
        color: #991b1b;
        border: 1px solid #fecaca;
        
        &:hover {
          background: #fecaca;
        }
      }
      
      &.view {
        background: #dbeafe;
        color: #1e40af;
        border: 1px solid #93c5fd;
        
        &:hover {
          background: #93c5fd;
        }
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
  
  p {
    font-size: 0.875rem;
  }
`;

const RecruiterDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch recruiter's jobs
  const { data: myJobs, isLoading: jobsLoading } = useQuery(
    'myJobs',
    () => jobsAPI.getMyJobs(),
    {
      refetchOnWindowFocus: false,
    }
  );

  // Fetch received applications
  const { data: applications, isLoading: applicationsLoading } = useQuery(
    'receivedApplications',
    () => applicationsAPI.getReceivedApplications(),
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleApplicationStatus = async (applicationId, status) => {
    try {
      await applicationsAPI.updateApplicationStatus(applicationId, status);
      toast.success(`Application ${status} successfully`);
    } catch (error) {
      toast.error('Failed to update application status');
    }
  };

  const stats = [
    {
      icon: FiBriefcase,
      number: myJobs?.length || 0,
      label: 'Active Jobs',
      color: '#3b82f6'
    },
    {
      icon: FiUsers,
      number: applications?.length || 0,
      label: 'Total Applications',
      color: '#10b981'
    },
    {
      icon: FiTrendingUp,
      number: 0, // This would come from analytics
      label: 'Profile Views',
      color: '#f59e0b'
    },
    {
      icon: FiMessageCircle,
      number: 0, // This would come from AI chatbot usage
      label: 'AI Consultations',
      color: '#8b5cf6'
    }
  ];

  if (jobsLoading || applicationsLoading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  return (
    <DashboardContainer>
      <WelcomeSection>
        <h1>Recruiter Dashboard</h1>
        <p>Manage your job postings and find the best candidates</p>
      </WelcomeSection>

      <StatsGrid>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <div className="icon" style={{ background: stat.color }}>
              <stat.icon />
            </div>
            <div className="content">
              <div className="number">{stat.number}</div>
              <div className="label">{stat.label}</div>
            </div>
          </StatCard>
        ))}
      </StatsGrid>

      <Section>
        <SectionHeader>
          <div>
            <h2>My Job Postings</h2>
            <p>Manage your active job postings</p>
          </div>
          <Button>
            <FiPlus />
            Post New Job
          </Button>
        </SectionHeader>
        <SectionContent>
          {myJobs?.length > 0 ? (
            myJobs.map((job) => (
              <JobCard key={job._id}>
                <div className="job-title">{job.title}</div>
                <div className="company">{job.company}</div>
                <div className="location">{job.location}</div>
                <div className="salary">₹{job.salary.toLocaleString()}</div>
                <div className="applications">
                  <span className="count">{job.applications.length} applications</span>
                  <Button>
                    <FiEye />
                    View Applications
                  </Button>
                </div>
              </JobCard>
            ))
          ) : (
            <EmptyState>
              <FiBriefcase className="icon" />
              <h3>No job postings yet</h3>
              <p>Create your first job posting to start attracting candidates</p>
            </EmptyState>
          )}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <h2>Recent Applications</h2>
          <p>Review and manage job applications</p>
        </SectionHeader>
        <SectionContent>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <FiSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input
                type="text"
                placeholder="Search applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem'
                }}
              />
            </div>
            <button
              style={{
                padding: '0.75rem',
                border: '1px solid #d1d5db',
                borderRadius: '0.5rem',
                background: 'white',
                cursor: 'pointer'
              }}
            >
              <FiFilter />
            </button>
          </div>

          {applications?.length > 0 ? (
            applications.map((application) => (
              <ApplicationCard key={application._id}>
                <div className="candidate-name">{application.jobseekerId?.name}</div>
                <div className="job-title">{application.jobId?.title}</div>
                <div className="skills">
                  {application.jobseekerId?.skills?.map((skill, index) => (
                    <span key={index} className="skill">{skill}</span>
                  ))}
                </div>
                <div className="actions">
                  <button 
                    className="view"
                    onClick={() => {/* Navigate to candidate profile */}}
                  >
                    View Profile
                  </button>
                  <button 
                    className="accept"
                    onClick={() => handleApplicationStatus(application._id, 'accepted')}
                  >
                    Accept
                  </button>
                  <button 
                    className="reject"
                    onClick={() => handleApplicationStatus(application._id, 'rejected')}
                  >
                    Reject
                  </button>
                </div>
              </ApplicationCard>
            ))
          ) : (
            <EmptyState>
              <FiUsers className="icon" />
              <h3>No applications yet</h3>
              <p>Applications will appear here when candidates apply to your jobs</p>
            </EmptyState>
          )}
        </SectionContent>
      </Section>
    </DashboardContainer>
  );
};

export default RecruiterDashboard;
>>>>>>> 6da5be8cee5bf37ced3c94567921457d10bf2dea
