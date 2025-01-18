import express from 'express';
import dotenv from 'dotenv'
import mongoose from 'mongoose';
import fileUpload from 'express-fileupload';
import { v2 as cloudinary } from 'cloudinary';
import userRoutes from './routes/user.route.js';
import blogRoute from './routes/blog.route.js'
import cookieParser from 'cookie-parser';
import cors from 'cors'

const app = express();
dotenv.config();
const port= process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const FRONTEND_URL = process.env.FRONTEND_URL;

// middleware
app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin:"https://blog-frontend-ten-iota.vercel.app", // Frontend URL
    credentials:true, // Allow sending cookies
    methods:['GET','POST','PUT','DELETE']
}))

app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp/'
}))


// console.log(MONGO_URI);
// ******* databse connecttion ***** 
try {
    mongoose.connect(MONGO_URI);
    console.log("Databse successfully connected");
} catch (error) {
    console.log(error);
}


app.get('/', (req, res) => {
    res.send('Welcome to the Blog Backend!');
});

app.use('/api/users',userRoutes);
app.use('/api/blogs',blogRoute);

//  Cloudinary code
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.CLOUD_API_KEY, 
    api_secret: process.env.CLOUD_SECRET_KEY
});
app.listen(port,()=>{
    console.log(`server is listening at port ${port}`);
})