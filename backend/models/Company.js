const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide company name'],
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  industry: {
    type: String,
    default: ''
  },
  website: {
    type: String,
    default: ''
  },
  logo: {
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

module.exports = mongoose.model('company', companySchema);

