import { config } from "dotenv";
import express from "express";
import cloudinary,{v2} from "cloudinary";

import app from './app.js';
import connectToDb from './Config/mongo.connect.js';


config();

v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


app.listen(process.env.PORT,()=>{
    connectToDb();
    console.log(`App is Running on ${process.env.PORT}`);
})