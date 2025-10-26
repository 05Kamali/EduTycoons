<<<<<<< HEAD
const express = require('express');
const { body, validationResult } = require('express-validator');
const PlacementRecord = require('../models/PlacementRecord');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/placements
// @desc    Get all placement records
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      studentName, 
      department, 
      company, 
      role, 
      year, 
      minPackage, 
      maxPackage,
      search 
    } = req.query;

    let query = {};

    if (studentName) {
      query.studentName = { $regex: studentName, $options: 'i' };
    }
    if (department) {
      query.department = { $regex: department, $options: 'i' };
    }
    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }
    if (role) {
      query.role = { $regex: role, $options: 'i' };
    }
    if (year) {
      query.year = parseInt(year);
    }
    if (minPackage || maxPackage) {
      query.package = {};
      if (minPackage) query.package.$gte = parseInt(minPackage);
      if (maxPackage) query.package.$lte = parseInt(maxPackage);
    }
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    const placements = await PlacementRecord.find(query)
      .populate('addedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(placements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/placements
// @desc    Add new placement record
// @access  Private
router.post('/', auth, [
  body('studentName').trim().isLength({ min: 1 }).withMessage('Student name is required'),
  body('department').trim().isLength({ min: 1 }).withMessage('Department is required'),
  body('company').trim().isLength({ min: 1 }).withMessage('Company is required'),
  body('role').trim().isLength({ min: 1 }).withMessage('Role is required'),
  body('year').isNumeric().withMessage('Year must be a number'),
  body('package').isNumeric().withMessage('Package must be a number'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const placementData = {
      ...req.body,
      addedBy: req.user._id
    };

    const placement = new PlacementRecord(placementData);
    await placement.save();

    res.status(201).json(placement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/placements/:id
// @desc    Update placement record
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const placement = await PlacementRecord.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: 'Placement record not found' });
    }

    if (placement.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedPlacement = await PlacementRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedPlacement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/placements/:id
// @desc    Delete placement record
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const placement = await PlacementRecord.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: 'Placement record not found' });
    }

    if (placement.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await PlacementRecord.findByIdAndDelete(req.params.id);
    res.json({ message: 'Placement record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
=======
const express = require('express');
const { body, validationResult } = require('express-validator');
const PlacementRecord = require('../models/PlacementRecord');
const { auth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/placements
// @desc    Get all placement records
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { 
      studentName, 
      department, 
      company, 
      role, 
      year, 
      minPackage, 
      maxPackage,
      search 
    } = req.query;

    let query = {};

    if (studentName) {
      query.studentName = { $regex: studentName, $options: 'i' };
    }
    if (department) {
      query.department = { $regex: department, $options: 'i' };
    }
    if (company) {
      query.company = { $regex: company, $options: 'i' };
    }
    if (role) {
      query.role = { $regex: role, $options: 'i' };
    }
    if (year) {
      query.year = parseInt(year);
    }
    if (minPackage || maxPackage) {
      query.package = {};
      if (minPackage) query.package.$gte = parseInt(minPackage);
      if (maxPackage) query.package.$lte = parseInt(maxPackage);
    }
    if (search) {
      query.$or = [
        { studentName: { $regex: search, $options: 'i' } },
        { department: { $regex: search, $options: 'i' } },
        { company: { $regex: search, $options: 'i' } },
        { role: { $regex: search, $options: 'i' } }
      ];
    }

    const placements = await PlacementRecord.find(query)
      .populate('addedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json(placements);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/placements
// @desc    Add new placement record
// @access  Private
router.post('/', auth, [
  body('studentName').trim().isLength({ min: 1 }).withMessage('Student name is required'),
  body('department').trim().isLength({ min: 1 }).withMessage('Department is required'),
  body('company').trim().isLength({ min: 1 }).withMessage('Company is required'),
  body('role').trim().isLength({ min: 1 }).withMessage('Role is required'),
  body('year').isNumeric().withMessage('Year must be a number'),
  body('package').isNumeric().withMessage('Package must be a number'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const placementData = {
      ...req.body,
      addedBy: req.user._id
    };

    const placement = new PlacementRecord(placementData);
    await placement.save();

    res.status(201).json(placement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   PUT /api/placements/:id
// @desc    Update placement record
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const placement = await PlacementRecord.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: 'Placement record not found' });
    }

    if (placement.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedPlacement = await PlacementRecord.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedPlacement);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/placements/:id
// @desc    Delete placement record
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const placement = await PlacementRecord.findById(req.params.id);

    if (!placement) {
      return res.status(404).json({ message: 'Placement record not found' });
    }

    if (placement.addedBy.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await PlacementRecord.findByIdAndDelete(req.params.id);
    res.json({ message: 'Placement record deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
>>>>>>> 6da5be8cee5bf37ced3c94567921457d10bf2dea
