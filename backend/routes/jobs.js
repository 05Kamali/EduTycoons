const express = require('express');
const Job = require('../models/Job');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { location, employmentType, skills, search } = req.query;
    let query = {};
    
    if (location) query.location = new RegExp(location, 'i');
    if (employmentType) query.employmentType = employmentType;
    if (skills) query.skills = { $in: [skills] };
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { company: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }
    
    const jobs = await Job.find(query).populate('postedBy', 'name email').sort({ createdAt: -1 });
    res.json({ success: true, jobs });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/jobs/recommended
// @desc    Get recommended jobs for job seeker
// @access  Private
router.get('/recommended', auth, async (req, res) => {
  try {
    const user = await require('../models/User').findById(req.user._id);
    const jobs = await Job.find({
      $or: [
        { skills: { $in: user.skills } }
      ]
    }).populate('postedBy', 'name email').limit(10);
    
    // Calculate match percentage for each job
    const jobsWithMatch = jobs.map(job => {
      const matchingSkills = job.skills.filter(skill => user.skills.includes(skill));
      const matchPercentage = (matchingSkills.length / job.skills.length) * 100;
      
      return {
        ...job.toObject(),
        matchPercentage: Math.round(matchPercentage)
      };
    });
    
    res.json({ success: true, jobs: jobsWithMatch });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate('postedBy', 'name email');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/jobs
// @desc    Create new job
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      postedBy: req.user._id
    });
    
    res.status(201).json({ success: true, job });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update job
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ success: true, job });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete job
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    res.json({ success: true, message: 'Job deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/jobs/:id/apply
// @desc    Apply for job
// @access  Private
router.post('/:id/apply', auth, async (req, res) => {
  try {
    const { coverLetter } = req.body;
    const job = await Job.findById(req.params.id);
    
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    
    // Check if already applied
    const existingApplication = job.applications.find(
      app => app.jobseeker.toString() === req.user._id.toString()
    );
    
    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }
    
    job.applications.push({
      jobseeker: req.user._id,
      appliedAt: new Date(),
      status: 'pending',
      coverLetter
    });
    
    await job.save();
    
    // Create application record
    const Application = require('../models/Application');
    const application = await Application.create({
      jobId: job._id,
      jobseekerId: req.user._id,
      recruiterId: job.postedBy,
      status: 'pending',
      coverLetter
    });
    
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

