import express from 'express'
import { CreateIntent } from '../Controller/CreatePayment'
import { PayApi } from '../Controller/PayCtrl'


const router = express.Router()

router.post('/create-intent',CreateIntent)
router.post('/confirm-pay',PayApi)


export default router;