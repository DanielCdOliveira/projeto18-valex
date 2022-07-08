import "express-async-errors";
import express,{json} from "express";

import cors from "cors"


import router from "./src/routers/index.js";
import errorHandler from "./src/middlewares/errorHandler.js";

const app = express()
app.use(cors())
app.use(json())
app.use(router)
app.use(errorHandler)





const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log(`Running on PORT ${port}`)
})