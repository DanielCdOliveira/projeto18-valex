import { Request, Response } from "express";

import *  as cardServices from "../services/cardServices.js"
import * as cardRepository from "../repositories/cardRepository.js"

export default async function createCard (req :Request, res :Response){
const {id} = res.locals.company
const{emplyeeId, type} = req.body
const employee = await cardServices.checkCard(emplyeeId,type)
console.log(employee);

const createdCard = await cardServices.createCard(employee, type)
console.log(createCard);
await cardRepository.insert(createdCard)







res.sendStatus(201)

}