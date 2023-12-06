require("dotenv").config();
require("./db");
const express = require("express");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

// 👇 Start handling routes here
const allRoutes = require("./routes/project.routes");
app.use("/api", allRoutes);

const projectRouter = require("./routes/project.routes");
app.use("/api", projectRouter);

const taskRouter = require("./routes/task.routes");
app.use("/api", taskRouter);


// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

module.exports = app;
