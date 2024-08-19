const express = require('express');
const { default: mongoose } = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')

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
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/comments', commentRoute)


app.listen(process.env.PORT, ()=>{
    connectDB();
    console.log(`Server is running on PORT ${process.env.PORT}`);
})