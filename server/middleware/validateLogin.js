const validateLogin = (req, res, next) => {
    const { username, password } = req.body;
  
    // Username must exist
    if (!username) {
      return res.status(400).json({ error: 'Username required' });
    }
  
    // Username: 3-10 characters, lowercase letters, numbers, underscores, dots
    const usernameRegex = /^[a-z0-9_.]{3,10}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: 'Invalid username' });
    }
  
    // Password must exist
    if (!password) {
      return res.status(400).json({ error: 'Password required' });
    }
  
    // Password: at least 8 characters (complexity already handled in signup)
    if (password.length < 8) {
      return res.status(400).json({ error: 'Invalid password' });
    }
  
    next();
  };
  
  module.exports = validateLogin;
  