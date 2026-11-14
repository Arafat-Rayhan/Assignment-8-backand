import { categorySlugs } from "../constants/categories.js"; 
import Post from '../models/post.models.js'
import cloudinary from '../config/cloudinary.js';
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
 


// CREAT POST



export const createPost = async (req, res) => {
  try {
    const { title, content, createdAt, eventDate, category, location } = req.body;

    if (!categorySlugs.includes(category)) {
      return res.status(400).json({ success: false, message: "Invalid category" });
    }
    if (!location || !location.trim()) {
      return res.status(400).json({ success: false, message: "Location is required" });
    }

     let imageUrl = '';

if (req.file) {
  const uploadResult = await new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: 'posts' }, (error, result) => {
        if (error) reject(error);
        else resolve(result);
      })
      .end(req.file.buffer);
  });

  imageUrl = uploadResult.secure_url;
}


    const newPost = new Post({
      title,
      content,
      createdAt,
      eventDate,
      category,
      location: location.trim(),
      image: imageUrl || req.body.image,
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

// upcoming event
export const getUpcomingPosts = async (req, res) => {
  try {
    const limit = Math.min(Number(req.query.limit) || 12, 30);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filter = {  };

    //eventDate: { $gte: today }

    if (req.query.category) {
      if (!categorySlugs.includes(req.query.category)) {
        return res.status(400).json({ success: false, message: "Invalid category" });
      }
      filter.category = req.query.category;
    }

    const posts = await Post.find(filter).sort({ eventDate: 1 }).limit(limit);

    return res.status(200).json({ success: true, data: posts });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server is error", error: err.message });
  }
};

export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ success: false, message: "Post not found" });
    }
    return res.status(200).json({ success: true, data: post });
  } catch (err) {
    return res.status(400).json({ success: false, message: "Invalid post id" });
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
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      content,
      eventDate,
      category,
      location,
    } = req.body;

    // Find existing post
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    // Check post ownership
    if (post.author.toString() !== req.user.id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this post",
      });
    }

    // Validate category
    if (
      category !== undefined &&
      !categorySlugs.includes(category)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid category",
      });
    }

    // Validate location
    if (location !== undefined && !location.trim()) {
      return res.status(400).json({
        success: false,
        message: "Location is required",
      });
    }

    // Update text fields only when provided
    if (title !== undefined) post.title = title;
    if (content !== undefined) post.content = content;
    if (eventDate !== undefined) post.eventDate = eventDate;
    if (category !== undefined) post.category = category;

    if (location !== undefined) {
      post.location = location.trim();
    }

    // Upload new image if provided
    if (req.file) {
      const uploadResult = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { folder: "posts" },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(req.file.buffer);
      });

      post.image = uploadResult.secure_url;
    }

    // Save updated post
    const updatedPost = await post.save();

    return res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error updating post",
      error: error.message,
    });
  }
};

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


// join

  export const joinEvent= async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    const postsCollection = db.collection("posts");
    const joinsCollection = db.collection("joins");

    const post = await postsCollection.findOne({
      _id: new ObjectId(postId),
    });

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const existingJoin = await joinsCollection.findOne({
      postId: new ObjectId(postId),
      userId,
    });

    if (existingJoin) {
      return res.status(409).json({
        message: "Already joined",
      });
    }

    await joinsCollection.insertOne({
      postId: new ObjectId(postId),
      userId,
      joinedAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Successfully joined",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to join event",
    });
  }
  };

// leve from event

  export const leveEvent= async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    const joinsCollection = db.collection("joins");

    const result = await joinsCollection.deleteOne({
      postId: new ObjectId(postId),
      userId,
    });

    if (result.deletedCount === 0) {
      return res.status(404).json({
        message: "You have not joined this event",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully left the event",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to leave event",
    });
  }
  };

  // chake join

  // Check Join Status

export const checkJoinStatus = async (req, res) => {
  try {
    const { postId } = req.params;
    const userId = req.user.id;

    if (!ObjectId.isValid(postId)) {
      return res.status(400).json({
        message: "Invalid post ID",
      });
    }

    const joinsCollection = db.collection("joins");

    const existingJoin = await joinsCollection.findOne({
      postId: new ObjectId(postId),
      userId,
    });

    res.status(200).json({
      success: true,
      isJoined: !!existingJoin,
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to check join status",
    });
  }
};