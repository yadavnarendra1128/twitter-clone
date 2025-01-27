const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const User = require("../models/user.js");
const {
  signUpValidator,
  logInValidator,
} = require("../utils/validators/auth.validators.js");
const generateToken = require("../utils/generateToken.js");

const signUp = async (req, res) => {
  try {
    const body = req.body;
    const success = signUpValidator.safeParse(body);

    if (!success.success) {
      return res
        .status(400)
        .json({ msg: "Bad Request Data", err: success.error.issues[0] });
    }

    const { username, email, password, fullname} = body;

    const emailExists = await User.findOne({ email });

    if (emailExists) {
      return res.status(409).json({ msg: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      fullname,
    });

if (!user || !user._id) {
  return res.status(500).json({ msg: "Error: User creation failed" });
}

generateToken(user._id, res);

    await generateToken(user._id, res);

    return res.status(201).json({
      userInfo: { fullname, email, username },
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", err: err });
  }
};

const logIn = async (req, res) => {
  try {
    const body = req.body;

    const success = logInValidator.safeParse(body);

    if (!success.success) {
      return res
        .status(400)
        .json({ msg: "wrong input format", err: success.error.issues[0] });
    }

    // if (body?.email) {
    //   const Exists = await User.findOne({ email: body.email });

    //   if (!Exists) {
    //     return res.status(409).json({ msg: "Email doesn't exists" });
    //   }
    // }

    // if (body?.username) {
      const Exists = await User.findOne({ username: body.username });

      if (!Exists) {
        return res.status(409).json({ msg: "Username doesn't exists" });
      }

      const isMatch = await bcrypt.compare(body.password, Exists.password);

      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid password" });
      }
    // }

    generateToken(Exists._id, res);

    const {
      rest,
      _id,
      fullname,
      username,
      email,
      followers,
      following,
      profileImg,
      coverImg,
    } = Exists;

    return res.status(201).json({
      data: {
        _id,
        fullname,
        username,
        email,
        followers,
        following,
        profileImg,
        coverImg,
      },
    });
  } catch (err) {
    res.status(500).json({ msg: "Internal Server Error", err: err });
  }
};

const logOut = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    return res.status(200).json({user});
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCookie = async (req, res) => {
  try {
    const token = req.cookies?.jwt;
    if (!token) return res.status(401).json({ msg: "token is not presnt" });
    return res.status(201).json({token})
  }catch(err){
    return res.status(500).json({ error: "cookie access failed" });
  }
}

module.exports = { signUp, logIn, logOut, myProfile,getCookie};
