"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createError = void 0;
const createError = (errorMessage, errorStatus, errors) => {
    const error = new Error(errorMessage);
    error.statusCode = errorStatus | 500;
    error.data = errors;
    return error;
};
exports.createError = createError;
