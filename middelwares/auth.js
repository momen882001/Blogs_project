const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token)
    return res.status(401).json({ err: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, "temporary secret for testing");
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (ex) {
    res.status(400).json({ err: "Invalid token." });
  }
};
