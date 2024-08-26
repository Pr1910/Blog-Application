const express=require('express')
const router=express.Router()
const Post=require('../models/Post.js');
const Comment = require('../models/Comment.js')
const verifyToken = require('../Middlewares/verifyToken.js');
const cloudinary = require('../utils/cloudinary.js')

//create
router.post("/create", verifyToken, async(req, res)=>{
    try {   
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    } catch (error) {
        res.status(500).json(error);
    }
})

//update
router.put("/:id", verifyToken, async(req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, {$set:req.body}, {new: true});
        res.status(200).json(updatedPost);

    } catch (error) {
        res.status(500).json(error);
    }
})

//delete
router.delete("/:id", verifyToken, async(req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        const imageURL = post.photo.split('/');
        const image = imageURL[imageURL.length - 1]
        const imageName = image.split('.')[0]
        console.log(imageName);
        cloudinary.uploader.destroy(imageName, (err, res)=>{
            // if(err){
            //     console.log("Image not deleted from cloud.");
            // }

        })
        await Post.findByIdAndDelete(req.params.id);
        await Comment.deleteMany({postId:req.params.id})
        res.status(200).json("Post deleted successfully");

    } catch (error) {
        res.status(500).json(error);
    }
})

//get post
router.get("/:id",async (req,res)=>{
    try{
        const post=await Post.findById(req.params.id)
        res.status(200).json(post)
    }
    catch(err){
        res.status(500).json(err)
    }
})

//get posts
router.get("/", async(req, res) => {
    const query=req.query;
    try {
        const searchFilter={
            title:{$regex:query.search, $options:"i"}
        }
        const post = await Post.find(query.search?searchFilter:null);
        res.status(200).json(post);

    } catch (error) {
        res.status(500).json(error);
    }
})


//get user's posts
router.get("/user/:userId",async (req,res)=>{
    try{
        const posts=await Post.find({userId:req.params.userId})
        res.status(200).json(posts)
    }
    catch(err){
        res.status(500).json(err)
    }
})


module.exports = router