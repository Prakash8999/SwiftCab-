import { Request, Response } from "express"
import { Stripe } from 'stripe'
import { errorHandler, successHandler } from "../../common/middleware/responseHandler";

export const PayApi = async (req: Request, res: Response) => {
	try {
		const { payment_method_id, payment_intent_id, customer_id, client_secret } = req.body;
		if (!payment_method_id || !payment_intent_id || !customer_id || !client_secret) {
			return errorHandler(res, `Please Provide valid detail, ${!payment_method_id ? 'payment_method_id is missing' : !payment_intent_id ? 'payment_intent_id is missing' : !customer_id ? 'customer_id is missing' : 'client_secret is missing'}`, 400, [])
		}
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
		const paymentMethod = await stripe.paymentMethods.attach(payment_method_id, {
			customer: customer_id
		})
		const result = await stripe.paymentIntents.confirm(payment_intent_id, {
			payment_method: paymentMethod.id
		})

		return successHandler(res, "Payment confirmed successfully", result, 201, [])
	} catch (error: any) {
		console.log(error);
		
		return errorHandler(res, "Something went wrong", 500, error.message)
	}

}