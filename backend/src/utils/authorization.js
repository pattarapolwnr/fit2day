// Check JWT in cookie middleware
const { verifyToken } = require("../utils/jwtToken");

const authorization = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(403).json({ message: "Not authorized!" });
  }
  try {
    const data = verifyToken(token);
    req.user_id = data.userId;
    return next();
  } catch {
    return res.status(403).json({ message: "Invalid Token" });
  }
};

module.exports = authorization;
