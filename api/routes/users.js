import express from 'express'
import { getAUser, getUsers, updateUser } from '../controllers/users.js'

const router = express.Router()
router.get('/user',getUsers)
router.get('/user/:id',getAUser)
router.put('/user/:id',updateUser)

export default router