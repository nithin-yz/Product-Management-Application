const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
require("dotenv").config();

exports.loginPost = async (req, res) => {
      const { email, password } = req.body;

    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        req.flash("error","Invalid credentials")
        return res.status(400).redirect("/login");
      }
  
      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Generate a JWT token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });


  } catch(error) {



  }
};

exports.signupPost = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      req.flash("error", "User already exists, please login");
      return res.status(400).redirect("/signup");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const NewUserEntry = new User({
       name:username,
      email,
      password: hashedPassword,
    });
    // await NewUserEntry.save();
    console.log(NewUserEntry);
    req.flash("error", "Account created please login");
    res.status(201).redirect("/login");
  } catch (error) {
    console.log(error)
    res.status(500).send("server error");
  }
};
