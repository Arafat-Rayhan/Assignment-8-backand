import mongoose from 'mongoose';

const connectDB=async()=>{
    try{
        await mongoose.connect(process.env.DB_URI);
        console.log('datadase is connect is successfully');
    }catch(err){
        console.log('datadase is not connect yet',err);
    }
}

export default connectDB;