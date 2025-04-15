const validateSignup = (req, res, next) => {
    const { username, password } = req.body;
  
    // Check if username is provided
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }
  
    // Only lowercase alphabets allowed in username
    const usernameRegex = /^[a-z]+$/;
    if (!usernameRegex.test(username)) {
      return res.status(400).json({ error: 'Username must contain only lowercase letters (a-z)' });
    }
  
    // Check if password is provided
    if (!password) {
      return res.status(400).json({ error: 'Password is required' });
    }
  
    // Check password rules
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: 'Password must be at least 6 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.'
      });
    }
  
    next();
  };
  
  module.exports = validateSignup;
  