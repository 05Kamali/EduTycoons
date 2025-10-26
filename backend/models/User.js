const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
    select: false
  },
  role: {
    type: String,
    enum: ['jobseeker', 'recruiter'],
    required: [true, 'Please provide a role']
  },
  skills: {
    type: [String],
    default: []
  },
  experience: {
    type: Number,
    default: 0
  },
  education: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  bio: {
    type: String,
    default: ''
  },
  resume: {
    type: String,
    default: ''
  },
  profileCompleted: {
    type: Boolean,
    default: false
  },
  dailyGoals: [{
    date: {
      type: Date,
      default: Date.now
    },
    goals: [String],
    completed: [Boolean]
  }],
  skillImprovements: [{
    skill: String,
    level: String,
    progress: {
      type: Number,
      default: 0
    },
    resources: [String]
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('user_info', userSchema);

