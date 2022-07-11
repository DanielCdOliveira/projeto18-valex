import { NextFunction ,Response, Request} from "express";

import  tokenValidation  from "../services/companyService.js";

export default async function verifyToken(req :Request, res :Response, next: NextFunction){
    const apiKey = req.headers['x-api-key']
    const company = await tokenValidation(apiKey)
    res.locals.company = company
    next()
}
