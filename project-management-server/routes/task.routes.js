const router = require("express").Router();
const mongoose = require("mongoose");

const Task = require("../models/Task.model");
const Project = require("../models/Project.model");

// POST /api/tasks - Creates a new task
router.post("/tasks", (req, res, next) => {
  const { title, description, projectId } = req.body;

  Task.create({ title, description, project: projectId })
    .then((newTask) => {
      return Project.findByIdAndUpdate(projectId, {
        $push: { tasks: newTask._id },
      });
    })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//GET /api/tasks/:taskId - get individual task
router.get("/tasks/:taskId", (req, res, next) => {
  const { taskId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified task id is not valid" });
    return;
  }

  Task.findById(taskId)
    .then((task) => res.status(200).json(task))
    .catch((err) => res.json(err));
});

//PUT /api/tasks/:taskId - update task by Id
router.put("/tasks/:taskId", (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified task id is not valid" });
    return;
  }

  Task.findByIdAndUpdate(taskId, req.body, { new: true })
    .then((updatedTask) => res.json(updatedTask))
    .catch((err) => res.json(err));
});

//DELETE /api/tasks/:taskId - deletes specific task
router.delete("/tasks/:taskId", (req, res, next) => {
  const { taskId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Task.findByIdAndDelete(taskId)
    .then(() => res.json({ message: `Task with ${taskId} is removed.` }))
    .catch((err) => res.json(err));
});

module.exports = router;
