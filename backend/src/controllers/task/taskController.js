const asyncHandler = require("express-async-handler");  
const Task = require("../../models/tasks/task-model");

const createTask = asyncHandler(async (req, res) => {
  //   try {
  //     const { title, description, dueDate, priority, status } = req.body;
  //     if (
  //       !title ||
  //       !description ||
  //       title.trim().length === 0 ||
  //       description.trim().length === 0
  //     ) {
  //       res.status(400).json({
  //         message: "Please provide title and description",
  //       });
  //     }

  //     const newTask = new Task({
  //       title,
  //       description,
  //       dueDate,
  //       priority,
  //       status,
  //       user: req.user._id,
  //     });

  //     await newTask.save();
  //     res.status(201).json({
  //       message: "Task created successfully",
  //       task: newTask,
  //     });
  //   }
  //   catch (err) {
  //     res.status(500).json({
  //       message: err.message,
  //     });
  //   }

  res.send("Task Created");
});
module.exports = {  
  createTask,
};  