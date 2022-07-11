import { Request, Response } from "express";

import *  as cardServices from "../services/cardServices.js"
import * as cardRepository from "../repositories/cardRepository.js"

export async function createCard(req: Request, res: Response) {
    const { id } = res.locals.company
    const { emplyeeId, type } = req.body
    const employee = await cardServices.checkCard(emplyeeId, type)
    const createdCard = await cardServices.createCard(employee, type)
    await cardRepository.insert(createdCard)

    res.status(201).send("Card created")
}

export async function activateCard(req: Request, res: Response) {
    const cardInfo = req.body
    await cardServices.checkCardActivation(cardInfo)
    await cardServices.activateCard(cardInfo)
    res.sendStatus(200)


}