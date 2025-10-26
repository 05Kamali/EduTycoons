const express = require('express');
const Application = require('../models/Application');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/applications/my-applications
// @desc    Get my applications (job seeker)
// @access  Private
router.get('/my-applications', auth, async (req, res) => {
  try {
    const applications = await Application.find({ jobseekerId: req.user._id })
      .populate('jobId')
      .populate('recruiterId', 'name email')
      .sort({ appliedDate: -1 });
    
    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/applications/received
// @desc    Get received applications (recruiter)
// @access  Private
router.get('/received', auth, async (req, res) => {
  try {
    const applications = await Application.find({ recruiterId: req.user._id })
      .populate('jobId')
      .populate('jobseekerId')
      .sort({ appliedDate: -1 });
    
    res.json({ success: true, applications });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/applications/:id/status
// @desc    Update application status
// @access  Private
router.put('/:id/status', auth, async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.json({ success: true, application });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

