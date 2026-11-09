import Post from '../models/post.models.js'
// get all data
export const getAllData= async(req,res)=>{
    try{
        const posts =await Post.find();
        res.status(200).json({
            success:true,
            count:posts.length,
            data:posts,
        })
    }catch(err){
        res.status(500).json({
        success:false,
        message:'server is error',
        error:err.message
        })
       
    }
} 

// create post


 export const createPost = async (req, res) => {
  try {
    const { title, content, createAt, } = req.body;


    const newPost = new Post({
      title,
      content,
      createAt,
    });

    // ২. save to database
    const savedPost = await newPost.save();

    return res.status(201).json({
      success: true,
      message: 'পোস্ট সফলভাবে তৈরি হয়েছে!',
      data: savedPost
    });

  } catch (error) {
 
    return res.status(500).json({
        success: false,
        message: 'error in server',
        error: error.message
    });
};
}

// update 
export const upDatePost= async (req,res)=>{
    try {
        const {id}=req.params;
        const updatedData=req.body;
        const post = await Post.findByIdAndUpdate(id,updatedData,{new:true})
        if(!post){return res.status(404).json({sucess:false,massage:'post not found'})}
        res.status(200).json({
            success:true,
            message:'post is created',
            data:post,
        });
    } catch (error) {
        res.status(500).json({success:false,massage:error.massage})
    }
}

// delete

export const deletePost=async (req,res)=>{
    try{
        const {id} =req.params;
        const post = await Post.findByIdAndDelete(id);
        if(!post){return res.status(404).json({success:false,massage:'post not delete'})}
        res.status(200).json({
            success:true,
            massage:'post is deleted'
        })
    }catch(err){
        res.status(500).json({success:false,message:err.massage})
    }
}