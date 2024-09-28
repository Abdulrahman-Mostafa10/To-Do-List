export const createError = (errorMessage: string, errorStatus: number, errors: Array<object>) => {
    const error = new Error(errorMessage) as any;
    error.statusCode = errorStatus | 500;
    error.data = errors;
    return error;
};
