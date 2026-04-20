const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['student', 'client'],
    required: true,
  },
  // Fields for students
  creditScore: {
    type: Number,
    default: 0,
  },
  level: {
    type: String,
    enum: ['Beginner', 'Intermediate', 'Pro'],
    default: 'Beginner',
  },
  tasksCompleted: {
    type: Number,
    default: 0,
  },
  tasksApplied: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  lateSubmissions: {
    type: Number,
    default: 0,
  },
  xp: {
    type: Number,
    default: 0,
  },
  badges: [{
    type: String
  }],
}, {
  timestamps: true
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model('User', userSchema);
module.exports = User;
