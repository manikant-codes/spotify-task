require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connect = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const playlistRouter = require("./routes/playlistRoutes");

const PORT = process.env.PORT || 5000;
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/auth", authRouter);
app.use("/playlists", playlistRouter);

const start = async () => {
  try {
    await connect();
    console.log("Connected successfully to the database.");
    app.listen(PORT, () => {
      console.log("The server is listening on port 5000.");
    });
  } catch (error) {
    console.log("Failed to connect to the database.");
  }
};

start();
