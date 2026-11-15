import express from 'express';
import {
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  getAllPost,
  getUpcomingPosts,
  getPostById,
  joinEvent,
  leveEvent,
  getJoinedPosts,
  checkJoinStatus,
} from '../controllers/post.controllers.js';
import upload from '../config/multer.js';
import verifyApiToken from '../middleweres/post.jwt.js';

const router = express.Router();

// Static রুটগুলো আগে (/:id এর আগে)
router.get('/', getAllPost);
router.get('/upcoming', getUpcomingPosts);
router.get('/my-posts', verifyApiToken, getMyPosts);

// Create
router.post('/create', verifyApiToken, upload.single('image'), createPost);

// Join / Leave / Status
router.get('/:postId/join-status', verifyApiToken, checkJoinStatus);
router.post('/:postId/join', verifyApiToken, joinEvent);
router.get('/joined', verifyApiToken, getJoinedPosts);
router.delete('/:postId/leave', verifyApiToken, leveEvent);

// Single, Update, Delete (/:id সবার শেষে)
router.get('/:id', getPostById);
router.put('/:id', verifyApiToken, upload.single('image'), updatePost);
router.delete('/:id', verifyApiToken, deletePost);

export default router;