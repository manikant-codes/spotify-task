const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllPlaylists,
  addPlaylist,
  getPlaylistById,
  updatePlaylist,
  deletePlaylist,
} = require("../controllers/playListControllers");
const playlistRouter = express.Router();

playlistRouter.get("/", authMiddleware, getAllPlaylists);
playlistRouter.get("/:id", authMiddleware, getPlaylistById);
playlistRouter.post("/", authMiddleware, addPlaylist);
playlistRouter.patch("/:id", authMiddleware, updatePlaylist);
playlistRouter.delete("/:id", authMiddleware, deletePlaylist);

module.exports = playlistRouter;
