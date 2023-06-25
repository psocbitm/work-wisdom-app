// errorMiddleware.js

const errorMiddleware = (err, req, res) => {
  // Default error status code and message
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  // Customize error handling based on error type or status code
  switch (err.name) {
    case "ValidationError":
      statusCode = 400;
      message = "Validation Error";
      break;
    case "UnauthorizedError":
      statusCode = 401;
      message = "Unauthorized";
      break;
    case "NotFoundError":
      statusCode = 404;
      message = "Not Found";
      break;
    // Add more custom error cases here, if needed
    default:
      // Handle unhandled errors gracefully
      statusCode = 500;
      message = "An unexpected error occurred";
  }

  // Log the error with timestamp and request details
  console.error(`[${new Date().toISOString()}] Error: ${message}`);
  console.error(`Request URL: ${req.originalUrl}`);
  console.error(`Request Method: ${req.method}`);
  console.error(`Request Body:`, req.body);
  console.error(`Stack Trace:`, err.stack);

  // Send the error response
  res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
  
};

module.exports = errorMiddleware;
