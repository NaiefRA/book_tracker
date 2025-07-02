const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  console.log("Token from cookie = ", token);
  console.log("All cookies:", req.cookies);

  if (!token) {
    console.log("No token found");
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    return res.status(500).json({ message: "Server configuration error" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
    if (err) {
      console.log("JWT Error:", err.message);
      return res.status(401).json({ message: "Invalid token" });
    }

    console.log("Decoded token:", decodedToken);

    // Check what property exists in your token
    req.userId = decodedToken.id || decodedToken.userId || decodedToken._id;

    if (!req.userId) {
      console.log("No user ID found in token");
      return res.status(401).json({ message: "Invalid token format" });
    }

    next();
  });
};

module.exports = requireAuth;
