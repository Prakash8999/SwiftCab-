import { Request, Response } from "express"
import { ReqBody } from "../../common/helper/types/bodyType"
import Users from "../Model/UserModel"
import { errorHandler } from "../../common/middleware/responseHandler"


export const insertUser = async (req: Request, res: Response) => {
	try {
		const { name, email, clerkId } = req.body
		if (!name || !email || !clerkId) {
			return res.status(400).json({
				message: 'Detail Cannot be Empty'
			})
		}
		console.log(clerkId);
		

		const insertedResult = await Users.create({
			name: name,
			email: email,
			clerkId: clerkId,
			createdOn: new Date()
		})
		return res.status(201).json({
			success: true, message: "User Created Succfully", insertedResult
		})
	} catch (error: any) {
		return errorHandler(res,"Something went wrong",500,error.errors[0].message)
	}
}