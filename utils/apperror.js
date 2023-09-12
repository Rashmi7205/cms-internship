class AppError extends Error{
    constructor(message,statusCode){
        super(statusCode);
        this.statusCode = statusCode;
        this.message = message
        Error.captureStackTrace(this,this.constructor);
    }
}

export default AppError;