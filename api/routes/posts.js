import express from 'express'
import { createPost, deletePost, getAPost, getPosts, updatePost } from '../controllers/posts.js'

const router = express.Router()

router.get('/blogs' , getPosts)
router.get('/blogs/:id',getAPost)
router.post('/blogs',createPost)
router.put('/blogs/:id',updatePost)
router.delete('/blogs/:id',deletePost)

export default router