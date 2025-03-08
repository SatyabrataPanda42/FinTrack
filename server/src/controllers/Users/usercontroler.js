const expressAsyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../model/User");

// Register User
const registerUser = expressAsyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    const user = new User({ name, email, password }); // No need to hash manually
    await user.save();
    res.json({ success: true, message: "Registration successful" });
});

//login user
const loginUserController = expressAsyncHandler(async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "User not found" });
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            console.log("❌ Password does not match!");
            return res.status(400).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
        res.json(
            {
                success: true,
                message: "Login successful",
                token,
                user: { _id: user._id, name: user.name, email: user.email },
            }
        );
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});





// Fetch all users
const fetchAllUsers = expressAsyncHandler(async (req, res) => {
    const users = await User.find({});
    res.status(200).json(users);
});

module.exports = { registerUser, fetchAllUsers, loginUserController };
