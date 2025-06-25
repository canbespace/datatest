//In plain terms, it acts like a locked door: if a user tries to access a restricted route without a valid token (or with an expired one), this middleware slams the door shut with a 401 Access Denied.
const jwt = require("jsonwebtoken");

function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  // Check for token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Access denied: No token provided." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // You can now access req.user in your route
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid or expired token." });
  }
}

module.exports = requireAuth;
