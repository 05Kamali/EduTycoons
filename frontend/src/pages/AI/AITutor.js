import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { aiAPI } from '../../services/api';
import styled from 'styled-components';
import { FiBookOpen, FiExternalLink, FiSearch, FiLoader } from 'react-icons/fi';
import toast from 'react-hot-toast';

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

const ResourceSection = styled.div`
  margin-bottom: 2rem;
  
  h2 {
    font-size: 1.25rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

const ResourceCard = styled.div`
  background: white;
  border-radius: 0.75rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
  transition: all 0.2s ease;
  
  &:hover {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }
  
  .title {
    font-size: 1.125rem;
    font-weight: 600;
    color: #1a202c;
    margin-bottom: 0.5rem;
  }
  
  .description {
    color: #6b7280;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
  
  .meta {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    margin-bottom: 1rem;
    
    span {
      color: #6b7280;
      font-size: 0.875rem;
    }
  }
  
  a {
    color: #3b82f6;
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    
    &:hover {
      text-decoration: underline;
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
    const { user } = useAuth();
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

    const renderResources = (resourceList, title) => {
        if (!resourceList || resourceList.length === 0) return null;

        return (
            <ResourceSection>
                <h2>
                    {title === 'YouTube' && '📺'}
                    {title === 'GitHub' && '💻'}
                    {title === 'Stack Overflow' && '❓'}
                    {title}
                </h2>
                {resourceList.map((resource, index) => (
                    <ResourceCard key={index}>
                        <div className="title">{resource.title || resource.name}</div>
                        <div className="description">{resource.description}</div>
                        <div className="meta">
                            {resource.stars && <span>⭐ {resource.stars} stars</span>}
                            {resource.language && <span>💻 {resource.language}</span>}
                            {resource.score && <span>👍 {resource.score} votes</span>}
                            {resource.answerCount && <span>💬 {resource.answerCount} answers</span>}
                        </div>
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            View Resource <FiExternalLink />
                        </a>
                    </ResourceCard>
                ))}
            </ResourceSection>
        );
    };

    return (
        <Container>
            <Header>
                <h1>
                    <FiBookOpen style={{ display: 'inline', marginRight: '0.5rem' }} />
                    AI Tutor - Learning Resources
                </h1>
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
                        {loading ? <FiLoader className="spin" /> : <FiSearch />}
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </SearchForm>
            </SearchContainer>

            {resources && (
                <>
                    {renderResources(resources.youtube, 'YouTube')}
                    {renderResources(resources.github, 'GitHub')}
                    {renderResources(resources.stackoverflow, 'Stack Overflow')}
                </>
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

