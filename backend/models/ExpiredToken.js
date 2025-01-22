const mongoose = require("mongoose");

const expiredTokenSchema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    unique: true,
    // To automatically delete expired tokens.
    createdAt: { type: Date, default: Date.now, expires: 60 * 60 * 24 },
  },
});

const ExpiredToken = mongoose.model("ExpiredToken", expiredTokenSchema);

module.exports = ExpiredToken;
