const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connect = require("./src/db/connect.js");
const cookieParser = require("cookie-parser");
const errorHandler = require("./src/helpers/errorhandler.js");
const userRoutes = require("./src/routes/userRoutes.js");
const taskRoutes = require("./src/routes/taskRoutes.js");

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// error handler middleware
app.use(errorHandler);


app.use("/api/v1/auth", userRoutes); ;
app.use("/api/v1/task", taskRoutes); ;
const server = async () => {
  try {
    await connect();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.log("Failed to strt server.....", error.message);
    process.exit(1);
  }
};

server();
