// import mongoose from 'mongoose';

// const connectDB=async()=>{
//     try{
//         await mongoose.connect(process.env.DB_URI);
//         console.log('datadase is connect is successfully');
//     }catch(err){
//         console.log('datadase is not connect yet',err);
//     }
// }

// export default connectDB;


import mongoose from 'mongoose';

let isConnected = false;  

const connectDB = async () => {
    if (isConnected) {
        return;
    }

    try {
        const db = await mongoose.connect(process.env.DB_URI, {
            bufferCommands: false, 
        });

        isConnected = db.connections[0].readyState === 1;
        console.log('Database connected successfully');
    } catch (err) {
        console.log('Database connection error:', err);
        throw err;
    }
};

export default connectDB;