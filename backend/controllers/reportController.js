const Task = require('../models/Task');
const User = require('../models/User');
const excelJS = require('exceljs');

//@desc     Export all tasks as an Excel file
// @route   GET /api/reports/export/tasks
// @access  Private (Admin only)
// **done**
const exportTasksReport = async(req, res) => {
    try {
        const tasks = await Task.find().populate('assignedTo', 'name email profileImageUrl');

        console.log("Tasks with assignedTo populated:", tasks.map(t => ({ id: t._id, assignedTo: t.assignedTo })));

        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet('Tasks Report');

        worksheet.columns = [
            { header: "Task ID", key: "_id", width: 25 },
            { header: "Title", key: "title", width: 30 },
            { header: "Description", key: "description", width: 50 },
            { header: "Priority", key: "priority", width: 15 },
            { header: "Status", key: "status", width: 20 },
            { header: "Due Date", key: "dueDate", width: 20 },
            { header: "Assigned To", key: "assignedTo", width: 30 },
        ];
        tasks.forEach((task, index) => {
            let assignedTo = "Unassigned";
            if (task.assignedTo) {
                if (Array.isArray(task.assignedTo)) {
                    assignedTo = task.assignedTo
                        .map((user) => `${user.name} (${user.email})`)
                        .join(", ");
                } else {
                    assignedTo = `${task.assignedTo.name} (${task.assignedTo.email})`;
                }
            }

            worksheet.addRow({
                _id: task._id,
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status,
                dueDate: task.dueDate.toISOString().split('T')[0],
                assignedTo: assignedTo,
            });
        });

        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        res.setHeader("Content-Disposition", 'attachment; filename="tasks_report.xlsx"');

        return workbook.xlsx.write(res).then(() => {
            res.end();
        });

    } catch (error) {
        res.status(500).json({ message: "Error exporting tasks", error: error.message });
    }
};



//@desc     Export user-task report as an Excel file
// @route   GET /api/reports/export/users
// @access  Private (Admin only)
// **done**
const exportUsersReport = async(req, res) => {
    try {
        // const users = await User.find().select("name email_id").lean();
        // const userTasks = await Task.find().populate('assignedTo', 'name email_id');

        const users = await User.find().select("name email").lean();
        const userTasks = await Task.find().populate('assignedTo', 'name email');

        const userTaskMap = {};
        users.forEach((user) => {
            userTaskMap[user._id] = {
                _id: user._id,
                name: user.name,
                email_id: user.email,
                taskCount: 0,
                pendingTasks: 0,
                inProgressTasks: 0,
                completedTasks: 0,
            };
        });

        userTasks.forEach((task) => {
            if (task.assignedTo) {

                task.assignedTo.forEach((assignedUser) => {

                    if (userTaskMap[assignedUser._id]) {
                        userTaskMap[assignedUser._id].taskCount += 1;
                        if (task.status === "pending") {
                            userTaskMap[assignedUser._id].pendingTasks += 1;
                        }
                        if (task.status === "in-progress") {
                            userTaskMap[assignedUser._id].inProgressTasks += 1;
                        }
                        if (task.status === "complete") {
                            userTaskMap[assignedUser._id].completedTasks += 1;
                        }
                    }
                });
            }
        });



        const workbook = new excelJS.Workbook();
        const worksheet = workbook.addWorksheet('User Task Report');

        worksheet.columns = [
            { header: "User ID", key: "_id", width: 25 },
            { header: "Name", key: "name", width: 30 },
            { header: "Email ID", key: "email_id", width: 30 },
            { header: "Total Assigned Tasks", key: "totalTasks", width: 20 },
            { header: "Pending Tasks", key: "pendingTasks", width: 20 },
            { header: "In Progress Tasks", key: "inProgressTasks", width: 20 },
            { header: "Completed Tasks", key: "completedTasks", width: 20 },
        ];
        // Add rows
        Object.values(userTaskMap).forEach(user => {
            user.totalTasks = user.pendingTasks + user.inProgressTasks + user.completedTasks;
            worksheet.addRow(user);
        });

        // Set response headers
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");

        res.setHeader("Content-Disposition", 'attachment; filename="users_report.xlsx"');


        return workbook.xlsx.write(res).then(() => {
            res.end();
        });

    } catch (error) {
        res.status(500).json({ message: "Error exporting users", error: error.message });
    }
};


module.exports = {
    exportTasksReport,
    exportUsersReport
};