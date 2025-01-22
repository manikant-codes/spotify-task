const jwt = require("jsonwebtoken");
const ExpiredToken = require("../models/ExpiredToken");

const authMiddleware = async (req, res, next) => {
  try {
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const tokenExpired = await ExpiredToken.findOne({ token: token });

    if (tokenExpired) {
      return res
        .status(401)
        .json({ success: false, message: "Token already expired." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decodedToken.id;

    next();
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = authMiddleware;
