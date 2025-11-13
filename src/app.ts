import  express  from "express"
import { Response, Request } from "express"
import dotenv from "dotenv"
import { PrismaClient } from "@prisma/client"

const app = express()
app.use(express.json());

dotenv.config()

const PORT = process.env.PORT
    
app.get("/hello", ( req: Request, res: Response ) => {
    res.status(200).json({
        message : "Helo World "
    })
})

app.listen(PORT, () => {
    console.log("Express Runing in port: " + PORT)
})