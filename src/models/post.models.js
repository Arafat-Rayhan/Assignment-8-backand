import mongoose from 'mongoose';


const postSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    
    createdAt:{
        type:String,
        default: Date.now
    }
})

const Post=mongoose.model('Post',postSchema);
export default Post;