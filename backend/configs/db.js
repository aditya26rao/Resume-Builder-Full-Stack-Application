import mongoose from "mongoose";

const connectDB = async () => {
    try {
        let mongodbURI = process.env.MONGODB_URI;
        const projectName = "resume-builder";

        if (!mongodbURI) {
            throw new Error("MONGODB_URI environment variable not set");
        }

        // remove trailing slash
        if (mongodbURI.endsWith("/")) {
            mongodbURI = mongodbURI.slice(0, -1);
        }

        // connect
        await mongoose.connect(`${mongodbURI}/${projectName}`);

        mongoose.connection.on("connected", () => {
            console.log("✅ Database connected successfully");
        });

    } catch (error) {
        console.error("❌ Database connection failed:", error.message);
    }
};

export default connectDB;
