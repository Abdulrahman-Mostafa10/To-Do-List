import mongoose, { Schema } from 'mongoose';


enum TaskStatus {
    open = 'OPEN',
    inProgress = 'IN_PROGRESS',
    done = 'DONE',
};

const taskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        required: true
    }
}, { timestamps: true });

export const Task = mongoose.model('Task', taskSchema);