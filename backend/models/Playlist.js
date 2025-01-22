const mongoose = require("mongoose");

// Track Schema
const trackSchema = new mongoose.Schema({
  trackId: { type: String, required: true },
  trackName: { type: String, required: true },
  artistName: { type: String, required: true },
  albumName: { type: String },
  albumArt: { type: String },
  duration: { type: Number, required: true },
  trackUrl: { type: String, required: true },
});

// Playlist Schema
const playlistSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  tracks: [trackSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
