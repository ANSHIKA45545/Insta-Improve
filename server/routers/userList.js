const express = require( "express");
const User = require("../model/user-model");

const router = express.Router();

// GET all users
router.get("/userList", async (req, res) => {
  try {
    const users = await User.find({}, "username _id");
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

module.exports= router;