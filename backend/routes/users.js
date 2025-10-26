const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, [
  body('name').optional().trim().isLength({ min: 2 }),
  body('skills').optional().isArray(),
  body('experience').optional().isNumeric(),
  body('education').optional().trim(),
  body('location').optional().trim(),
  body('bio').optional().trim().isLength({ max: 500 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, skills, experience, education, location, bio } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (skills) updateData.skills = skills;
    if (experience !== undefined) updateData.experience = experience;
    if (education) updateData.education = education;
    if (location) updateData.location = location;
    if (bio) updateData.bio = bio;
    
    updateData.profileCompleted = true;

    const user = await User.findByIdAndUpdate(
      req.user._id,
      updateData,
      { new: true, runValidators: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/users/daily-goals
// @desc    Add daily goals
// @access  Private
router.post('/daily-goals', auth, [
  body('goals').isArray().withMessage('Goals must be an array')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { goals } = req.body;
    const today = new Date().toDateString();
    
    // Check if goals already exist for today
    const user = await User.findById(req.user._id);
    const existingGoalIndex = user.dailyGoals.findIndex(
      goal => goal.date.toDateString() === today
    );

    if (existingGoalIndex !== -1) {
      user.dailyGoals[existingGoalIndex].goals = goals;
      user.dailyGoals[existingGoalIndex].completed = new Array(goals.length).fill(false);
    } else {
      user.dailyGoals.push({
        date: new Date(),
        goals,
        completed: new Array(goals.length).fill(false)
      });
    }

    await user.save();
    res.json({ message: 'Daily goals updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/users/daily-goals/:goalIndex
// @desc    Update goal completion status
// @access  Private
router.put('/daily-goals/:goalIndex', auth, async (req, res) => {
  try {
    const { goalIndex } = req.params;
    const today = new Date().toDateString();
    
    const user = await User.findById(req.user._id);
    const todayGoal = user.dailyGoals.find(
      goal => goal.date.toDateString() === today
    );

    if (!todayGoal) {
      return res.status(404).json({ message: 'No goals found for today' });
    }

    if (goalIndex >= todayGoal.completed.length) {
      return res.status(400).json({ message: 'Invalid goal index' });
    }

    todayGoal.completed[goalIndex] = !todayGoal.completed[goalIndex];
    await user.save();

    res.json({ message: 'Goal status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/jobseekers
// @desc    Get all job seekers (for recruiters)
// @access  Private (Recruiters only)
router.get('/jobseekers', auth, authorize('recruiter'), async (req, res) => {
  try {
    const { skills, experience, location } = req.query;
    
    let query = { role: 'jobseeker' };
    
    if (skills) {
      query.skills = { $in: skills.split(',') };
    }
    if (experience) {
      query.experience = { $gte: parseInt(experience) };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const jobseekers = await User.find(query)
      .select('-password -dailyGoals -skillImprovements')
      .sort({ createdAt: -1 });

    res.json(jobseekers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/users/suggested-candidates/:jobId
// @desc    Get suggested candidates for a job
// @access  Private (Recruiters only)
router.get('/suggested-candidates/:jobId', auth, authorize('recruiter'), async (req, res) => {
  try {
    const Job = require('../models/Job');
    const job = await Job.findById(req.params.jobId);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Find candidates with matching skills
    const candidates = await User.find({
      role: 'jobseeker',
      skills: { $in: job.skills },
      profileCompleted: true
    }).select('-password -dailyGoals -skillImprovements');

    // Sort by skill match percentage
    const candidatesWithMatch = candidates.map(candidate => {
      const matchingSkills = candidate.skills.filter(skill => 
        job.skills.includes(skill)
      );
      const matchPercentage = (matchingSkills.length / job.skills.length) * 100;
      
      return {
        ...candidate.toObject(),
        matchPercentage: Math.round(matchPercentage)
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json(candidatesWithMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
