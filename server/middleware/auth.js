const jwt = require('jsonwebtoken');

// Verify a Bearer JWT and attach the decoded payload to req.user.
const protect = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Not authorized, token invalid' });
  }
};

// Require the authenticated user to be an admin. Must run after `protect`.
const requireAdmin = (req, res, next) => {
  if (req.user?.type !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

module.exports = { protect, requireAdmin };
