import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

/**
 * Starts the server and establishes database connection
 * @async
 * @function startServer
 * @throws {Error} If database connection or server startup fails
 */
const startServer = async () => {
  try {
    // Connect to MongoDB using the URL from environment variables
    await mongoose.connect(envVars.DB_URL!, {
      dbName: "tourManagementDB", // Specify the database name
    });

    console.log("Connected to DB!!");

    // Start the Express server on the specified port
    server = app.listen(envVars.PORT, () => {
      console.log("Server is listening on port", envVars.PORT);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
  }
};

// Immediately invoked function expression to start server and seed super admin
(async () => {
  await startServer();
  await seedSuperAdmin(); // Seed super admin user after server starts
})();

// Graceful shutdown handlers

/**
 * Handle SIGTERM signal for graceful shutdown
 * @event process:SIGTERM
 */
process.on("SIGTERM", () => {
  console.log("SIGTERM Signal Received. Server Shutting Down...");
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

/**
 * Handle unhandled promise rejections
 * @event process:unhandledRejection
 * @param {Error} err - The rejection error
 */
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection Detected. Server Shutting Down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

/**
 * Handle uncaught exceptions
 * @event process:uncaughtException
 * @param {Error} err - The uncaught exception
 */
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception Detected. Server Shutting Down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});