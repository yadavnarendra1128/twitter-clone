const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protectRoute = async (req, res,next)=>{
    const token = req.cookies?.jwt

    if(!token){
        return res.status(401).json({message: "Token is not provided."});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if(!decoded.userId){
        return res.status(401).json({message: "Invalid token."});
    }

    const user = await User.findOne({_id: decoded.userId});

    if(!user){
    return res
      .status(401)
      .json({ message: "User not found. protectRoute" });
    }
    req.user = user;
    next();
}
module.exports = protectRoute;