import AppError from "../utils/apperror.js";
import User from '../model/user.schema.js';
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import emailValidator from 'email-validator';
import cloudinary from 'cloudinary';
import fs from 'fs/promises';
import sendEmail from "../utils/sendmail.js";


const cookieOption = {
    maxAge:7*24*60*60*1000, ///7 days
    httpOnly:true,
}

const register = async (req,res,next)=>{
    try {
        const {name,email,password} = req.body;

        if(!name || !email || !password){
            return next(new AppError("All Fields are required",400));
        }
        

        if(!emailValidator.validate(email)){
            return next(new AppError("Invalid Email id",400));
        }

        const userExist = await User.findOne({email});
        if(userExist){
            return next(new AppError("Already user Registered ",500));
        }

        const user = await User.create({
            name,
            email,
            password,
            description:"",
            profilePic:{
                public_id:"#",
                secure_url:"https://res.cloudinary.com/dkkaj165g/image/upload/v1691595963/blog/pngtree-business-people-avatar-icon-user-profile-free-vector-png-image_1527664_zflele.jpg",
            },
            totalFollwer:0,
            totlalLikes:0,
            socialLinks:{
                whatsapp:"#",
                linkedin:"#",
                instagram:"#",
                facebook:"#",
            },
            blogs:[]
        });

        if(req.file){
            await cloudinary.v2.uploader.destroy(user.profilePic.public_id);
            const result = await cloudinary.v2.uploader.upload(req.file.path,{
                folder:'blog',
                width:250,
                height:250,
                gravity:'faces',
                crop:'fill'
            });
            if(result){
                user.profilePic.public_id= result.public_id
                user.profilePic.secure_url=result.secure_url;

                
               // await fs.rm( `uploads/${req.file.filename}`);
            }
    
        }

        await user.save();

        user.password=undefined;

        const token = await user.genertateJWTToken();

        res.cookie('token',token,cookieOption);


        res.status(200).json({
            success:true,
            message:"Registration succsessfull",
            user
        }
        );

    } catch (error) {
        return next(new AppError(error.message,400));
    }    

}

const login = async (req,res,next)=>{

    try {
        const {email,password} = req.body;

        if(!email||!password){
            return next(new AppError("All fields are mandatoty",400));
        }

        if(!emailValidator.validate(email)){
            return next(new AppError("Invalid Email id",400));
        }

        const user = await User.findOne({email}).select('+password');
    
        if(!user || !await user.comparePassword(password)){
            return next(new AppError("Invalid Credentials",400));
        }

        const token = await user.genertateJWTToken();

        res.cookie("token",token,cookieOption);
        user.password=undefined;
        res.status(200).json({
            success:true,
            message:"Logged in Successfully",
            user
        })
    } catch (error) {
        return next(new AppError(error.message,400));
    }
}



const getProfile = async (req,res,next)=>{
        try{
            if(!req.user){
                return next(new AppError("Authentication Failed",400));
            }
           
            const {id} = req.user;

            const user = await User.findById(id);

            if(!user){
                return next(new AppError("User Does not Exist",400));
            }

            user.password=undefined;
            res.status(200).json({
                success:true,
                message:"User Fetched Succsessfully",
                user
            });

        }catch(error){
            return next(new AppError(error.message,400));
        }
} 



const resetPassword = async(req,res,next)=>{
   
}

const changePassword = async (req,res,next)=>{
    
    try {
        const {newPassword} = req.body;
        const {resetToken} = req.params;

        console.log(resetToken)

        if(!newPassword){
            return next(new AppError("Password is Required",400));
        }

        if(!resetToken){
            return next(new AppError("Unauthorized Request",400));
        }

        const user = await User.findOne({forgotPasswordToken:resetToken});

        if(!user){
            return next(new AppError("User Does Not exist",400));
        }

        user.password=newPassword;
        user.forgotPasswordToken =undefined;

        await user.save();


        res.status(200).json({
            success:true,
            message:"Password Updated Successfully"
        });

    } catch (error) {
        return next(new AppError(error.message,400));
    }


}

const deleteUser = async(req,res,next)=>{
    try {
            const {id} = req.user;

            const user = await User.findByIdAndDelete(id);

            if(!user){
                return next(new AppError("something went wrong",400));
            }
 
            res.status(200).json({
                success:true,
                message:"User Deleted Succsessfully",
            });

    } catch (error) {
        return next(new AppError(error.message,400));
    }
}

const logout = async(req,res,next)=>{
    try {
        res.cookie('token',null);
        res.status(200).json({
            success:true,
            message:"Logout Successfully",
        })
    } catch (error) {
        return next(new AppError("Invalid Request",500));
    }
}


export {
    register,
    login,
    getProfile,
    changePassword,
    resetPassword,
    deleteUser,
    logout, 
}