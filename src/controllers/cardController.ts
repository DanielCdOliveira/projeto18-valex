import { Request, Response } from "express";

import *  as cardServices from "../services/cardServices.js"
import * as cardRepository from "../repositories/cardRepository.js"

export async function createCard(req: Request, res: Response) {
    const { employeeId, type } = req.body
    const employee = await cardServices.checkCard(employeeId, type)
    const createdCard = await cardServices.createCard(employee, type)
    await cardRepository.insert(createdCard)
    res.status(201).send("Card created")
}

export async function activateCard(req: Request, res: Response) {
    const cardInfo = req.body
    const activated = false
    const cardDb = await cardServices.validCard(cardInfo)
    await cardServices.checkCardActivated(cardDb,activated)
    await cardServices.checkCardSecurityCode(cardInfo, cardDb)
    await cardServices.activateCard(cardInfo)
    res.sendStatus(200)
}
export async function blockCard(req: Request, res: Response) {
    const cardInfo = req.body
    const blockedCard : boolean = true
    const cardDb = await cardServices.validCard(cardInfo)
    await cardServices.verifyPassword(cardInfo, cardDb)
    await cardServices.checkBlocked(cardDb, blockedCard)
    await cardServices.changeBlocked(cardInfo, blockedCard)
    res.sendStatus(200)
}
export async function unlockCard(req: Request, res: Response) {
    const cardInfo = req.body
    const blockedCard : boolean= false
    const cardDb = await cardServices.validCard(cardInfo)
    await cardServices.verifyPassword(cardInfo, cardDb)
    await cardServices.checkBlocked(cardDb, blockedCard)
    await cardServices.changeBlocked(cardInfo, blockedCard)
    res.sendStatus(200)
}
export async function rechargeCard(req: Request, res:Response) {
    const cardInfo =  req.body   
    const activated = true
    const cardDb = await cardServices.validCard(cardInfo)
    await cardServices.checkCardActivated(cardDb, activated)
    await cardServices.insertRecharge(cardInfo)
    res.sendStatus(201)
}