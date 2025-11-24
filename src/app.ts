import  express  from "express"
import dotenv from "dotenv"
// ---- Import Routes ----
import userRoute from "./routes/auth/UserRoute"

import roleRoute from "./routes/masterdata/RoleRoute"
import customerRoute from "./routes/masterdata/CustomerRoute"
import categoryRoute from "./routes/masterdata/CategoryRoute"
import discountRoute from "./routes/masterdata/DiscountRoute"
import productRoute from "./routes/masterdata/ProductRoute"
import productVariantModel from "./routes/masterdata/ProductVariantRoute"

import cashierRoute from "./routes/cashier/CashireRoutes"
// ---- End Import Routes ----
dotenv.config()

const app = express()
const path = "/api/v1"

app.use(express.json());
app.use(`${path}/roles`,roleRoute)
app.use(`${path}/user`,userRoute)
app.use(`${path}/customer`,customerRoute)
app.use(`${path}/categories`,categoryRoute)
app.use(`${path}/discount`,discountRoute)
app.use(`${path}/cashier`,cashierRoute)
app.use(`${path}/product`,productRoute)
app.use(`${path}/variant`,productVariantModel)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Express Runing in http://localhost:${PORT}`)
})