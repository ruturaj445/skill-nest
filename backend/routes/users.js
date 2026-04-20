const express = require('express');
const User = require('../models/User');
const router = express.Router();

// @route   GET /api/users/leaderboard
// @desc    Get student leaderboard
// @access  Public
router.get('/leaderboard', async (req, res) => {
  try {
    const students = await User.find({ role: 'student' })
      .select('name creditScore xp level')
      .sort({ creditScore: -1 })
      .limit(10);
    
    // Add rank
    const leaderboard = students.map((student, index) => ({
      rank: index + 1,
      id: student._id,
      name: student.name,
      creditScore: student.creditScore,
      xp: student.xp,
      level: student.level
    }));

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
