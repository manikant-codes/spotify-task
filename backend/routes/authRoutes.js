const express = require("express");
const { register, login, logout } = require("../controllers/authControllers");
const authMiddleware = require("../middlewares/authMiddleware");
const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get("/logout", authMiddleware, logout);

module.exports = authRouter;
