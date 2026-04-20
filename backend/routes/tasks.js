const express = require('express');
const Task = require('../models/Task');
const User = require('../models/User');
const { protect, clientOnly, studentOnly } = require('../middleware/auth');
const router = express.Router();

// @route   POST /api/tasks
// @desc    Create a task
// @access  Private/Client
router.post('/', protect, clientOnly, async (req, res) => {
  const { title, description, budget, difficulty, category } = req.body;

  try {
    const task = new Task({
      title,
      description,
      budget,
      difficulty,
      category,
      postedBy: req.user._id
    });

    const createdTask = await task.save();
    res.status(201).json(createdTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/tasks
// @desc    Get all active tasks
// @access  Public
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ status: 'open' }).populate('postedBy', 'name');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/tasks/client
// @desc    Get tasks posted by client
// @access  Private/Client
router.get('/client', protect, clientOnly, async (req, res) => {
  try {
    const tasks = await Task.find({ postedBy: req.user._id }).populate('applicants.user', 'name creditScore rating badge xp');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   GET /api/tasks/student
// @desc    Get tasks applied by student
// @access  Private/Student
router.get('/student', protect, studentOnly, async (req, res) => {
  try {
    const tasks = await Task.find({ 'applicants.user': req.user._id }).populate('postedBy', 'name');
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// @route   GET /api/tasks/:id
// @desc    Get task by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate('postedBy', 'name');
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   POST /api/tasks/:id/apply
// @desc    Apply for a task
// @access  Private/Student
router.post('/:id/apply', protect, studentOnly, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.status !== 'open') {
      return res.status(400).json({ message: 'Task is no longer open' });
    }

    const alreadyApplied = task.applicants.find(
      (a) => a.user.toString() === req.user._id.toString()
    );

    if (alreadyApplied) {
      return res.status(400).json({ message: 'You have already applied for this task' });
    }

    task.applicants.push({ user: req.user._id });
    await task.save();
    
    // Update user stats
    const user = await User.findById(req.user._id);
    user.tasksApplied += 1;
    await user.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// @route   PUT /api/tasks/:id/hire/:studentId
// @desc    Hire a student for a task
// @access  Private/Client
router.put('/:id/hire/:studentId', protect, clientOnly, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      if (task.postedBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to manage this task' });
      }
  
      const applicantIndex = task.applicants.findIndex(
        (a) => a.user.toString() === req.params.studentId
      );
  
      if (applicantIndex === -1) {
        return res.status(404).json({ message: 'Student has not applied for this task' });
      }
  
      task.applicants[applicantIndex].status = 'hired';
      task.status = 'in-progress';
      task.hiredApplicant = req.params.studentId;
      await task.save();
  
      res.json({ message: 'Student hired successfully', task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

// @route   PUT /api/tasks/:id/complete
// @desc    Mark task as completed
// @access  Private/Client
router.put('/:id/complete', protect, clientOnly, async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
  
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
  
      if (task.postedBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'Not authorized to manage this task' });
      }
      
      if(task.status !== 'in-progress') {
          return res.status(400).json({ message: 'Task is not in progress' });
      }
  
      task.status = 'completed';
      await task.save();

      // Update student stats
      if(task.hiredApplicant) {
          const student = await User.findById(task.hiredApplicant);
          if(student) {
              student.tasksCompleted += 1;
              student.xp += task.budget * 10;
              student.creditScore += 10;
              
              if(student.creditScore > 500) student.level = 'Intermediate';
              if(student.creditScore > 1000) student.level = 'Pro';

              await student.save();
          }
      }
  
      res.json({ message: 'Task marked as completed', task });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;
