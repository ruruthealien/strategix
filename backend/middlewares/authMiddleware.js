const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes (requires valid JWT)
const protect = async(req, res, next) => {
    let token;

    // Check if Authorization header with Bearer token exists
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
    ) {
        try {
            // Extract token from "Bearer <token>"
            token = req.headers.authorization.split(" ")[1];

            // Verify token using secret
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Attach user data to request object, excluding password
            req.user = await User.findById(decoded.id).select("-password");

            // Proceed to the next middleware or route handler
            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        res.status(401).json({ message: "Not authorized, no token" });
    }
};

// Middleware to allow only admin users
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied, admin only" });
    }
};

module.exports = { protect, adminOnly };