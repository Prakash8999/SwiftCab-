import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

const PORT = process.env.PORT

app.use(cors("*" as any))
app.use(express.json()); // or app.use(express.json());

import User from './src/Users/Route/UserRoutes'
import Ride from './src/Ride/Route/ride'
import Driver from './src/Ride/Route/driver'

import PayIntent from './src/Stripe/Route/strip-pamnt-prcs'


app.get('/' , (req,res)=>{

	res.send({
		error:false,
		status: "working"
	})
})

app.use('/api/user',User)
app.use('/api/v1/ride',Ride)
app.use('/api/v1/driver',Driver)


//payment process
app.use('/api/v1/stripe', PayIntent)
app.listen(PORT, () =>{
	console.log(`Server is running on port ${PORT}`);
})

