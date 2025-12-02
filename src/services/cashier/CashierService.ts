import { OrderModel } from "../../models/cashier/OrderModel";
import { GenerateOrderNumber } from "../../core/halper/GenerateOrderNumber";
import { Prisma } from "@prisma/client";
import { CashierReq } from "../../core/request/cashier/CashierReq";
import { ProductModel } from "../../models/masterdata/ProductModel";
import { ProductVarianModel } from "../../models/masterdata/ProductVariantModel";
import { OrderItemModel } from "../../models/cashier/OrderItemModel";
import { RecipeModel } from "../../models/inventory/RecipeModel";
import { InventoryStockModel } from "../../models/inventory/InventoryStockModel";
import { StockMovementModel } from "../../models/inventory/StockMovementModel";


export class CashierService {
    static async createOrder(body : CashierReq) {
        const orderNumber = await GenerateOrderNumber("A")
        // baut order kosongan 
        const pesan  = await OrderModel.create({
            order_number : orderNumber, 
            status : "pending", 
            subtotal : new Prisma.Decimal(0), 
            discount_total : new Prisma.Decimal(0),
            tax_total : new Prisma.Decimal(0),
            total : new Prisma.Decimal(0),
            placed_at : new Date(),
            user : {connect : {id : body.userId}},
            customer : {connect : {id : body.customerId}}
        })
        let subtotal = new Prisma.Decimal(0) 
        // Proses semua item yang ada di req
        for( const item of body.items){
            // mencari product pada table product id 
            const product = await ProductModel.findByPk(item.productId)
            if(!product)  throw new Error( `Product tidak di temukan ${item.productId}`)
                let unitPrice : Prisma.Decimal
            // cek product variant
            if(product.has_variant){
                // if(!item.variantId) throw new Error("Variant has required")
                const productVariant = await ProductVarianModel.findByPk(item.variantId) // jangan lupa await bang kocak
                if(!productVariant) throw new Error(`Variant not found ${item.variantId}`)
                unitPrice = new Prisma.Decimal(product.price).add(new Prisma.Decimal(productVariant.price_modifier))        
            }else {
                unitPrice = new Prisma.Decimal(product.price)
            }
            const qty = new Prisma.Decimal(item.quantity)
            const lineTotal = unitPrice.mul(qty)

            const variantId = item.variantId && item.variantId.trim() !== "" ? item.variantId : null

            //buat order item 
            await OrderItemModel.create({
                orderId : pesan.id,
                productId : item.productId, 
                variantId : variantId, 
                quantity : item.quantity, 
                unit_price : unitPrice, 
                line_total : lineTotal
            })
            // console.log("FINAL VARIANT:", item.variantId, typeof item.variantId);
            subtotal = subtotal.plus(lineTotal)

            // Mengurangi stock berdasarkan recipe dimana dia akan mengambil ingredient dan akan mengurangi Inventory stock berdasarkan ingredientnya.
            const recipes = await RecipeModel.findProduct(item.productId, item.variantId)
            if(recipes.length == 0 ){
                throw new Error (`Product ini ${item.productId} belum memiliki recipe`)
            }
            console.log("RECEPE :", recipes)

            for(const recipe of recipes ){
                const used = new Prisma.Decimal(recipe.quantity_used).mul(qty)
                const stock = await InventoryStockModel.findIngredient(recipe.ingredientId)
                // cek apakah bahan baku masih ada atau tidak
                if(!stock) throw new Error("Stock not found!")

                // cek jika stock kosong 
                if(stock.quantity.lte(0) ) 
                    throw new Error ("Stock tidak ada")

                // cek apakah jumlah stok lebih banyak dari yang di pakai atau tidak
                if(stock.quantity.lt(used)) 
                    throw new Error (`Bahan baku kurang ${recipe.ingredientId}`)
                
                //mengurangi quantity pada inventory stock
                await InventoryStockModel.update(stock.id, {quantity : stock.quantity.minus(used)})
                // kemudian buat stock movement
                await StockMovementModel.create({
                    inventoryStock : { connect : {id : stock.id} }, 
                    user : { connect : {id : body.userId} }, 
                    change : used.neg(), // ini membuat nilai menjadi negatif cocok untuk tanda jika berkurang, anjay
                    reason : "sale", // ini kayaknya buat defaul aja deh, kalo ada kadaluarsa dll kan pasti melakukan pencatatan. 
                    note : `used ini order ${pesan.order_number}`
                })
                console.log("STOCK RAW:", stock.quantity, typeof stock.quantity);
                console.log("USED:", used.toString());
                console.log("COMPARE:", new Prisma.Decimal(stock.quantity).lt(used));

            }
        }
        
        // update order terbaru 
        const finalOrder = await OrderModel.update(
            pesan.id,
            {
                subtotal, 
                total : subtotal
            }
        )
        return finalOrder               
    }

    


}