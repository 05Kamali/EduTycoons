const express = require('express');
const { body, validationResult } = require('express-validator');
const Application = require('../models/Application');
const Job = require('../models/Job');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/applications/my-applications
// @desc    Get applications by current user
// @access  Private
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({
      jobseekerId: req.user._id
    })
    .populate('jobId', 'title company location salary employmentType')
    .populate('recruiterId', 'name email')
    .sort({ appliedDate: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/applications/received
// @desc    Get applications received by recruiter
// @access  Private (Recruiters only)
router.get('/received', auth, async (req, res) => {
  try {
    const applications = await Application.find({
      recruiterId: req.user._id
    })
    .populate('jobId', 'title company location salary employmentType')
    .populate('jobseekerId', 'name email skills experience education')
    .sort({ appliedDate: -1 });

    res.json(applications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Private (Recruiters only)
router.put('/:id/status', auth, [
  body('status').isIn(['pending', 'reviewed', 'rejected', 'accepted']).withMessage('Invalid status')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const application = await Application.findById(req.params.id);
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }

    if (application.recruiterId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = req.body.status;
    await application.save();

    res.json({ message: 'Application status updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
