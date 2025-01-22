const Playlist = require("../models/Playlist");

const getAllPlaylists = async (req, res) => {
  try {
    const playlist = await Playlist.find({ user: req.userId });
    res.status(200).json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res
        .status(404)
        .json({ success: false, message: "Playlist not found." });
    }

    res.status(200).json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const addPlaylist = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required." });
    }

    const playlist = await Playlist.create({
      name,
      description,
      user: req.userId,
    });

    res.status(200).json({ success: true, data: playlist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updatePlaylist = async (req, res) => {
  try {
    const { id } = req.params;
    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res
        .status(404)
        .json({ success: false, message: "Playlist not found." });
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ success: true, data: updatedPlaylist });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deletePlaylist = async (req, res) => {
  try {
    const { id } = req.params;

    const playlist = await Playlist.findById(id);

    if (!playlist) {
      return res
        .status(404)
        .json({ success: false, message: "Playlist not found." });
    }

    await Playlist.findByIdAndDelete(id);

    res.status(200).json({ success: true, data: null });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllPlaylists,
  getPlaylistById,
  addPlaylist,
  updatePlaylist,
  deletePlaylist,
};
