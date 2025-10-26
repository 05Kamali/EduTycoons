const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'jobs',
    required: true
  },
  jobseekerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_info',
    required: true
  },
  recruiterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_info',
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
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('applications', applicationSchema);

