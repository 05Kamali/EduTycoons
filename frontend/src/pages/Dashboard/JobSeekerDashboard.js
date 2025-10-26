import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { 
  FiBriefcase, 
  FiTrendingUp, 
  FiTarget, 
  FiBookOpen,
  FiMessageCircle,
  FiSearch,
  FiFilter
} from 'react-icons/fi';
import { jobsAPI, usersAPI } from '../../services/api';
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
  
  .match-score {
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    .score {
      background: #dbeafe;
      color: #1e40af;
      padding: 0.25rem 0.75rem;
      border-radius: 9999px;
      font-size: 0.75rem;
      font-weight: 500;
    }
  }
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
  
  &:hover {
    background: #2563eb;
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

const JobSeekerDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    employmentType: '',
    minSalary: ''
  });

  // Fetch recommended jobs
  const { data: recommendedJobs, isLoading: jobsLoading } = useQuery(
    'recommendedJobs',
    () => jobsAPI.getRecommendedJobs(),
    {
      refetchOnWindowFocus: false,
    }
  );

  // Fetch all jobs for search
  const { data: allJobs, isLoading: allJobsLoading } = useQuery(
    ['jobs', filters],
    () => jobsAPI.getJobs(filters),
    {
      refetchOnWindowFocus: false,
    }
  );

  const handleApplyJob = async (jobId) => {
    try {
      await jobsAPI.applyForJob(jobId, '');
      toast.success('Application submitted successfully!');
    } catch (error) {
      toast.error('Failed to apply for job');
    }
  };

  const filteredJobs = allJobs?.jobs?.filter(job =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const stats = [
    {
      icon: FiBriefcase,
      number: recommendedJobs?.length || 0,
      label: 'Recommended Jobs',
      color: '#3b82f6'
    },
    {
      icon: FiTarget,
      number: 0, // This would come from applications API
      label: 'Applications Sent',
      color: '#10b981'
    },
    {
      icon: FiTrendingUp,
      number: 0, // This would come from profile completion
      label: 'Profile Views',
      color: '#f59e0b'
    },
    {
      icon: FiBookOpen,
      number: 0, // This would come from learning progress
      label: 'Skills Learned',
      color: '#8b5cf6'
    }
  ];

  if (jobsLoading) {
    return <LoadingSpinner text="Loading your dashboard..." />;
  }

  return (
    <DashboardContainer>
      <WelcomeSection>
        <h1>Welcome to your Career Dashboard</h1>
        <p>Track your progress, discover opportunities, and advance your career</p>
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
          <h2>Recommended Jobs</h2>
          <p>Jobs matched to your skills and preferences</p>
        </SectionHeader>
        <SectionContent>
          {recommendedJobs?.length > 0 ? (
            recommendedJobs.map((job) => (
              <JobCard key={job._id}>
                <div className="job-title">{job.title}</div>
                <div className="company">{job.company}</div>
                <div className="location">{job.location}</div>
                <div className="salary">₹{job.salary.toLocaleString()}</div>
                <div className="skills">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="skill">{skill}</span>
                  ))}
                </div>
                <div className="match-score">
                  <Button onClick={() => handleApplyJob(job._id)}>
                    Apply Now
                  </Button>
                  <span className="score">{job.matchPercentage}% Match</span>
                </div>
              </JobCard>
            ))
          ) : (
            <EmptyState>
              <FiBriefcase className="icon" />
              <h3>No recommended jobs yet</h3>
              <p>Complete your profile to get personalized job recommendations</p>
            </EmptyState>
          )}
        </SectionContent>
      </Section>

      <Section>
        <SectionHeader>
          <h2>All Jobs</h2>
          <p>Browse all available job opportunities</p>
        </SectionHeader>
        <SectionContent>
          <div style={{ marginBottom: '1rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <FiSearch style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: '#6b7280' }} />
              <input
                type="text"
                placeholder="Search jobs..."
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

          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <JobCard key={job._id}>
                <div className="job-title">{job.title}</div>
                <div className="company">{job.company}</div>
                <div className="location">{job.location}</div>
                <div className="salary">₹{job.salary.toLocaleString()}</div>
                <div className="skills">
                  {job.skills.map((skill, index) => (
                    <span key={index} className="skill">{skill}</span>
                  ))}
                </div>
                <div className="match-score">
                  <Button onClick={() => handleApplyJob(job._id)}>
                    Apply Now
                  </Button>
                </div>
              </JobCard>
            ))
          ) : (
            <EmptyState>
              <FiBriefcase className="icon" />
              <h3>No jobs found</h3>
              <p>Try adjusting your search criteria</p>
            </EmptyState>
          )}
        </SectionContent>
      </Section>
    </DashboardContainer>
  );
};

export default JobSeekerDashboard;
