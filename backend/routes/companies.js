const express = require('express');
const Company = require('../models/Company');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/companies
// @desc    Get all companies
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const companies = await Company.find().populate('addedBy', 'name email');
    res.json({ success: true, companies });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/companies
// @desc    Create new company
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const company = await Company.create({
      ...req.body,
      addedBy: req.user._id
    });
    
    res.status(201).json({ success: true, company });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/companies/:id
// @desc    Get company by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).populate('addedBy', 'name email');
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.json({ success: true, company });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

