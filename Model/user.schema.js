import { Model, Schema,model} from "mongoose";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    name:{
        type:String,
        maxLength:[50,'Max length is 50'],
        minLength:[3,'Min Length is 3 char'],
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true,'Email must be unique']
    },
    password:{
        type:String,
        minLength:[3,'password must be 3 char atleast'],
        required:true,
        select:false
    },
    avatar:{
        public_id:{
            type:String,
        },
        secure_url:{
            type:String,
        },
    },
    blogs:{
        type:Array,
    },
    resetPasswordToken:{
        type:String,
    },
    forgotPasswordOtp:{
        type:String,
    },
    forgotPasswordExpiryTime:{
        type:Date
    }
},{timestamps:true});

userSchema.pre('save',async function (){
    if(!this.isModified('password')){
        next();
    }
    this.password = await bcrypt.hash(this.password,10);
});

export default model('Users',userSchema);