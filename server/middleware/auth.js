module.exports = function loggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).json({ msg: "Login failed" });
  }
};
