import { config } from "dotenv";
import express from "express";
import cloudinary,{v2} from "cloudinary";

import connectToDb from "./dbconnection.js";
import app from "./app.js";

config();

v2.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
});


app.listen(process.env.PORT||5050,()=>{
    connectToDb();
    console.log(`Server is Running at ${process.env.PORT}`)
})
