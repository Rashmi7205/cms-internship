import {Router} from 'express';
import { register,
    login,
    getProfile,
    changePassword,
    resetPassword,
    deleteUser,
    logout, 
} from '../controller/user.controller.js';
import isLoggedIn from '../middleware/user.auth.js';
import upload from '../middleware/multer.middleware.js';
import multer from 'multer';


const router=Router();
// Register user
router.post('/register',upload.single('profilePic'),register);
// login user
router.post('/login',login);
router.get('/getprofile',isLoggedIn,getProfile);
router.post('/reset/password',resetPassword);
router.post('/reset/password/:resetToken',changePassword);
router.delete('/delete',isLoggedIn,deleteUser);
router.post('/logout',isLoggedIn,logout);

export default router