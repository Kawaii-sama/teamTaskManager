const express = require("express");
const router = express.Router();

const Task = require("../models/Task");
const Project = require("../models/Project");

router.get("/", async (req, res) => {
  try {

    const totalProjects = await Project.countDocuments();

    const totalTasks = await Task.countDocuments();

    const completedTasks = await Task.countDocuments({
      status: "Completed"
    });

    const pendingTasks = await Task.countDocuments({
      status: "Pending"
    });

    const overdueTasks = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "Completed" }
    });

    res.json({
      totalProjects,
      totalTasks,
      completedTasks,
      pendingTasks,
      overdueTasks
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;