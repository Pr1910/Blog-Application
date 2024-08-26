const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser')
const cors = require('cors')
const multer = require('multer')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const cloudinary = require('./utils/cloudinary')

//database connection
const connectDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Database Connected")
    } catch (error) {
        console.log(error);
    }
}

//middlewares
dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:process.env.FRONTEND_URL,credentials:true}))
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)

const storage=multer.diskStorage({
    destination:(req,file,fn)=>{
        fn(null,"images")
    },
    filename:(req,file,fn)=>{
        //fn(null,req.body.image)
        fn(null, file.originalname);
        //fn(null, "image1.jpg");
    }
})



const upload=multer({storage:storage})
app.post("/api/upload",upload.single("file"),(req,res)=>{
    cloudinary.uploader.upload(req.file?.path, function(err, result){
        if(err){
            console.log(err);
            return res.status(500).json("Error uploading the image");
        }
        console.log(result);
        return res.status(200).json({
            message:"Image uploaded successfully",
            result
        });
    })
})


app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log(`Server is running on PORT ${process.env.PORT}`);
})