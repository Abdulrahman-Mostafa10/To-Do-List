"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const task_1 = require("../models/task");
const tasks_1 = require("../controllers/tasks");
const router = (0, express_1.Router)();
// ******************************** GET Requests ********************************
router.get('/', tasks_1.getTasks);
// ******************************** POST Requests ********************************
router.post('/', [
    (0, express_validator_1.body)('title')
        .notEmpty()
        .trim()
        .isAlphanumeric()
        .custom(async (value, {}) => {
        return await task_1.Task.findOne({ title: value })
            .then((taskDoc) => {
            if (taskDoc) {
                return Promise.reject("A current task exists with the same title");
            }
        });
    })
        .withMessage('Title must be a valid'),
    (0, express_validator_1.body)('description')
        .trim()
        .notEmpty()
        .isString()
        .withMessage('Description must be a valid string'),
    (0, express_validator_1.body)('status')
        .notEmpty()
        .isAlpha()
        .withMessage('Status must be a valid state string')
], tasks_1.createTask);
// ******************************** PUT Requests ********************************
router.put('/:taskId', [
    (0, express_validator_1.body)('status')
        .notEmpty()
        .isAlpha()
], tasks_1.updateTask);
// ******************************** DELETE Requests ********************************
router.delete('/:taskId', tasks_1.deleteTask);
exports.default = router;
