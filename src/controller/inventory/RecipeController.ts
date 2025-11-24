import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { RecipeReq } from "../../core/request/inventory/RecipeReq";
import { RecipeModel } from "../../models/inventory/RecipeModel";
import { BaseControler } from "../../core/halper/BaseControler";

const status = new BaseControler()


export class  RecipeController {
// Request<Params, ResBody, ReqBody, Query>
// Jadi untuk kasus kamu:

// Params → { id: string }

// ResBody → {} (atau any)

// ReqBody → RoleReq

// Query → {}

    static async creted(
        req: Request<{}, {}, RecipeReq>,
        res: Response
    ) {
        const body = req.body

        try{
            const data: Prisma.RecipeCreateInput = {
                product : { connect : {id : body.productId}},
                productVariant : {connect: {id : body.variantId}},
                ingredient : {connect : {id : body.ingredientId}}, 
                quantity_used : new Prisma.Decimal(body.quantity_used)
            }
            const result = await RecipeModel.create(data)
            return status.created(res, result, "Data berhasil di tambahkan")
        }catch(error){      
            return status.error(res, error, "Gagal menambahkan data")    
        }
    } 
    
    static async get(
        req: Request<{}, {}, RecipeReq>,
        res: Response
    ) {
        try{
            const data = await RecipeModel.findAll()
            return status.success(res, data, "Berhasil menampilkan data")
        }catch(error){
            return status.error(res, error, "Gagal menampilkan data") 
        }
    }

    static async update(
        req: Request<{id : string}, {}, RecipeReq>,
        res: Response,
    ){
        const id = req.params.id
        const body = req.body

        try {
                const data: Prisma.RecipeCreateInput = {
                product : { connect : {id : body.ingredientId}},
                productVariant : {connect: {id : body.variantId}},
                ingredient : {connect : {id : body.ingredientId}}, 
                quantity_used : new Prisma.Decimal(body.quantity_used)
            }
            const result = await RecipeModel.update(id, data)
            return status.success(res, result, "data berhasil di update")
        }catch(error){
            return status.error(res, error, "Gagal mengupdate data") 
        }
    }

    static async delete(
        req: Request<{id: string}, {}, RecipeReq>,
        res: Response,
    ){
        try{
            const id = req.params.id
            const data = await RecipeModel.delete(id)
            return status.success(res, data, "Data berhasil di hapus")
        }catch(error){
            return status.error(res, error, "Gagal mendelete data") 
        }
    }
}