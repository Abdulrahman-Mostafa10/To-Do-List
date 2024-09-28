import { Router } from 'express';
import { body } from 'express-validator';

import { Task } from '../models/task';
import { getTasks, createTask, updateTask, deleteTask } from '../controllers/tasks';

const router = Router();

// ******************************** GET Requests ********************************

router.get('/', getTasks);

// ******************************** POST Requests ********************************

router.post('/',
    [
        body('title')
            .notEmpty()
            .trim()
            .isAlphanumeric()
            .custom(async (value: string, { }) => {
                return await Task.findOne({ title: value })
                    .then((taskDoc) => {
                        if (taskDoc) {
                            return Promise.reject("A current task exists with the same title");
                        }
                    });
            })
            .withMessage('Title must be a valid'),
        body('description')
            .trim()
            .notEmpty()
            .isString()
            .withMessage('Description must be a valid string'),
        body('status')
            .notEmpty()
            .isAlpha()
            .withMessage('Status must be a valid state string')
    ]
    , createTask);

// ******************************** PUT Requests ********************************

router.put('/:taskId',
    [
        body('status')
            .notEmpty()
            .isAlpha()
    ]
    , updateTask);

// ******************************** DELETE Requests ********************************

router.delete('/:taskId', deleteTask);

export default router;