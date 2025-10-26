const express = require('express');
const PlacementRecord = require('../models/PlacementRecord');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/placements
// @desc    Get all placement records
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const { studentName, department, company, role, year } = req.query;
    let query = {};
    
    if (studentName) query.studentName = new RegExp(studentName, 'i');
    if (department) query.department = new RegExp(department, 'i');
    if (company) query.company = new RegExp(company, 'i');
    if (role) query.role = new RegExp(role, 'i');
    if (year) query.year = year;
    
    const placements = await PlacementRecord.find(query).sort({ createdAt: -1 });
    res.json({ success: true, placements });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   POST /api/placements
// @desc    Create new placement record
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const placement = await PlacementRecord.create({
      ...req.body,
      addedBy: req.user._id
    });
    
    res.status(201).json({ success: true, placement });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/placements/:id
// @desc    Get placement by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const placement = await PlacementRecord.findById(req.params.id);
    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }
    res.json({ success: true, placement });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   PUT /api/placements/:id
// @desc    Update placement record
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const placement = await PlacementRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }
    
    res.json({ success: true, placement });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   DELETE /api/placements/:id
// @desc    Delete placement record
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const placement = await PlacementRecord.findByIdAndDelete(req.params.id);
    
    if (!placement) {
      return res.status(404).json({ message: 'Placement not found' });
    }
    
    res.json({ success: true, message: 'Placement deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;

