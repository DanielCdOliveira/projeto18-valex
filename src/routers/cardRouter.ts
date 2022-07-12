import { Router } from "express";

import * as cardController from "../controllers/cardController.js";
import verifyToken from "../middlewares/verifyToken.js";
import schemaVerifier from "../middlewares/schemaVerifier.js";
import {activateSchema, rechargeSchema} from  "../schemas/joiSchemas.js"
const cardRouter = Router()

cardRouter.post("/card/creation",verifyToken ,cardController.createCard)
cardRouter.post("/card/activate",schemaVerifier(activateSchema) ,cardController.activateCard)
cardRouter.put("/card/block" ,cardController.blockCard)
cardRouter.put("/card/unlock" ,cardController.unlockCard)
cardRouter.post("/card/recharge",verifyToken,schemaVerifier(rechargeSchema),cardController.rechargeCard)


export default cardRouter