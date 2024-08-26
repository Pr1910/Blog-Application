const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    const newUser = new User({ username, email, password: hashedPassword });
    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json("User Not Found");
    }

    const match = bcrypt.compareSync(req.body.password, user.password);
    if (!match) {
      return res.status(401).json("Invalid Credentials");
    }

    const token = jwt.sign(
      { _id: user._id, username: user.username, email: user.email },
      process.env.SECRET,
      { expiresIn: "3d" }
    );
    const { password, ...info } = user._doc;
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      path: "/",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful", info });
  } catch (err) {
    res.status(500).json(err);
  }
});

//logout
router.get("/logout", (req, res) => {
  try {
    res
      .clearCookie("token", { sameSite: "none", secure: true })
      .status(200)
      .json("Logged out successfully!");
  } catch (error) {
    res.status(500).json(error);
  }
});


// refetch user
// router.get("/refetch", (req,res)=>{
//   const token=req.cookies.token
//   jwt.verify(token,process.env.SECRET,{},async (err,data)=>{
//       if(err){
//           return res.status(404).json(err)
//       }
//       res.status(200).json(data)
//   })
// });

router.get("/refetch", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    
    res.status(200).json(data);
  });
});

// router.get('/token', (req, res) =>{
//   const token = req.cookies.toke;
//   if(!token)
//       return res.status(401).json({message: "No token found"});
  
//   return res.status(200).json(token);
// })

module.exports = router;
