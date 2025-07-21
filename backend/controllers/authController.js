const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "8d" });
};


//*******************************************************************************************************************************************

// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = async(req, res) => {
    try {
        const { name, email, password, profileImageUrl, adminInviteToken } = req.body;

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Determine user role
        let role = "member";
        if (adminInviteToken && adminInviteToken === process.env.ADMIN_INVITE_TOKEN) {
            role = "admin";
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            profileImageUrl,
            role,
        });

        // Return user data with JWT token
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


//*******************************************************************************************************************************************

// @desc Login user
// @route POST /api/auth/login  
// @access Public
const loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Return token and user data
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            profileImageUrl: user.profileImageUrl,
            token: generateToken(user._id),
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


//*******************************************************************************************************************************************

// @desc Get user profile
// @route GET /api/auth/profile
// @access Private (Requires JWT token)
const getUserProfile = async(req, res) => {
    try {
        // Assuming `req.user` is set by your JWT middleware
        const user = await User.findById(req.user.id).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


//*******************************************************************************************************************************************

// @desc Update user profile
// @route PUT /api/auth/profile
// @access Private (Requires JWT token)
const updateUserProfile = async(req, res) => {
    try {
        const user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.name = req.body.name || user.name;
        user.profileImageUrl = req.body.profileImageUrl || user.profileImageUrl;

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(req.body.password, salt);
        }

        const updatedUser = await user.save();

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            role: updatedUser.role,
            profileImageUrl: updatedUser.profileImageUrl,
            token: generateToken(updatedUser._id),
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

//*******************************************************************************************************************************************

module.exports = {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
};