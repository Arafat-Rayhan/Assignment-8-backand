import express from 'express'
import {createPost,upDatePost,deletePost} from '../controllers/post.controllers.js' 

const router=express.Router()


router.post('/post',createPost)
router.patch('/post/:id',upDatePost)
router.delete('/post/:id',deletePost)

export default router;