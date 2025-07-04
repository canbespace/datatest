//backend/middleware/requireAdmin.js
//This middleware checks if the user has the role of "admin" before allowing access to certain routes.

const requireAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({ error: "Access denied. Admins only." });
};

module.exports = requireAdmin;
