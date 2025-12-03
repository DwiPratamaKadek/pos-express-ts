import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { InventoryStockReq } from "../../core/request/inventory/InventoryStockReq";
import {  InventoryStockModel } from "../../models/inventory/InventoryStockModel";
import { BaseControler } from "../../core/halper/BaseControler";

const status = new BaseControler()


export class  InventoryStockController {
// Request<Params, ResBody, ReqBody, Query>
// Jadi untuk kasus kamu:

// Params → { id: string }

// ResBody → {} (atau any)

// ReqBody → RoleReq

// Query → {}

    static async creted(
        req: Request<{}, {}, InventoryStockReq>,
        res: Response
    ) {
        const body = req.body

        try{
            const data: Prisma.InventoryStockCreateInput = {
                ingredient : {connect :  { id: body.ingredientId } },
                quantity : new Prisma.Decimal(body.quantity), 
                location : body.location, 
            }
            const result = await InventoryStockModel.create(data)
            return status.created(res, result, "Data berhasil di tambahkan")
        }catch(error){      
            return status.error(res, error, "Gagal menambahkan data")    
        }
    } 
    
    static async get(
        req: Request<{}, {}, InventoryStockReq>,
        res: Response
    ) {
        try{
            const data = await InventoryStockModel.findAll()
            return status.success(res, data, "Berhasil menampilkan data")
        }catch(error){
            return status.error(res, error, "Gagal menampilkan data") 
        }
    }

    static async update(
        req: Request<{id : string}, {}, InventoryStockReq>,
        res: Response,
    ){
        const id = req.params.id
        const body = req.body

        try {
            const data: Prisma.InventoryStockCreateInput = {
                ingredient : {connect :  { id: body.ingredientId } },
                quantity : new Prisma.Decimal(body.quantity),
                location : body.location, 
            }
            const result = await InventoryStockModel.update(id, data)
            return status.success(res, result, "data berhasil di update")
        }catch(error){
            return status.error(res, error, "Gagal mengupdate data") 
        }
    }

    static async delete(
        req: Request<{id: string}, {}, InventoryStockReq>,
        res: Response,
    ){
        try{
            const id = req.params.id
            const data = await InventoryStockModel.delete(id)
            return status.success(res, data, "Data berhasil di hapus")
        }catch(error){
            return status.error(res, error, "Gagal mendelete data") 
        }
    }
}