// controllers/userController.js
const User = require("../models/usermodel");
const bcrypt = require("bcrypt");

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    res.status(201).json({ msg: "User created", user });
  } catch (error) {
    res.status(500).json({ msg: "Signup failed", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ msg: "Invalid password" });

    
    req.session.user = user;

    res.status(200).json({ msg: "Login successful", user });
  } catch (error) {
    res.status(500).json({ msg: "Login failed", error: error.message });
  }
};

const logout = async (req, res) => {
  
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ msg: "Error logging out" });
    }
    res.status(200).json({ msg: "Logout successful" });
  });
};

module.exports = { signup, login, logout };
