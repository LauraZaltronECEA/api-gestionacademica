function errorHandler(err, req, res, next) {
    const statusCode = err.status || 500;
    res.status(statusCode).send({
        message: err.message
    });
}

function errorLog(err, req, res, next) {
    console.error(err);
    next(err);
}

module.exports = {
    errorHandler,
    errorLog
};