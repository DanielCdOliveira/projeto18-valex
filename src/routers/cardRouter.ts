import { Router } from "express";

import * as cardController from "../controllers/cardController.js";
import verifyToken from "../middlewares/verifyToken.js";
import schemaVerifier from "../middlewares/schemaVerifier.js";
import {activateSchema} from  "../schemas/joiSchemas.js"
const cardRouter = Router()

cardRouter.post("/card/creation",verifyToken ,cardController.createCard)
cardRouter.post("/card/activate",schemaVerifier(activateSchema) ,cardController.activateCard)


export default cardRouter