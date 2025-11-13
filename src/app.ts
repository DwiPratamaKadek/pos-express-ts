import  express  from "express"
import dotenv from "dotenv"
import roleRoute from "./routes/masterdata/RoleRoute"


dotenv.config()

const app = express()
const path = "/api/v1"

app.use(express.json());
app.use(`${path}/roles`,roleRoute)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Express Runing in http://localhost:${PORT}`)
})