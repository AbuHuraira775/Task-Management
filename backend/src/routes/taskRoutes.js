const express = require('express');
const router = express.Router();
const { createTask } = require('../controllers/task/taskController');

router.post('/create-task',(req,res)=>{
    res.send('Create Task');
})

module.exports = router;