import { Signup } from "../models/signupModel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let user = await Signup.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists" });
    }

    user = new Signup({ name, email, password });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Server error" });
  }
};

export const login = (req, res) => {
  res.status(200).json({ message: "Logged in successfully", user: req.user });
};

export const logout = (req, res) => {
  req.logout((err) => {
    if (err) return res.status(500).json({ message: "Logout failed" });
    res.status(200).json({ message: "Logged out successfully" });
  });
};
