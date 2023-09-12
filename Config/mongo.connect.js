import mongoose from "mongoose";

const connectToDb = async ()=>{

    const connectionObj = await mongoose.connect(process.env.MONGO_URL);
    console.log(connectionObj.connection.host);
}

export default connectToDb;