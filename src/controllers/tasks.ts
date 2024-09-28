import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

import { Task } from '../models/task';
import { createError } from '../utils/errorInvoker'

export const getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = createError("Validation failed, entered data is incorrect", 422, errors.array());
        throw error;
    }
    try {
        const tasks = await Task.find();
        res.status(200).json({
            message: "Tasks are fetched successfully",
            tasks: tasks
        });
    }
    catch (err: any) {
        const error = createError("Database error occurred", err.statusCode, []);
        next(error);
    }
};

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = createError("Validation failed, entered data is incorrect", 422, errors.array());
        throw error;
    }
    const novelTask = new Task({
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
    } catch (err: any) {
        const error = createError("Database error occurred", err.statusCode, []);
        next(error);
    }
};

export const updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = createError("Validation failed, entered data is incorrect", 422, errors.array());
        throw error;
    }

    const { taskId } = req.params;

    try {
        const currentTask = await Task.findById(taskId);
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
    catch (err: any) {
        const error = createError("Database error occurred", err.statusCode, []);
        next(error);
    }
};

export const deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = createError("Validation failed, entered data is incorrect", 422, errors.array());
        throw error;
    }

    const { taskId } = req.params;

    try {
        const currentTask = await Task.findById(taskId);
        if (!currentTask) {
            res.status(404).json({
                message: "There is no task with such an Id",
            });
        } else {
            await Task.deleteOne({ _id: currentTask._id });
            res.status(200).json({
                message: "Task is deleted successfully"
            });
        }
    }
    catch (err: any) {
        const error = createError("Database error occurred", err.statusCode, []);
        next(error);
    }
};