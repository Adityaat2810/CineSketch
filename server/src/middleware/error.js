"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TryCatch = exports.errorMiddleware = void 0;
var errorMiddleware = function (err, req, res, next) {
    err.message || (err.message = "Internal server error");
    err.statusCode || (err.statusCode = 500);
    if (err.name === "CastError")
        err.message = "Invalid id";
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
exports.errorMiddleware = errorMiddleware;
// wrapper type 
var TryCatch = function (func) {
    (function (req, res, next) {
        return Promise.resolve(func(req, res, next)).catch(next);
    });
};
exports.TryCatch = TryCatch;
