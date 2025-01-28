const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 60000, // 60 seconds timeout
  socketTimeoutMS: 60000, // 60 seconds socket timeout
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("MongoDB connection error:", err));

