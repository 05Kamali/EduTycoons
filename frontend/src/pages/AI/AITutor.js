import React, { useState } from 'react';
import styled from 'styled-components';
import { FiBookOpen, FiSearch } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { aiAPI } from '../../services/api';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Header = styled.div`
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

const SearchContainer = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 2rem;
`;

const SearchForm = styled.form`
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
    padding: 0.75rem 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    border-radius: 0.5rem;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease;
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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

const AITutor = () => {
  const [skill, setSkill] = useState('');
  const [loading, setLoading] = useState(false);
  const [resources, setResources] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!skill.trim()) return;

    setLoading(true);
    try {
      const response = await aiAPI.getLearningResources(skill, 'all');
      setResources(response.data);
      toast.success('Learning resources found!');
    } catch (error) {
      toast.error('Failed to fetch learning resources');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header>
        <h1><FiBookOpen style={{ display: 'inline', marginRight: '0.5rem' }} /> AI Tutor</h1>
        <p>Discover curated learning resources for any skill you want to learn</p>
      </Header>

      <SearchContainer>
        <SearchForm onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a skill to learn (e.g., React, Python, Machine Learning)"
            value={skill}
            onChange={(e) => setSkill(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            <FiSearch /> {loading ? 'Searching...' : 'Search'}
          </button>
        </SearchForm>
      </SearchContainer>

      {resources && (
        <div style={{ padding: '1rem', background: 'white', borderRadius: '0.75rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)' }}>
          <h2>Resources Found</h2>
          <p>Check the console for results or implement UI to display resources.</p>
        </div>
      )}

      {!resources && (
        <EmptyState>
          <FiBookOpen className="icon" />
          <h3>Search for learning resources</h3>
          <p>Enter a skill above to discover videos, repositories, and tutorials</p>
        </EmptyState>
      )}
    </Container>
  );
};

export default AITutor;

