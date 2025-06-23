const express = require('express');
const { loginUser, registerUser, getUserProfile, updateUserProfile } = require('../controllers/authController');
const router = express.Router();
const { protect } = require('../middlewares/authMiddleware'); // Middleware to protect routes
const upload = require('../middlewares/uploadMiddleware'); // Middleware for handling file uploads


// Auth Routes
// Register, Login, Get Profile, Update Profile
router.post("/register", registerUser); // Register User
router.post("/login", loginUser); // Login User
router.get("/profile", protect, getUserProfile); // Get User Profile
router.put("/profile", protect, updateUserProfile); // Update User Profile


// Image Upload Route: multer middleware for handling file uploads
router.post("/upload-image", upload.single("image"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    res.status(200).json({ imageUrl });
});


module.exports = router;