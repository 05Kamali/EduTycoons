const mongoose = require('mongoose');

const placementRecordSchema = new mongoose.Schema({
  studentName: {
    type: String,
    required: [true, 'Please provide student name'],
    trim: true
  },
  department: {
    type: String,
    required: [true, 'Please provide department'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  role: {
    type: String,
    required: [true, 'Please provide role'],
    trim: true
  },
  year: {
    type: Number,
    required: [true, 'Please provide year']
  },
  package: {
    type: Number,
    required: [true, 'Please provide package/salary']
  },
  description: {
    type: String,
    default: ''
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user_info',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('placement_record', placementRecordSchema);

