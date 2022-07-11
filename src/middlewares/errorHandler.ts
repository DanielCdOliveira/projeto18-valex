import { NextFunction, Request, Response } from "express";

export default async function errorHandler(error: any, req: Request, res: Response, next: NextFunction) {
if(error.type === "unauthorized") return res.status(401).send(error.message)
res.sendStatus(500)
next()
}