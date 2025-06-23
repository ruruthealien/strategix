const Task = require('../models/Task');

// @desc    Get all tasks(Admin: all, User: only assigned task)
// @route   GET /api/tasks
// @access  Private 
const getTasks = async(req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
const getTaskById = async(req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (Admin only)
const createTask = async(req, res) => {
    try {
        const {
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            attachments,
            todoChecklist,
        } = req.body;
        if (!Array.isArray(assignedTo)) {
            return res.status(400).json({ message: "AssignedTo must be an array of user IDs" });
        }

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            assignedTo,
            createdBy: req.user._id, // Assuming req.user is populated with the authenticated user
            todoChecklist,
            attachments,
        });
        res.status(201).json({
            message: "Task created successfully",
            task
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    };
};

// @desc    Update a task
// @route   PUT /api/tasks/:id
// @access  Private (Admin only)
const updateTask = async(req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private (Admin only)
const deleteTask = async(req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private
const updateTaskStatus = async(req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update task checklist
// @route   PUT /api/tasks/:id/todo
// @access  Private
const updateTaskChecklist = async(req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get dashboard data (admin)
// @route   GET /api/tasks/dashboard-data
// @access  Private (Admin only)
const getDashboardData = async(req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get user dashboard data (user)
// @route   GET /api/tasks/user-dashboard-data
// @access  Private (User only)
const getUserDashboardData = async(req, res) => {
    try {

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

module.exports = {
    getTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
    updateTaskChecklist,
    getDashboardData,
    getUserDashboardData
};