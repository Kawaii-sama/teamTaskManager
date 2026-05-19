const express = require("express");
const router = express.Router();

const Task = require("../models/Task");


// CREATE TASK
router.post("/create", async (req, res) => {
  try {
    const task = new Task(req.body);

    await task.save();

    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// GET ALL TASKS
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo")
      .populate("project");

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// UPDATE TASK STATUS
router.put("/:id", async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedTask);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// DELETE TASK
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: "Task deleted" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;