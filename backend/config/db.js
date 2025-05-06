const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

// Suppress the strictQuery deprecation warning
mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    console.log(
      `Attempting to connect to MongoDB at ${
        process.env.MONGO_URI
          ? process.env.MONGO_URI.split("@")[1]
          : "URI not set"
      }`
    ); // Log target host (hide credentials)
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 10000, // Added timeout for clearer errors
      socketTimeoutMS: 45000, // Optional: longer socket timeout
    });
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error("MongoDB Connection Error:", err); // Log the full error object
    console.error("Error Message:", err.message);
    console.error(
      "\n--- Make sure your current IP address is whitelisted in MongoDB Atlas --- "
    );
    console.error("--- Verify the MONGO_URI in your .env file is correct ---");
    // Exit process with failure - essential for app stability if DB is required
    process.exit(1);
  }
};

module.exports = connectDB;
