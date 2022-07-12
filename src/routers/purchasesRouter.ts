import Router from "express"

import purchase from "../controllers/purchaseController.js";
import schemaVerifier from "../middlewares/schemaVerifier.js";
import {purchaseSchema} from  "../schemas/joiSchemas.js"

const purchasesRouter = Router()

purchasesRouter.post("/card/purchase", schemaVerifier(purchaseSchema),purchase)

export default purchasesRouter