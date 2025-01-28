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

const corsOptions = {
  origin: 'https://twitter-clone-1-ujja.onrender.com',  // Frontend domain
  credentials: true,  // Allow cookies (credentials) to be sent with requests
};

app.use(cors(corsOptions));  // Apply CORS middleware


app.use(express.json()); 
app.use(cookieParser());

const path = require("path");
app.use(express.static(path.join(__dirname, "public")));


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/notifications", notificationRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

