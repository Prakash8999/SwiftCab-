import express from 'express'
import { createDriver, readDriver } from '../Controller/Driver';
const router = express.Router()


router.post('/insert',createDriver)
router.get('/read',readDriver)

export default router;