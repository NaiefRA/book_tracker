const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  console.log("Token from cookie = ", token);

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log("Error", err);
      return res.status(401).json({ message: "Invalid token" });
    }
    req.userId = decodedToken.id;
    next();
  });
};

module.exports = requireAuth;
