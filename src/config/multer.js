import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

export default upload;




























// import express from "express";
// import cloudinary from "../config/cloudinary.js";
// import upload from "../config/multer.js";

// const router = express.Router();

// router.post(
//   "/profile-image",
//   upload.single("image"),
//   async (req, res) => {
//     try {
//       // Check image
//       if (!req.file) {
//         return res.status(400).json({
//           success: false,
//           message: "Please select an image",
//         });
//       }

//       // Upload image to Cloudinary
//       const result = await new Promise((resolve, reject) => {
//         const stream = cloudinary.uploader.upload_stream(
//           {
//             folder: "profile-images",
//             resource_type: "image",
//           },
//           (error, result) => {
//             if (error) {
//               reject(error);
//             } else {
//               resolve(result);
//             }
//           }
//         );

//         stream.end(req.file.buffer);
//       });

//       // Send image URL to frontend
//       return res.status(200).json({
//         success: true,
//         message: "Image uploaded successfully",
//         imageUrl: result.secure_url,
//         publicId: result.public_id,
//       });

//     } catch (error) {
//       console.error("Cloudinary Upload Error:", error);

//       return res.status(500).json({
//         success: false,
//         message: "Image upload failed",
//       });
//     }
//   }
// );

// export default router;