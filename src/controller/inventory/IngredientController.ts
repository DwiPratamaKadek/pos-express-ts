import { Request, Response } from "express";
import { Prisma } from "@prisma/client" ;

import { IngredientReq } from "../../core/request/inventory/IngredientReq";
import { IngredientModel } from "../../models/inventory/IngredientModel";
import { BaseControler } from "../../core/halper/BaseControler";

const status = new BaseControler()


export class  IngredientController {
// Request<Params, ResBody, ReqBody, Query>
// Jadi untuk kasus kamu:

// Params → { id: string }

// ResBody → {} (atau any)

// ReqBody → RoleReq

// Query → {}

    static async creted(
        req: Request<{}, {}, IngredientReq>,
        res: Response
    ) {
        const body = req.body

        try{
            const data: Prisma.IngredientCreateInput = {
               name : body.name,
               cost_price : new Prisma.Decimal(body.cost_price),
               unit : body.unit
            }
            const result = await IngredientModel.create(data)
            return status.created(res, result, "Data berhasil di tambahkan")
        }catch(error){      
            return status.error(res, error, "Gagal menambahkan data")    
        }
    } 
    
    static async get(
        req: Request<{}, {}, IngredientReq>,
        res: Response
    ) {
        try{
            const data = await IngredientModel.findAll()
            return status.success(res, data, "Berhasil menampilkan data")
        }catch(error){
            return status.error(res, error, "Gagal menampilkan data") 
        }
    }

    static async update(
        req: Request<{id : string}, {}, IngredientReq>,
        res: Response,
    ){
        const id = req.params.id
        const body = req.body

        try {
            const data: Prisma.IngredientCreateInput = {
               name : body.name,
               cost_price : new Prisma.Decimal(body.cost_price),
               unit : body.name
            }
            const result = await IngredientModel.update(id, data)
            return status.success(res, result, "data berhasil di update")
        }catch(error){
            return status.error(res, error, "Gagal mengupdate data") 
        }
    }

    static async delete(
        req: Request<{id: string}, {}, IngredientReq>,
        res: Response,
    ){
        try{
            const id = req.params.id
            const data = await IngredientModel.delete(id)
            return status.success(res, data, "Data berhasil di hapus")
        }catch(error){
            return status.error(res, error, "Gagal mendelete data") 
        }
    }
}