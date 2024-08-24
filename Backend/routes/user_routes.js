const express = require('express');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const session = require('express-session');
const authMiddleware = require('../middleware/auth');
const isValidRenownedEmail = require('./email_validation');
const router = express.Router();


router.use(session({
  secret: '42@quasarsForce', 
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Register a new user
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  console.log({ username });
  if(!isValidRenownedEmail(email)){
    return res.status(400).json({ message: "Enter a valid email!" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({ username, email, password: hashedPassword });
    console.log("new user is being created!");
    await newUser.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    // console.log(token);

    // Save session information
    req.session.userId = user._id;
    req.session.token = token;

    // console.log(req.session.token);

    res.status(200).json({ result: user, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

router.get('/:id', authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id).select('-password'); // Exclude password
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});


module.exports = router;