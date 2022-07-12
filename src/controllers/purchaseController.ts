import { Request, Response } from "express";

import *  as cardServices from "../services/cardServices.js"
import * as businessServices from "../services/businessServices.js"
import * as utils from "../utils/utils.js"
import * as purchaseServices from "../services/purchaseServices.js"

export default async function purchase(req:Request, res :Response) {
    const cardInfo = req.body
    const activated  :boolean= true
    const blockedCard : boolean = true
    const cardDb = await cardServices.validCard(cardInfo)
    await cardServices.verifyPassword(cardInfo, cardDb)
    await cardServices.checkCardActivated(cardDb,activated)
    await cardServices.checkBlocked(cardDb, blockedCard)
    await businessServices.checkBusiness(cardInfo.businessId, cardDb)
    const {balance} = await utils.getHistory(cardInfo.cardId)
    await purchaseServices.checkPurchase(balance, cardInfo.amount)
    await purchaseServices.insertPayment(cardInfo)
    res.sendStatus(201)
}