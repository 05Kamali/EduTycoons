const express = require('express');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get user profile
// @access  Private
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/users/jobseekers
// @desc    Get all job seekers
// @access  Private
router.get('/jobseekers', auth, async (req, res) => {
  try {
    const users = await User.find({ role: 'jobseeker' });
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/users/:id
// @desc    Get user by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/users/profile
// @desc    Update user profile
// @access  Private
router.put('/profile', auth, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { ...req.body, profileCompleted: true },
      { new: true, runValidators: true }
    );
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/users/goals
// @desc    Add daily goals
// @access  Private
router.post('/goals', auth, async (req, res) => {
  try {
    const { goals } = req.body;
    const user = await User.findById(req.user._id);
    
    const completed = goals.map(() => false);
    
    const todayGoal = {
      date: new Date(),
      goals,
      completed
    };
    
    user.dailyGoals.push(todayGoal);
    await user.save();
    
    res.json({ success: true, goal: todayGoal });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/users/goals/:goalId
// @desc    Update goal completion
// @access  Private
router.put('/goals/:goalId', auth, async (req, res) => {
  try {
    const { completed } = req.body;
    const user = await User.findById(req.user._id);
    
    const goal = user.dailyGoals.id(req.params.goalId);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    
    goal.completed = completed;
    await user.save();
    
    res.json({ success: true, goal });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

