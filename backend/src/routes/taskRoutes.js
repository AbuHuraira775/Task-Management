const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task/taskController');
const { protect } = require('../middleware/authMiddleware');

router.post('/create-task',protect,taskController.createTask);
router.get('/get-tasks',protect,taskController.getTasks);
router.get('/get-task/:id',protect,taskController.getTask);
router.get('/update-task/:id',protect,taskController.updateTask);
router.delete('/delete-task/:id',protect,taskController.deleteTask);

module.exports = router;