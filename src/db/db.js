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


// import mongoose from 'mongoose';

// let isConnected = false;  

// const connectDB = async () => {
//     if (isConnected) {
//         return;
//     }

//     try {
//         const db = await mongoose.connect(process.env.DB_URI, {
//             bufferCommands: false, 
//         });

//         isConnected = db.connections[0].readyState === 1;
//         console.log('Database connected successfully');
//     } catch (err) {
//         console.log('Database connection error:', err);
//         throw err;
//     }
// };

// export default connectDB;






const connectDB = async () => {
  try {
    const db = await mongoose.connect(process.env.DB_URI); // bufferCommands অপশনটি সরিয়ে দিন
    isConnected = db.connections[0].readyState === 1;
    console.log('Database connected successfully');
  } catch (err) {
    console.log('Database connection error:', err);
    throw err;
  }
};



// import mongoose from 'mongoose';

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = {
//     conn: null,
//     promise: null,
//   };
// }

// const connectDB = async () => {
//   if (cached.conn && cached.conn.connection.readyState === 1) {
//     return cached.conn;
//   }

//   if (!cached.promise) {
//     cached.promise = mongoose.connect(process.env.DB_URI, {
//       bufferCommands: false,
//     });
//   }

//   try {
//     cached.conn = await cached.promise;
//     console.log('MongoDB connected successfully');
//     return cached.conn;
//   } catch (error) {
//     cached.promise = null;
//     console.error('MongoDB connection error:', error);
//     throw error;
//   }
// };

// export default connectDB;