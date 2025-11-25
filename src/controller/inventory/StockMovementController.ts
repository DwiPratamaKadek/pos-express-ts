import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { StockMovementReq } from "../../core/request/inventory/StockMovemontReq";
import { StockMovementModel } from "../../models/inventory/StockMovementModel";
import { BaseControler } from "../../core/halper/BaseControler";

const status = new BaseControler()


export class  StockMovementController {
// Request<Params, ResBody, ReqBody, Query>
// Jadi untuk kasus kamu:

// Params → { id: string }

// ResBody → {} (atau any)

// ReqBody → RoleReq

// Query → {}

    static async creted(
        req: Request<{}, {}, StockMovementReq>,
        res: Response
    ) {
        const body = req.body

        try{
            const data: Prisma.StockMovementCreateInput = {
                inventoryStock : {connect : {id : body.inventoryStockId}},
                user : {connect : {id : body.createdBy}},
                change : new Prisma.Decimal(body.change),
                reason : new Prisma.Decimal(body.reason), 
                note : body.note
            }
            const result = await StockMovementModel.create(data)
            return status.created(res, result, "Data berhasil di tambahkan")
        }catch(error){      
            return status.error(res, error, "Gagal menambahkan data")    
        }
    } 
    
    static async get(
        req: Request<{}, {}, StockMovementReq>,
        res: Response
    ) {
        try{
            const data = await StockMovementModel.findAll()
            return status.success(res, data, "Berhasil menampilkan data")
        }catch(error){
            return status.error(res, error, "Gagal menampilkan data") 
        }
    }

    static async update(
        req: Request<{id : string}, {}, StockMovementReq>,
        res: Response,
    ){
        const id = req.params.id
        const body = req.body

        try {
            
            const data: Prisma.StockMovementCreateInput = {
                inventoryStock : {connect : {id : body.inventoryStockId}},
                user : {connect : {id : body.createdBy}},
                change : new Prisma.Decimal(body.change),
                reason : new Prisma.Decimal(body.reason), 
                note : body.note
            }
            const result = await StockMovementModel.update(id, data)
            return status.success(res, result, "data berhasil di update")
        }catch(error){
            return status.error(res, error, "Gagal mengupdate data") 
        }
    }

    static async delete(
        req: Request<{id: string}, {}, StockMovementReq>,
        res: Response,
    ){
        try{
            const id = req.params.id
            const data = await StockMovementModel.delete(id)
            return status.success(res, data, "Data berhasil di hapus")
        }catch(error){
            return status.error(res, error, "Gagal mendelete data") 
        }
    }
}