<<<<<<< HEAD
const express = require('express');
const { body, validationResult } = require('express-validator');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      title, 
      company, 
      location, 
      skills, 
      employmentType, 
      minSalary, 
      maxSalary,
      page = 1,
      limit = 10 
    } = req.query;

    let query = { isActive: true };

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (skills) {
      query.skills = { $in: skills.split(',') };
    }
    if (employmentType) {
      query.employmentType = employmentType;
    }
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = parseInt(minSalary);
      if (maxSalary) query.salary.$lte = parseInt(maxSalary);
    }

    const jobs = await Job.find(query)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email')
      .populate('applications.jobseeker', 'name email skills experience');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/jobs
// @desc    Create new job
// @access  Private (Recruiters only)
router.post('/', auth, authorize('recruiter'), [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('company').trim().isLength({ min: 1 }).withMessage('Company is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('requirements').isArray().withMessage('Requirements must be an array'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('employmentType').isIn(['Full-time', 'Part-time', 'Contract', 'Internship']).withMessage('Invalid employment type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const jobData = {
      ...req.body,
      postedBy: req.user._id
    };

    const job = new Job(jobData);
    await job.save();

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update job
// @access  Private (Job owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete job
// @access  Private (Job owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/jobs/:id/apply
// @desc    Apply for job
// @access  Private (Job seekers only)
router.post('/:id/apply', auth, authorize('jobseeker'), [
  body('coverLetter').optional().trim().isLength({ max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId: req.params.id,
      jobseekerId: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    // Create application
    const application = new Application({
      jobId: req.params.id,
      jobseekerId: req.user._id,
      recruiterId: job.postedBy,
      coverLetter: req.body.coverLetter || ''
    });

    await application.save();

    // Add to job applications array
    job.applications.push({
      jobseeker: req.user._id,
      appliedAt: new Date(),
      status: 'pending'
    });

    await job.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs/my-jobs
// @desc    Get jobs posted by current user
// @access  Private (Recruiters only)
router.get('/my-jobs', auth, authorize('recruiter'), async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .populate('applications.jobseeker', 'name email skills experience')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs/recommended
// @desc    Get recommended jobs for job seeker
// @access  Private (Job seekers only)
router.get('/recommended', auth, authorize('jobseeker'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.skills || user.skills.length === 0) {
      return res.json([]);
    }

    // Find jobs with matching skills
    const jobs = await Job.find({
      isActive: true,
      skills: { $in: user.skills }
    })
    .populate('postedBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(10);

    // Calculate match percentage
    const jobsWithMatch = jobs.map(job => {
      const matchingSkills = job.skills.filter(skill => 
        user.skills.includes(skill)
      );
      const matchPercentage = (matchingSkills.length / job.skills.length) * 100;
      
      return {
        ...job.toObject(),
        matchPercentage: Math.round(matchPercentage)
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json(jobsWithMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
=======
const express = require('express');
const { body, validationResult } = require('express-validator');
const Job = require('../models/Job');
const Application = require('../models/Application');
const { auth, authorize } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/jobs
// @desc    Get all jobs
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      title, 
      company, 
      location, 
      skills, 
      employmentType, 
      minSalary, 
      maxSalary,
      page = 1,
      limit = 10 
    } = req.query;

    let query = { isActive: true };

    if (title) {
      query.title = { $regex: title, $options: 'i' };
    }
    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }
    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }
    if (skills) {
      query.skills = { $in: skills.split(',') };
    }
    if (employmentType) {
      query.employmentType = employmentType;
    }
    if (minSalary || maxSalary) {
      query.salary = {};
      if (minSalary) query.salary.$gte = parseInt(minSalary);
      if (maxSalary) query.salary.$lte = parseInt(maxSalary);
    }

    const jobs = await Job.find(query)
      .populate('postedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Job.countDocuments(query);

    res.json({
      jobs,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs/:id
// @desc    Get job by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const job = await Job.findById(req.params.id)
      .populate('postedBy', 'name email')
      .populate('applications.jobseeker', 'name email skills experience');

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/jobs
// @desc    Create new job
// @access  Private (Recruiters only)
router.post('/', auth, authorize('recruiter'), [
  body('title').trim().isLength({ min: 1 }).withMessage('Title is required'),
  body('company').trim().isLength({ min: 1 }).withMessage('Company is required'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('requirements').isArray().withMessage('Requirements must be an array'),
  body('skills').isArray().withMessage('Skills must be an array'),
  body('location').trim().isLength({ min: 1 }).withMessage('Location is required'),
  body('salary').isNumeric().withMessage('Salary must be a number'),
  body('employmentType').isIn(['Full-time', 'Part-time', 'Contract', 'Internship']).withMessage('Invalid employment type')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const jobData = {
      ...req.body,
      postedBy: req.user._id
    };

    const job = new Job(jobData);
    await job.save();

    res.status(201).json(job);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/jobs/:id
// @desc    Update job
// @access  Private (Job owner only)
router.put('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedJob = await Job.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedJob);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/jobs/:id
// @desc    Delete job
// @access  Private (Job owner only)
router.delete('/:id', auth, async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    if (job.postedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Job.findByIdAndDelete(req.params.id);
    res.json({ message: 'Job deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/jobs/:id/apply
// @desc    Apply for job
// @access  Private (Job seekers only)
router.post('/:id/apply', auth, authorize('jobseeker'), [
  body('coverLetter').optional().trim().isLength({ max: 1000 })
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const job = await Job.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    // Check if already applied
    const existingApplication = await Application.findOne({
      jobId: req.params.id,
      jobseekerId: req.user._id
    });

    if (existingApplication) {
      return res.status(400).json({ message: 'Already applied for this job' });
    }

    // Create application
    const application = new Application({
      jobId: req.params.id,
      jobseekerId: req.user._id,
      recruiterId: job.postedBy,
      coverLetter: req.body.coverLetter || ''
    });

    await application.save();

    // Add to job applications array
    job.applications.push({
      jobseeker: req.user._id,
      appliedAt: new Date(),
      status: 'pending'
    });

    await job.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs/my-jobs
// @desc    Get jobs posted by current user
// @access  Private (Recruiters only)
router.get('/my-jobs', auth, authorize('recruiter'), async (req, res) => {
  try {
    const jobs = await Job.find({ postedBy: req.user._id })
      .populate('applications.jobseeker', 'name email skills experience')
      .sort({ createdAt: -1 });

    res.json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/jobs/recommended
// @desc    Get recommended jobs for job seeker
// @access  Private (Job seekers only)
router.get('/recommended', auth, authorize('jobseeker'), async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    
    if (!user.skills || user.skills.length === 0) {
      return res.json([]);
    }

    // Find jobs with matching skills
    const jobs = await Job.find({
      isActive: true,
      skills: { $in: user.skills }
    })
    .populate('postedBy', 'name email')
    .sort({ createdAt: -1 })
    .limit(10);

    // Calculate match percentage
    const jobsWithMatch = jobs.map(job => {
      const matchingSkills = job.skills.filter(skill => 
        user.skills.includes(skill)
      );
      const matchPercentage = (matchingSkills.length / job.skills.length) * 100;
      
      return {
        ...job.toObject(),
        matchPercentage: Math.round(matchPercentage)
      };
    }).sort((a, b) => b.matchPercentage - a.matchPercentage);

    res.json(jobsWithMatch);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
>>>>>>> 6da5be8cee5bf37ced3c94567921457d10bf2dea
