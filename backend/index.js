require("dotenv").config(); 
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const connectDB = require("./config/db");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const notificationRoutes = require("./routes/notification");

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(
  cors({
    origin: process.env.FRONTEND_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, 
  })
);
app.use(express.json({ limit: "5mb" })); 
app.use(cookieParser());


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () => {
  connectDB()
  console.log(`Server is running on port ${PORT}`);
});