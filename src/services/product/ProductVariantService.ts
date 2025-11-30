import { ProductVariantReq } from "../../core/request/masterdata/ProductVariantReq";
import { ProductModel } from "../../models/masterdata/ProductModel";
import { ProductVarianModel } from "../../models/masterdata/ProductVariantModel";
import { Prisma } from "@prisma/client";

export class ProductVariantService {
    static async createVariant (req : ProductVariantReq) {
        const haveVariant =  await ProductModel.hasVariant(req.productId)

        if(!haveVariant) throw Error (`Product ini tidak punya variant ${req.productId}`)
        await ProductVarianModel.create({
            name : req.name,
            price_modifier : new Prisma.Decimal(req.price_modifier),
            sku : req.sku,
            product : { connect: {id : req.productId} }
        })
    }
}