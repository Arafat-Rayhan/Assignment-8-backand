import Post from '../models/post.models.js'
// get all data
export const getAllPost= async(req,res)=>{
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

// // Create Post
// export const createPost = async (req, res) => {
//   try {
//     const {
//       title,
//       content,
//       createdAt,
//       eventData,
//       image
//     } = req.body;

//     // Create new post
//     const newPost = new Post({
//       title,
//       content,
//       createdAt,
//       eventData,
//       image,
//       author: req.user.id,
//     });

//     // Save to database
//     const savedPost = await newPost.save();

//     return res.status(201).json({
//       success: true,
//       message: "পোস্ট সফলভাবে তৈরি হয়েছে",
//       data: savedPost,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Error in server",
//       error: error.message,
//     });
//   }
// };







import cloudinary from '../config/cloudinary.js';

export const createPost = async (req, res) => {
  try {
    const { title, content, createdAt, eventData } = req.body;
    let imageUrl = '';

    // যদি ব্যবহারকারী কোনো ছবি আপলোড করে থাকে
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          { folder: 'posts' }, 
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      imageUrl = uploadResult.secure_url; // ক্লাউডিনারি থেকে পাওয়া ছবির পার্মানেন্ট লিংক
    }

    // Create new post
    const newPost = new Post({
      title,
      content,
      createdAt,
      eventData,
      image: imageUrl || req.body.image, // ফাইল থাকলে ক্লাউডিনারি লিংক, না থাকলে বডির ডেটা
      author: req.user.id,
    });

    // Save to database
    const savedPost = await newPost.save();

    return res.status(201).json({
      success: true,
      message: "পোস্ট সফলভাবে তৈরি হয়েছে",
      data: savedPost,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in server",
      error: error.message,
    });
  }
};








// get the  post that created by me


export const getMyPosts = async (req, res) => {
  try {
    const userId = req.user.id;

    const myPosts = await Post.find({ author: userId })
      .sort({ createdAt: -1 });  

    return res.status(200).json({
      success: true,
      count: myPosts.length,
      data: myPosts,
    });

  } catch (error) {
    console.error("Error fetching my posts:", error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

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