const asyncHandler = require("express-async-handler");
const Task = require("../../models/tasks/task-model");

const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;
    if (
      !title ||
      !description ||
      title.trim().length === 0 ||
      description.trim().length === 0
    ) {
      res.status(400).json({
        message: "Please provide title and description",
      });
    }

    const newTask = new Task({
      title,
      description,
      dueDate,
      priority,
      status,
      user: req.user._id,
    });

    await newTask.save();
    res.status(201).json({
      message: "Task created successfully",
      task: newTask,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

const getTasks = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      res.status(400).json({
        message: "User not found",
      });
    }
    const tasks = await Task.find({ user: userId });
    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (err) {
    console.log(`Error in getTask: ${err.message}`);
    res.status(500).json({
      message: err.message,
    });
  }
});

const getTask = asyncHandler(async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user._id;
    if (!taskId) {
      res.status(400).json({
        message: "Task not found",
      });
    }
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(404).json({
        message: "Task not found",
      });
    }
    res.status(200).json({
      task,
    });
  } catch (err) {
    console.log(`Error in getTask: ${err.message}`);
    res.status(500).json({
      message: err.message,
    });
  }
});

const updateTask = asyncHandler(async (req, res) => {
  try {
    const taskId = req.params.id;
    const { title, description, priority, status, dueDate, completed } =
      req.body;
    if (!taskId) {
      res.status(400).json({
        message: "Task not found",
      });
    }
    const task = await Task.findById(taskId);

    if (!task) {
      res.status(404).json({
        message: "Task not found",
      });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.dueDate = dueDate || task.dueDate;
    task.completed = completed || task.completed;

    await task.save();

    res.status(200).json({
      task,
    });
  } catch (err) {
    console.log(`Error in getTask: ${err.message}`);
    res.status(500).json({
      message: err.message,
    });
  }
});

const deleteTask = asyncHandler(async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      res.status(400).json({ state: false, message: "Task not found" });
    }
    const task = await Task.findById({ _id: id });
    if (!task) {
      res.status(404).json({ state: false, message: "Task not found" });
    }
    await task.deleteOne();
    res.status(200).json({ state: true, message: "Task deleted successfully" });
  } catch (err) {
    console.log(`Error in deleteTask: ${err.message}`);
    res.status(500).json({
      message: err.message,
    });
  }
});
module.exports = {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
};
