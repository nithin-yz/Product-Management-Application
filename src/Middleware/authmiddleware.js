const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticate = (req, res, next) => {
  const token = req.cookies.token; // Extract token from cookies
  

  if (!token) {
    return res.status(401).redirect("/login");
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.userId; // Attach the user ID to the request object
    next();
  } catch (err) {
    console.log("Token verification failed:", err.message);
    return res.status(401).redirect("/login");
  }
};

module.exports = authenticate;
