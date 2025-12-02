import { RecipeReq } from "../../core/request/inventory/RecipeReq";
import { RecipeModel } from "../../models/inventory/RecipeModel";
import { ProductModel } from "../../models/masterdata/ProductModel";
import { Prisma } from "@prisma/client";


export class RecipeService {
    static async createRecipe (body : RecipeReq){
        const product = await ProductModel.hasVariant(body.productId)

        if(!product && body.variantId) 
            throw new Error ("Product ini tidak memiliki variant")
            
        if(product && (!body.variantId || body.variantId.trim() === "" )) 
            throw new Error ("Product ini memiliki variant, variant harus di isi")

        await RecipeModel.create({
            product : { connect : {id : body.productId}},
            ...(body.variantId && body.variantId.trim() !== ""  ? {productVariant: {connect: {id : body.variantId}}} : {}),
            ingredient : {connect : {id : body.ingredientId}}, 
            quantity_used : new Prisma.Decimal(body.quantity_used)
        })
        

        console.log("FINAL VARIANT:", body.variantId, typeof body.variantId)
    }

}