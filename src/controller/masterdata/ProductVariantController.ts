import { Request, Response } from "express";

import { ProductVariantReq } from "../../core/request/masterdata/ProductVariantReq";
import { ProductVarianModel } from "../../models/masterdata/ProductVariantModel";
import { BaseControler } from "../../core/halper/BaseControler";
import { Prisma } from "@prisma/client";

const status = new BaseControler()


export class  ProductVariantController {
// Request<Params, ResBody, ReqBody, Query>
// Jadi untuk kasus kamu:

// Params → { id: string }

// ResBody → {} (atau any)

// ReqBody → RoleReq

// Query → {}

    static async creted(
        req: Request<{}, {}, ProductVariantReq>,
        res: Response
    ) {
        const body = req.body
        try{
            const data : Prisma.ProductVariantCreateInput = {
                name : body.name,
                price_modifier : new Prisma.Decimal(body.price_modifier),
                sku : body.sku,
                product : { connect: {id : body.productId} }
            }
            const result = await ProductVarianModel.create(data)
            return status.created(res, result, "Data berhasil di tambahkan")
        }catch(error){ 
            return status.error(res, error, "Gagal menambahkan data")    
        }
    } 
    
    static async get(
        req: Request<{}, {}, ProductVariantReq>,
        res: Response
    ) {
        try{
            const data = await ProductVarianModel.findAll()
            return status.success(res, data, "Berhasil menampilkan data")
        }catch(error){
            return status.error(res, error, "Gagal menambahkan data") 
        }
    }

    static async update(
        req: Request<{id : string}, {}, ProductVariantReq>,
        res: Response,
    ){
        const body = req.body
        try {
            const data : Prisma.ProductVariantCreateInput = {
                name : body.name,
                price_modifier : new Prisma.Decimal(body.price_modifier),
                sku : body.sku,
                product : { connect: {id : body.productId} }
            }   
            const id = req.params.id
            const result = await ProductVarianModel.update(id, data)
            return status.success(res, result, "data berhasil di update")
        }catch(error){
            return status.error(res, error, "Gagal menambahkan data") 
        }
    }

    static async delete(
        req: Request<{id: string}, {}, ProductVariantReq>,
        res: Response,
    ){
        try{
            const id = req.params.id
            const data = await ProductVarianModel.delete(id)
            return status.success(res, data, "Data berhasil di hapus")
        }catch(error){
            return status.error(res, error, "Gagal menambahkan data") 
        }
    }
}