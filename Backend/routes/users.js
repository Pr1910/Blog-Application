const express=require('express')
const router=express.Router()
const User=require('../models/User')
const Post=require('../models/Post')
const Comment=require('../models/Comment')
const bcrypt=require('bcrypt')


//update
router.put("/:id", async(req, res) => {
    try {
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            req.body.password =  bcrypt.hashSync(req.body.password, salt);

        }

        const updateUser = await User.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true});
        res.status(200).json(updateUser);

    } catch (error) {
        res.status(500).json(error);
    }
})

//delete
router.delete("/:id", async(req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        await Post.deleteMany({userId:req.params.id});
        await Comment.deleteMany({userId:req.params.id});
        res.status(200).json("User deleted successfully");

    } catch (error) {
        res.status(500).json(error);
    }
})

//get user
router.get("/:id", async(req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const {password,...info}=user._doc;
        res.status(200).json(info);

    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router