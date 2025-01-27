// import mongoose from "mongoose";

// const connection: { isConnected?: number } = {};

// async function dbConnect() {
//   if (connection.isConnected) {
//     // Return if already connected
//     console.log("Using existing database connection");
//     return;
//   }

//   if (!process.env.MONGODB_URI) {
//     throw new Error("MONGODB_URI is not defined in environment variables");
//   }

//   try {
//     const db = await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: "FlextableDB", // Specify the database name here
//     });
//     connection.isConnected = db.connections[0].readyState;
//     console.log("Database connected");
//   } catch (error) {
//     console.error("Failed to connect to the database", error);
//     throw new Error("Database connection error");
//   }
// }

// async function dbDisconnect() {
//   if (connection.isConnected) {
//     try {
//       await mongoose.disconnect();
//       connection.isConnected = 0;
//       console.log("Database disconnected");
//     } catch (error) {
//       console.error("Error while disconnecting from database", error);
//     }
//   }
// }

// export { dbConnect, dbDisconnect };

import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Using existing database connection");
    return;
  }

  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI is not defined in environment variables");
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "FlextableDB",
      // Add these connection options for improved stability
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
      socketTimeoutMS: 45000,
      maxPoolSize: 10, // Limit connection pool size
    });

    connection.isConnected = db.connections[0].readyState;

    // Add error handling for the connection
    mongoose.connection.on("error", (err) => {
      console.error("MongoDB connection error:", err);
      connection.isConnected = 0;
    });

    console.log("Database connected");
  } catch (error) {
    console.error("Failed to connect to the database", error);
    connection.isConnected = 0;
    throw new Error("Database connection error");
  }
}

async function dbDisconnect() {
  if (connection.isConnected) {
    try {
      await mongoose.disconnect();
      connection.isConnected = 0;
      console.log("Database disconnected");
    } catch (error) {
      console.error("Error while disconnecting from database", error);
    }
  }
}

export { dbConnect, dbDisconnect, connection };