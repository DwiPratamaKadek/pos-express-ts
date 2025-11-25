import  express  from "express"
import dotenv from "dotenv"
// ---- Import Routes ----
import userRoute from "./routes/auth/UserRoute"

import roleRoute from "./routes/masterdata/RoleRoute"
import customerRoute from "./routes/masterdata/CustomerRoute"
import categoryRoute from "./routes/masterdata/CategoryRoute"
import discountRoute from "./routes/masterdata/DiscountRoute"
import productRoute from "./routes/masterdata/ProductRoute"
import productVariantRoute from "./routes/masterdata/ProductVariantRoute"

import cashierRoute from "./routes/cashier/CashireRoutes"

import ingredientRoute from "./routes/inventory/IngredientRoutes"
import inventoryStockRoute  from "./routes/inventory/InventoryStockRoutes"
import recipeRoute from "./routes/inventory/RecipeRoute"
import stockMovementRoute from "./routes/inventory/StockMovementRoutes"
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
app.use(`${path}/variant`,productVariantRoute)
app.use(`${path}/ingredient`,ingredientRoute)
app.use(`${path}/stock`,inventoryStockRoute)
app.use(`${path}/recipe`,recipeRoute)
app.use(`${path}/movement`,stockMovementRoute)


const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Express Runing in http://localhost:${PORT}`)
})