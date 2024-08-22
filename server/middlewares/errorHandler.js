module.exports = function errorHandler(error, req, res, next) {
    let status = error.status || 500;
    let message = error.message || "Internal Server Error";
    
    switch (error.name) {
        case "Invalid Token":
        case "JsonWebTokenError":
            status = 401;
            message = "Unauthenticated"
            break;     
        case "SequelizeValidationError":
            status = 400;
            message = error.errors[0].message;
            break;
        case "Bad Request Email":
            status = 400;
            message = "Email cannot be empty"
            break;
        case "Bad Request Password":
            status = 400;
            message = "Password cannot be empty"
            break;
        case "Bad Request Image":
            status = 400;
            message = "Image file cannot be empty"
            break;
        case "Unauthorized Incorrect":
            status = 401;
            message = "Email or Password is incorrect";
            break;
        case "Not Found Cuisine":
            status = 404;
            message = "Error cuisine not found";
            break;
        case "Not Found Category":
            status = 404;
            message = "Error category not found"
        case "Forbidden":
            status = 403;
            message = "You are not authorized to do this request"
            break;
    };
    res.status(status).json({ message });
};