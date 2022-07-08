import { Router } from "express";

import createCard from "../controllers/cardController.js";
import verifyToken from "../middlewares/verifyToken.js";
const cardRouter = Router()

cardRouter.post("/card/creation",verifyToken ,createCard)


export default cardRouter