const jwt = require("jsonwebtoken");

// Middleware function to authenticate the user
const authenticateUser = (req, res, next) => {
  // Extract the JWT token from the request headers
  const token = req.headers.authorization;

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ error: "Authorization token not provided" });
  }

  try {
    // Verify and decode the token
    const decodedToken = jwt.verify(token, "Study+Univesp"); // Replace 'your-secret-key' with your actual secret key

    // Attach the user ID to the request object
    req.user = {
      userId: decodedToken.userId,
    };

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid authorization token" });
  }
};

module.exports = {
  authenticateUser,
};
