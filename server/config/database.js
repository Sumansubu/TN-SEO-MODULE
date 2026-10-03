import mongoose from "mongoose";

/**
 * MongoDB connection.
 *
 * - Uses `MONGO_URI` from the environment whenever it is set (required in production).
 * - In development only, falls back to an in-memory MongoDB so the app can be
 *   run locally without a system-wide MongoDB installation.
 */
let memoryServer = null;

export async function connectDB() {
    const uri = process.env.MONGO_URI;
    let mongoUri = uri;

    if (!mongoUri) {
        if (process.env.NODE_ENV === "production") {
            throw new Error("MONGO_URI is not set. Configure it before running in production.");
        }

        let MongoMemoryServer;
        try {
            ({ MongoMemoryServer } = await import("mongodb-memory-server"));
        } catch {
            throw new Error(
                "MONGO_URI is not set and the in-memory MongoDB fallback is not installed. " +
                    "Run `npm install` inside the server/ folder or set MONGO_URI."
            );
        }

        memoryServer = await MongoMemoryServer.create();
        mongoUri = memoryServer.getUri("tn-seo");
        console.log("[db] MONGO_URI not set - using an in-memory MongoDB (development only).");
    }

    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 10000 });
    console.log("[db] MongoDB connected");

    return memoryServer;
}

export async function disconnectDB() {
    await mongoose.disconnect();
    if (memoryServer) {
        await memoryServer.stop();
        memoryServer = null;
    }
}
