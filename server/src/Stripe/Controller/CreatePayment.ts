import { Request, Response } from "express"
import { errorHandler, successHandler } from "../../common/middleware/responseHandler";
import { Stripe } from "stripe";

export const CreateIntent = async (req: Request, res: Response) => {
	try {
		const { name, email, amount } = req.body;
		if (!name || !email || !amount) {
			return errorHandler(res, `Please Provide valid detail, ${!name ? 'Name is missing' : !email ? 'Email is missing' : 'Amount is missing'}`, 400, [])
		}


		let customer;
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
		const doesCustomerExist = await stripe.customers.list({ email })

		if (doesCustomerExist.data.length > 0) {
			customer = doesCustomerExist.data[0]
		}
		else {
			const newCustomer = await stripe.customers.create({
				name,
				email
			})

			customer = newCustomer;
		}
		const ephemeralKey = await stripe.ephemeralKeys.create(
			{
				customer: customer.id,

			},
			{
				apiVersion: "2020-08-27"
			}
		)
		const paymentIntent = await stripe.paymentIntents.create(
			{
				amount:  parseInt(amount) * 100,
				currency: 'usd',
				customer: customer.id,
				automatic_payment_methods:{
					enabled:true,
					allow_redirects:'never'
				}

			
			}
		)
	const paymentResult =	{
			paymentIntent: paymentIntent,
			ephemeralKey: ephemeralKey,
			customer: customer.id,
		  }
	return successHandler(res,"paymentIntent successfully",paymentResult,201,[])
} catch (error: any) {
	console.log(error);
		return errorHandler(res,"Sonething went wrong",500,error.message)

	}


}