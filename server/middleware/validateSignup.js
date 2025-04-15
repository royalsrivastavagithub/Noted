const validateSignup = (req, res, next) => {
    const { username, password } = req.body;
  
    // Check if username is provided
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
  
    // Only lowercase alphabets allowed in username
    const usernameRegex = /^[a-z0-9_.]{3,10}$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: 'Username must be 3-10 chars, a-z, 0-9, _ or .' });
    }
  
    // Check if password is provided
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
  
    // Check password rules
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password must be at least 8 char, one uppercase, one lowercase, one number, and one special character."

      });
    }
  
    next();
  };
  
  module.exports = validateSignup;
  