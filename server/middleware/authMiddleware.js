const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Get token from headers (Authorization: Bearer <token>)
  const token = req.header('Authorization') && req.header('Authorization').replace('Bearer ', '');

  // If no token is found, return an error
  if (!token) {
    return res.status(401).json({ error: 'Authentication failed, no token provided.' });
  }

  try {
    // Verify the token using the JWT_SECRET
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user data to the request object (so we can use it later)
    req.user = decoded;

    // Proceed to the next middleware or route handler
    next();
  } catch (err) {
    // If the token is invalid or expired, return an error
    return res.status(401).json({ error: 'Authentication failed, invalid or expired token.' });
  }
};

module.exports = authMiddleware;
