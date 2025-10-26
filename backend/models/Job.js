const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide job title'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide job description']
  },
  requirements: {
    type: [String],
    default: []
  },
  skills: {
    type: [String],
    default: []
  },
  location: {
    type: String,
    required: [true, 'Please provide location'],
    trim: true
  },
  salary: {
    type: Number,
    required: [true, 'Please provide salary']
  },
  employmentType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Internship'],
    default: 'Full-time'
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_info',
    required: true
  },
  applications: [{
    jobseeker: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user_info'
    },
    appliedAt: {
      type: Date,
      default: Date.now
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'rejected', 'accepted'],
      default: 'pending'
    },
    coverLetter: {
      type: String,
      default: ''
    }
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('jobs', jobSchema);

