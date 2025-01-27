const jwt = require("jsonwebtoken");

const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: "10d",
    });
    res.cookie("jwt", token, {
      maxAge: 10 * 24 * 60 * 60 * 1000,
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "strict",
    });
  } catch (err) {
    return res.json({ msg: "token creation failed", err });
  }
};

module.exports = generateToken;
