const { CustomAPIError } = require("./custom-error");

exports.errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json(err.message);
  }
  return res.status(500).json(err);
};
