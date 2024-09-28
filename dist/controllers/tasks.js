"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTasks = void 0;
const express_validator_1 = require("express-validator");
const task_1 = require("../models/task");
const errorInvoker_1 = require("../utils/errorInvoker");
const getTasks = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = (0, errorInvoker_1.createError)("Validation failed, entered data is incorrect", 422, errors.array());
        throw error;
    }
    try {
        const tasks = await task_1.Task.find();
        res.status(200).json({
            message: "Tasks are fetched successfully",
            tasks: tasks
        });
    }
    catch (err) {
        const error = (0, errorInvoker_1.createError)("Database error occurred", err.statusCode, []);
        next(error);
    }
};
exports.getTasks = getTasks;
const createTask = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = (0, errorInvoker_1.createError)("Validation failed, entered data is incorrect", 422, errors.array());
        throw error;
    }
    const novelTask = new task_1.Task({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
    });
    try {
        const createdTask = await novelTask.save();
        res.status(201).json({
            message: 'A new task is created successfully',
            task: createdTask
        });
    }
    catch (err) {
        const error = (0, errorInvoker_1.createError)("Database error occurred", err.statusCode, []);
        next(error);
    }
};
exports.createTask = createTask;
const updateTask = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = (0, errorInvoker_1.createError)("Validation failed, entered data is incorrect", 422, errors.array());
        throw error;
    }
    const { taskId } = req.params;
    try {
        const currentTask = await task_1.Task.findById(taskId);
        if (!currentTask) {
            res.status(404).json({
                message: "There is no task with such an Id",
            });
        }
        else {
            const newStatus = req.body.status;
            if (!newStatus) {
                res.status(404).json({
                    message: "The body of the request is empty"
                });
            }
            currentTask.status = newStatus;
            const updatedTask = await currentTask.save();
            res.status(201).json({
                message: "Status of the task is updated",
                task: updatedTask
            });
        }
    }
    catch (err) {
        const error = (0, errorInvoker_1.createError)("Database error occurred", err.statusCode, []);
        next(error);
    }
};
exports.updateTask = updateTask;
const deleteTask = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const error = (0, errorInvoker_1.createError)("Validation failed, entered data is incorrect", 422, errors.array());
        throw error;
    }
    const { taskId } = req.params;
    try {
        const currentTask = await task_1.Task.findById(taskId);
        if (!currentTask) {
            res.status(404).json({
                message: "There is no task with such an Id",
            });
        }
        else {
            await task_1.Task.deleteOne({ _id: currentTask._id });
            res.status(200).json({
                message: "Task is deleted successfully"
            });
        }
    }
    catch (err) {
        const error = (0, errorInvoker_1.createError)("Database error occurred", err.statusCode, []);
        next(error);
    }
};
exports.deleteTask = deleteTask;
