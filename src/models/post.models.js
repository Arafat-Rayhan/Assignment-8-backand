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
    },

    eventData:{
        type:String,
        require:true,
        validator:{
            validator:(value)=> value > new Date(),
            message:'your date must de in future'
        }
    },
    
     image:{
         type:String,
         default:null
     },
    

    author:{
        type: mongoose.Schema.Types.ObjectId,
        require:true,
    }

})

const Post=mongoose.model('Post',postSchema);
export default Post;