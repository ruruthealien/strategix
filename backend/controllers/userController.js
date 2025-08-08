const Task = require('../models/Task');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//**************************************************************************************************************************************

// @desc Get all users (admin only)
// @route GET /api/users
// @access Private (Admin)
const getUsers = async(req, res) => {
    try {
        const users = await User.find({ role: 'member' }).select("-password");
        // Exclude password from the response

        // add task count to each user
        const usersWithTaskCounts = await Promise.all(users.map(async(user) => {
            const pendingTasks = await Task.countDocuments({ assignedTo: { $in: [user._id] }, status: 'pending' });
            const inProgressTasks = await Task.countDocuments({ assignedTo: { $in: [user._id] }, status: 'in-progress' });
            const completedTasks = await Task.countDocuments({ assignedTo: { $in: [user._id] }, status: 'complete' });

            return {
                ...user._doc, //  include all existing user data
                pendingTasks,
                inProgressTasks,
                completedTasks,
            };
        }));
        res.json(usersWithTaskCounts);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//**************************************************************************************************************************************

// @desc Get user by ID
// @route GET /api/users/:id
// @access Private
const getUserById = async(req, res) => {
    const { id } = req.params;
    try {
        // Check if the user exists
        const user = await User.findById(req.params.id).select("-password");
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

//**************************************************************************************************************************************

module.exports = { getUsers, getUserById };