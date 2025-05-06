const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

// @route   POST api/auth/register
// @desc    Register user
// @access  Public
exports.register = async (req, res) => {
  console.log("Register attempt received:", req.body); // Log incoming data (excluding password in production)
  const { name, email, password } = req.body;

  try {
    console.log(`1. Checking if user exists for email: ${email}`);
    let user = await User.findOne({ email });
    console.log("2. User.findOne completed.");

    if (user) {
      console.log("User already exists.");
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    console.log("3. User does not exist, creating new user instance.");

    user = new User({
      name,
      email,
      password,
    });

    console.log("4. Generating salt.");
    const salt = await bcrypt.genSalt(10);
    console.log("5. Salt generated. Hashing password.");
    user.password = await bcrypt.hash(password, salt);
    console.log("6. Password hashed. Saving user.");

    await user.save();
    console.log("7. User saved successfully.");

    const payload = {
      user: {
        id: user.id,
      },
    };
    console.log("8. Generating JWT.");

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 },
      (err, token) => {
        if (err) {
          console.error("JWT Signing Error:", err);
          // Ensure response is sent even if JWT fails
          // Return JSON error
          return res.status(500).json({ msg: "Server error during token generation" });
        }
        console.log("9. JWT generated. Sending token response.");
        res.json({ token });
      }
    );
  } catch (err) {
    // Log the full error, not just the message
    console.error("Error during registration process:", err);
    // Ensure a response is sent even if an error occurs
    if (!res.headersSent) {
      // Check if response hasn't already been sent
      // Return JSON error
      res.status(500).json({ msg: "Server error" });
    }
  }
};

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // See if user exists
    let user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ errors: [{ msg: "Invalid Credentials" }] });
    }

    // Return jsonwebtoken
    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: 360000 }, // Optional: expires in 100 hours
      (err, token) => {
        if (err) {
          console.error("JWT Signing Error:", err);
          // Ensure response is sent if JWT signing fails
          // Return JSON error
          return res.status(500).json({ msg: "Server error during token generation" });
        }
        res.json({ token });
      }
    );
  } catch (err) {
    console.error("Login Error:", err.message); // Log the specific error message
    // Return JSON error
    res.status(500).json({ msg: "Server error" });
  }
};
