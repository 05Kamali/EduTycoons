<<<<<<< HEAD
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobseekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'rejected', 'accepted'],
    default: 'pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  coverLetter: {
    type: String,
    maxlength: 1000
  }
}, {
  timestamps: true
});

// Ensure one application per job per jobseeker
applicationSchema.index({ jobId: 1, jobseekerId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
=======
const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  jobseekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'rejected', 'accepted'],
    default: 'pending'
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
  coverLetter: {
    type: String,
    maxlength: 1000
  }
}, {
  timestamps: true
});

// Ensure one application per job per jobseeker
applicationSchema.index({ jobId: 1, jobseekerId: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
>>>>>>> 6da5be8cee5bf37ced3c94567921457d10bf2dea
