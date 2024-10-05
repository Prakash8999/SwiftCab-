import express from 'express'
import { insertUser } from '../Controller/UserController'
const router = express.Router()

router.post('/insert', insertUser)

export default router