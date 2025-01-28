const mongoose = require("mongoose");
// Updated code (no deprecated options)
mongoose
  .connect(process.env.MONGO_URI,{serverSelectionTimeoutMS: 60000,)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
