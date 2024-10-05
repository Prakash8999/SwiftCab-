import express from 'express'
import { createRide, recentRides } from '../Controller/CreateRideCtrl'
const router = express.Router()


router.post('/insert',createRide)
router.get('/read',recentRides)


export default router;