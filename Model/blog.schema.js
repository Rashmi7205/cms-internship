import {model,Schema} from 'mongoose';

const blogSchema = new Schema({
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String
    },
    author:{
        type:Object,
        required:true,
    },
    content:{
        type:String,
    },
    catagory:{
        type:String,
    },
    image:{
        public_id :{
            type:String,
        },
        secure_url:{
            type:String,
        }
    },
   imageCaption:{
    type:String,
   }
},{timestamps:true});

export default model('Blogs',blogSchema);