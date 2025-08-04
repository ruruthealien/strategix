const Task = require('../models/Task');

// @desc    Get all tasks(Admin: all, User: only assigned task)
// @route   GET /api/tasks
// @access  Private 
// **done**
const getTasks = async(req, res) => {
    try {
        const { status } = req.query; // Optional query parameter for status
        let filter = {};

        if (status) {
            filter.status = status; // Filter by status if provided
        }
        let tasks;
        if (req.user.role === "admin") {
            tasks = await Task.find(filter).populate("assignedTo", "name email profileImageUrl");
        } else {
            tasks = await Task.find({...filter, assignedTo: req.user._id }).populate("assignedTo", "name email profileImageUrl");
        }
        // add completed todoCheckList count to each task
        tasks = await Promise.all(
            tasks.map(async(tasks) => {
                const completedCount = tasks.todoChecklist.filter(item => item.completed).length;
                return {...tasks._doc,
                    completedTodoCount: completedCount
                };
            })
        );
        // Status summary counts
        const allTasks = await Task.countDocuments(
            req.user.role === "admin" ? {} : { assignedTo: req.user._id }
        );

        const pendingTasks = await Task.countDocuments({
            ...filter,
            status: "pending",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
        }); // Count pending tasks

        const inProgressTasks = await Task.countDocuments({
            ...filter,
            status: "in-progress",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
        }); // Count in-progress tasks

        const completedTasks = await Task.countDocuments({
            ...filter,
            status: "complete",
            ...(req.user.role !== "admin" && { assignedTo: req.user._id }),
        }); // Count completed tasks

        res.json({
            tasks,
            statusSummary: {
                all: allTasks,
                pendingTasks,
                inProgressTasks,
                completedTasks,
            },
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get task by ID
// @route   GET /api/tasks/:id
// @access  Private
// **done**
const getTaskById = async(req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("assignedTo", "name email profileImageUrl");
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(task);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private (Admin only)
// **done**
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
            status: "pending",
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
// **done**
const updateTask = async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.priority = req.body.priority || task.priority;
        task.dueDate = req.body.dueDate || task.dueDate;
        task.todoChecklist = req.body.todoChecklist || task.todoChecklist;
        task.attachments = req.body.attachments || task.attachments;

        if (req.body.assignedTo) {
            if (!Array.isArray(req.body.assignedTo)) {
                return res.status(400).json({ message: "AssignedTo must be an array of user IDs" });
            }
            task.assignedTo = req.body.assignedTo;
        }

        const updatedTask = await task.save();
        res.json({ message: "Task updated successfully", updatedTask });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Delete a task
// @route   DELETE /api/tasks/:id
// @access  Private (Admin only)
// **done**
const deleteTask = async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: "Task not found" });

        await task.deleteOne();
        res.json({ message: "Task deleted successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update task status
// @route   PUT /api/tasks/:id/status
// @access  Private
// **done**
const updateTaskStatus = async(req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).json({ message: "Task not found" });

        const isAssigned = task.assignedTo.some(
            (userId) => userId.toString() === req.user._id.toString()
        );

        if (!isAssigned && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized" });
        }

        if (!req.body.status) {
            return res.status(400).json({ message: "Status is required" });
        }

        task.status = req.body.status;

        if (task.status === "completed") {
            task.todoChecklist.forEach((item) => (item.completed = true));
            task.progress = 100;
        }

        const updatedTask = await task.save();

        res.json({ message: "Status updated successfully", updatedTask });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update task checklist
// @route   PUT /api/tasks/:id/todo
// @access  Private
// **done**
const updateTaskChecklist = async(req, res) => {
    try {
        const { todoChecklist } = req.body;
        const task = await Task.findById(req.params.id);

        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }

        if (!task.assignedTo.includes(req.user._id.toString()) && req.user.role !== "admin") {
            return res.status(403).json({ message: "Not authorized to update the checklist" });
        }

        task.todoChecklist = todoChecklist;

        const completedCount = task.todoChecklist.filter(item => item.completed).length;
        const totalItems = task.todoChecklist.length;
        task.progress = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

        if (task.progress === 100) {
            task.status = "complete";
        } else if (task.progress > 0) {
            task.status = "in-progress";
        } else {
            task.status = "pending";
        }

        await task.save();

        const updatedTask = await Task.findById(req.params.id).populate("assignedTo", "name email profileImageUrl");
        res.json({ message: "Task checklist updated successfully", updatedTask });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Get dashboard data (admin)
// @route   GET /api/tasks/dashboard-data
// @access  Private (Admin only)
// **done**
const getDashboardData = async(req, res) => {
    try {
        // fetch statistics from the database
        const totalTasks = await Task.countDocuments();
        const pendingTasks = await Task.countDocuments({ status: "pending" });
        const completedTasks = await Task.countDocuments({ status: "complete" });
        const overdueTasks = await Task.countDocuments({
            status: { $ne: "complete" },
            dueDate: { $lt: new Date() }, // assuming you meant dueDate, not deadline
        });

        // Ensure all possible statuses are accounted for
        const taskStatuses = ["pending", "in-progress", "complete"];
        const taskDistributionRaw = await Task.aggregate([{
            $group: {
                _id: "$status",
                count: { $sum: 1 },
            },
        }, ]);

        // taskDistribution is an object with keys as status names and values as counts
        const taskDistribution = taskStatuses.reduce((acc, status) => {
            const found = taskDistributionRaw.find(item => item._id === status);
            acc[status.replace(/\s+/g, "")] = found ? found.count : 0;
            return acc;
        }, {});

        taskDistribution["all"] = totalTasks;

        // Ensure all priority levels are included (use lowercase if your enum uses lowercase)
        const taskPriorities = ["low", "medium", "high"];
        const taskPriorityLevelsRaw = await Task.aggregate([{
            $group: {
                _id: "$priority",
                count: { $sum: 1 },
            },
        }, ]);

        const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
            const found = taskPriorityLevelsRaw.find(item => item._id === priority);
            acc[priority] = found ? found.count : 0;
            return acc;
        }, {});

        // Fetch recent 10 tasks
        const recentTasks = await Task.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .select("title status priority dueDate createdAt");

        // Final response
        res.status(200).json({
            statistics: {
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks,
            },
            charts: {
                taskDistribution,
                taskPriorityLevels,
            },
            recentTasks,
        });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};


// @desc    Get user dashboard data (user)
// @route   GET /api/tasks/user-dashboard-data
// @access  Private (User only)
// **done**
const getUserDashboardData = async(req, res) => {
    try {
        const userId = req.user._id; // only fetch data for the logged-in user

        // fetch statistic for user-specific tasks
        const totalTasks = await Task.countDocuments({ assignedTo: userId });
        const pendingTasks = await Task.countDocuments({ assignedTo: userId, status: "pending" });
        const completedTasks = await Task.countDocuments({ assignedTo: userId, status: "complete" });
        const overdueTasks = await Task.countDocuments({
            assignedTo: userId,
            status: { $ne: "complete" },
            dueDate: { $lt: new Date() },
        });


        // task distribution by status
        const taskStatuses = ["pending", "in-progress", "complete"];
        const tasksDistributionRaw = await Task.aggregate([
            { $match: { assignedTo: userId } },
            { $group: { _id: "$status", count: { $sum: 1 } } }, // here we use the user's ID for filtering
        ]);


        const taskDistribution = taskStatuses.reduce((acc, status) => {
            const found = tasksDistributionRaw.find(item => item._id === status);
            acc[status.replace(/\s+/g, "")] = found ? found.count : 0;
            return acc;
        }, {});
        taskDistribution["All"] = totalTasks;


        // task distribution by priority
        const taskPriorities = ["low", "medium", "high"];
        const taskPriorityLevelsRaw = await Task.aggregate([
            { $match: { assignedTo: userId } },
            { $group: { _id: "$priority", count: { $sum: 1 } } }, // here we use the user's ID for filtering
        ]);

        const taskPriorityLevels = taskPriorities.reduce((acc, priority) => {
            const found = taskPriorityLevelsRaw.find(item => item._id === priority);
            acc[priority] = found ? found.count : 0;
            return acc;
        }, {});


        // Fetch recent 10 tasks for logged-in user
        const recentTasks = await Task.find({ assignedTo: userId })
            .sort({ createdAt: -1 })
            .limit(10)
            .select("title status priority dueDate createdAt");

        res.status(200).json({
            statistics: {
                totalTasks,
                pendingTasks,
                completedTasks,
                overdueTasks,
            },
            charts: {
                taskDistribution,
                taskPriorityLevels,
            },
            recentTasks,
        });


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