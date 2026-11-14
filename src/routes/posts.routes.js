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
  checkJoinStatus,
} from '../controllers/post.controllers.js';
import verifyAuth from '../middleweres/post.middleweres.js';
import upload from '../config/multer.js';

const router = express.Router();

// Static রুটগুলো আগে (/:id এর আগে)
router.get('/', getAllPost);
router.get('/upcoming', getUpcomingPosts);
router.get('/my-posts', verifyAuth, getMyPosts);

// Create
router.post('/create', verifyAuth, upload.single('image'), createPost);

// Join / Leave / Status
router.get('/:postId/join-status', verifyAuth, checkJoinStatus);
router.post('/:postId/join', verifyAuth, joinEvent);
router.delete('/:postId/leave', verifyAuth, leveEvent);

// Single, Update, Delete (/:id সবার শেষে)
router.get('/:id', getPostById);
router.put('/:id', verifyAuth, upload.single('image'), updatePost);
router.delete('/:id', verifyAuth, deletePost);

export default router;