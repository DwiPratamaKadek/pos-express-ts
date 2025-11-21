import  express  from "express"
import dotenv from "dotenv"
import roleRoute from "./routes/masterdata/RoleRoute"
import userRoute from "./routes/auth/UserRoute"
import customerRoute from "./routes/masterdata/CustomerRoute"
import categoryRoute from "./routes/masterdata/CategoryRoute"
import discountRoute from "./routes/masterdata/DiscountRoute"

dotenv.config()

const app = express()
const path = "/api/v1"

app.use(express.json());
app.use(`${path}/roles`,roleRoute)
app.use(`${path}/user`,userRoute)
app.use(`${path}/customer`,customerRoute)
app.use(`${path}/categories`,categoryRoute)
app.use(`${path}/discount`,discountRoute)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Express Runing in http://localhost:${PORT}`)
})