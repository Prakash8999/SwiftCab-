import { error , success} from "./responseStructure";

export const successHandler = ( res:any , message:string, results:any, statusCode:number, meta:any) => {
	return res.status(statusCode).json(success(message, results, statusCode, meta));
}

export const errorHandler = ( res:any , message:string,  statusCode:number, err:any) => {
	return res.status(statusCode).json(error(message, statusCode,err));
}

