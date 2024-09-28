"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const tasks_1 = __importDefault(require("./routes/tasks"));
dotenv_1.default.config();
const MONGO_URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.fccjy.mongodb.net/${process.env.MONGO_DB}`;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/tasks', tasks_1.default);
app.use((error, req, res, next) => {
    const { statusCode } = error, { message } = error, { data } = error;
    res.status(statusCode).json({
        message: message,
        data: data
    });
});
mongoose_1.default
    .connect(MONGO_URI)
    .then(() => {
    console.log('Server is running');
    app.listen(3000);
})
    .catch(err => console.log(err));
