const express = require('express');
const Team = require('../models/Team');
const User = require('../models/User');
const { protect, studentOnly } = require('../middleware/auth');
const router = express.Router();

// @route   POST /api/teams
// @desc    Create a team
// @access  Private/Student
router.post('/', protect, studentOnly, async (req, res) => {
  const { name, description } = req.body;

  try {
    const teamExists = await Team.findOne({ name });
    if(teamExists) {
        return res.status(400).json({ message: 'Team name already exists' });
    }

    const team = new Team({
      name,
      description,
      members: [req.user._id]
    });

    const createdTeam = await team.save();
    res.status(201).json(createdTeam);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/teams
// @desc    Get all teams
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name level creditScore');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/teams/:id/join
// @desc    Join a team
// @access  Private/Student
router.post('/:id/join', protect, studentOnly, async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    const isMember = team.members.includes(req.user._id);

    if (isMember) {
      return res.status(400).json({ message: 'You are already a member of this team' });
    }

    team.members.push(req.user._id);
    await team.save();

    res.json({ message: 'Successfully joined the team', team });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
