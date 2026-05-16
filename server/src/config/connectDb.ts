import mongoose from "mongoose";

export const connectDb = async()=>{
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL as string);
        console.log(`MongoDB Connected : ${connect.connection.host}`);
    } catch (error) {
        if(error instanceof Error){
        throw new Error(error.message)
        }
    }
}