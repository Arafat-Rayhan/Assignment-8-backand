import express from 'express'
import {createPost,upDatePost,deletePost,getMyPosts,getAllPost} from '../controllers/post.controllers.js' 
import verifyAuth from '../middleweres/post.middleweres.js'
import upload from '../config/multer.js'

const router=express.Router()


// with verify and upload system
router.post('/create',verifyAuth,upload.single('image'),createPost)


router.get('/',getAllPost)
router.get('/my-post',verifyAuth,getMyPosts)
router.patch('/:id',upDatePost)
router.delete('/:id',deletePost)

export default router;