const mongoose = require("mongoose");

// Old code (with deprecated options)
mongoose.connect(process.env.MONGO_URI, {
});

// Updated code (no deprecated options)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));
