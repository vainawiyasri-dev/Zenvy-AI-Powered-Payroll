const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Ensure _id exists for Mongo queries
    req.user = {
      _id: decoded.id,       // <-- this ensures Payroll.find({ employee: req.user._id }) works
      company: decoded.company,
      role: decoded.role
    };
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Invalid token" });
  }
};
