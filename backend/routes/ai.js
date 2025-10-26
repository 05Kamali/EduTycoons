const express = require('express');
const axios = require('axios');
const OpenAI = require('openai');
const { auth } = require('../middleware/auth');

const router = express.Router();

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'your-openai-api-key'
});

// @route   POST /api/ai/chatbot
// @desc    AI chatbot for career guidance
// @access  Private
router.post('/chatbot', auth, async (req, res) => {
  try {
    const { message, userRole } = req.body;

    if (!message) {
      return res.status(400).json({ message: 'Message is required' });
    }

    const systemPrompt = userRole === 'jobseeker' 
      ? `You are an AI career counselor for job seekers. Provide helpful advice on:
         - Career planning and development
         - Skill improvement strategies
         - Job search techniques
         - Interview preparation
         - Resume and portfolio building
         - Industry insights and trends
         
         Be encouraging, practical, and specific in your responses.`
      : `You are an AI assistant for recruiters. Provide helpful advice on:
         - Talent acquisition strategies
         - Candidate evaluation techniques
         - Interview best practices
         - Employer branding
         - Recruitment trends
         - Team building and management
         
         Be professional, insightful, and practical in your responses.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.7
    });

    res.json({
      response: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenAI API error:', error);
    res.status(500).json({ message: 'AI service temporarily unavailable' });
  }
});

// @route   GET /api/ai/learning-resources
// @desc    Get learning resources from external APIs
// @access  Private
router.get('/learning-resources', auth, async (req, res) => {
  try {
    const { skill, type = 'all' } = req.query;

    if (!skill) {
      return res.status(400).json({ message: 'Skill parameter is required' });
    }

    const resources = {
      youtube: [],
      github: [],
      stackoverflow: [],
      coursera: []
    };

    // YouTube API (requires API key)
    if (process.env.YOUTUBE_API_KEY && (type === 'all' || type === 'youtube')) {
      try {
        const youtubeResponse = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(skill + ' tutorial')}&type=video&key=${process.env.YOUTUBE_API_KEY}&maxResults=5`
        );
        
        resources.youtube = youtubeResponse.data.items.map(item => ({
          title: item.snippet.title,
          description: item.snippet.description,
          videoId: item.id.videoId,
          thumbnail: item.snippet.thumbnails.default.url,
          url: `https://www.youtube.com/watch?v=${item.id.videoId}`
        }));
      } catch (error) {
        console.error('YouTube API error:', error.message);
      }
    }

    // GitHub API
    if (type === 'all' || type === 'github') {
      try {
        const githubResponse = await axios.get(
          `https://api.github.com/search/repositories?q=${encodeURIComponent(skill)}&sort=stars&order=desc&per_page=5`
        );
        
        resources.github = githubResponse.data.items.map(repo => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
          url: repo.html_url,
          topics: repo.topics || []
        }));
      } catch (error) {
        console.error('GitHub API error:', error.message);
      }
    }

    // Stack Overflow API
    if (type === 'all' || type === 'stackoverflow') {
      try {
        const stackoverflowResponse = await axios.get(
          `https://api.stackexchange.com/2.3/questions?order=desc&sort=votes&tagged=${encodeURIComponent(skill)}&site=stackoverflow&pagesize=5`
        );
        
        resources.stackoverflow = stackoverflowResponse.data.items.map(question => ({
          title: question.title,
          score: question.score,
          answerCount: question.answer_count,
          tags: question.tags,
          url: question.link,
          isAnswered: question.is_answered
        }));
      } catch (error) {
        console.error('Stack Overflow API error:', error.message);
      }
    }

    res.json(resources);
  } catch (error) {
    console.error('Learning resources error:', error);
    res.status(500).json({ message: 'Failed to fetch learning resources' });
  }
});

// @route   POST /api/ai/skill-recommendations
// @desc    Get skill improvement recommendations
// @access  Private
router.post('/skill-recommendations', auth, async (req, res) => {
  try {
    const { currentSkills, targetRole, experience } = req.body;

    if (!currentSkills || !targetRole) {
      return res.status(400).json({ message: 'Current skills and target role are required' });
    }

    const prompt = `Based on the following information, provide skill improvement recommendations:
    
    Current Skills: ${currentSkills.join(', ')}
    Target Role: ${targetRole}
    Experience Level: ${experience || 'Entry level'}
    
    Please provide:
    1. Skills to learn/improve
    2. Learning path/roadmap
    3. Priority order
    4. Estimated time to learn each skill
    5. Resources for each skill
    
    Format as a structured response.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a career development expert specializing in skill assessment and learning path recommendations." },
        { role: "user", content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.7
    });

    res.json({
      recommendations: completion.choices[0].message.content
    });
  } catch (error) {
    console.error('Skill recommendations error:', error);
    res.status(500).json({ message: 'Failed to generate skill recommendations' });
  }
});

// @route   POST /api/ai/job-matching
// @desc    Smart job matching algorithm
// @access  Private
router.post('/job-matching', auth, async (req, res) => {
  try {
    const { userSkills, userExperience, userLocation, jobRequirements } = req.body;

    if (!userSkills || !jobRequirements) {
      return res.status(400).json({ message: 'User skills and job requirements are required' });
    }

    // Calculate skill match percentage
    const matchingSkills = userSkills.filter(skill => 
      jobRequirements.skills.includes(skill)
    );
    const skillMatchPercentage = (matchingSkills.length / jobRequirements.skills.length) * 100;

    // Calculate experience match
    const experienceMatch = userExperience >= jobRequirements.minExperience ? 100 : 
      (userExperience / jobRequirements.minExperience) * 100;

    // Calculate location match (simplified)
    const locationMatch = userLocation === jobRequirements.location ? 100 : 50;

    // Overall match score
    const overallMatch = Math.round(
      (skillMatchPercentage * 0.5) + 
      (experienceMatch * 0.3) + 
      (locationMatch * 0.2)
    );

    const matchAnalysis = {
      overallMatch,
      skillMatch: {
        percentage: Math.round(skillMatchPercentage),
        matchingSkills,
        missingSkills: jobRequirements.skills.filter(skill => !userSkills.includes(skill))
      },
      experienceMatch: Math.round(experienceMatch),
      locationMatch: Math.round(locationMatch),
      recommendation: overallMatch >= 70 ? 'Strong Match' : 
                     overallMatch >= 50 ? 'Good Match' : 
                     overallMatch >= 30 ? 'Fair Match' : 'Weak Match'
    };

    res.json(matchAnalysis);
  } catch (error) {
    console.error('Job matching error:', error);
    res.status(500).json({ message: 'Failed to analyze job match' });
  }
});

module.exports = router;
