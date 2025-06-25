// check for the logged in account and its privileges
function requireRole(roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res
        .status(403)
        .json({ error: "Forbidden: Insufficient permissions" });
    }
    next();
  };
}

module.exports = requireRole;
