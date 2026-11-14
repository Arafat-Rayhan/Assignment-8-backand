import mongoose from 'mongoose';
import {categorySlugs} from '../constants/categories.js'


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


    eventDate: {
         type: Date,
          required: true
         },

    category: {
         type: String,
          required: true,
           enum: categorySlugs
         },

    location: {
         type: String,
          required: true,
        trim: true 
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