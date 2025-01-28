const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });

    res.cookie("jwt", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000, // 10 days
      secure: process.env.NODE_ENV === "production", // Set true only in production (HTTPS)
      httpOnly: true, // Prevents JS from accessing the cookie
      sameSite: "None", // Allow cross-origin cookies
    });

    res.status(200).json({ message: "Logged in successfully" });
  } catch (err) {
    console.error("Token Generation Error:", err);
    res.status(500).json({ msg: "Token creation failed", err: err.message });
  }
};

module.exports = generateToken;
