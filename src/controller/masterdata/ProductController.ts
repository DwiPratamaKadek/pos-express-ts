import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { ProductReq } from "../../core/request/masterdata/ProductReq";
import { ProductModel } from "../../models/masterdata/ProductModel";
import { BaseControler } from "../../core/halper/BaseControler";

const status = new BaseControler()


export class  ProductController {
// Request<Params, ResBody, ReqBody, Query>
// Jadi untuk kasus kamu:

// Params → { id: string }

// ResBody → {} (atau any)

// ReqBody → RoleReq

// Query → {}

    static async creted(
        req: Request<{}, {}, ProductReq>,
        res: Response
    ) {
        const body = req.body
        try{
            const data: Prisma.ProductCreateInput = {
                
                sku : body.sku,
                name : body.name, 
                category : {connect : {id : body.categoryId}}, 
                price : new Prisma.Decimal(body.price), 
                cost_price : body.cost_price, 
                has_variant : body.has_variant, 
                track_stock : body.track_stock, 
            }
            const result = await ProductModel.create(data)
            return status.created(res, result, "Data berhasil di tambahkan")
        }catch(error){      
            return status.error(res, error, "Gagal menambahkan data")    
        }
    } 
    
    static async get(
        req: Request<{}, {}, ProductReq>,
        res: Response
    ) {
        try{
            const data = await ProductModel.findAll()
            return status.success(res, data, "Berhasil menampilkan data")
        }catch(error){
            return status.error(res, error, "Gagal menampilkan data") 
        }
    }

    static async update(
        req: Request<{id : string}, {}, ProductReq>,
        res: Response,
    ){
        const id = req.params.id
        const body = req.body

        try {
            const data: Prisma.ProductCreateInput = {
                
                sku : body.sku,
                name : body.name, 
                category : {connect : {id : body.categoryId}}, 
                price : new Prisma.Decimal(body.price), 
                cost_price : body.cost_price, 
                has_variant : body.has_variant, 
                track_stock : body.track_stock, 
            }
            
            const result = await ProductModel.update(id, data)
            return status.success(res, result, "data berhasil di update")
        }catch(error){
            return status.error(res, error, "Gagal mengupdate data") 
        }
    }

    static async delete(
        req: Request<{id: string}, {}, ProductReq>,
        res: Response,
    ){
        try{
            const id = req.params.id
            const data = await ProductModel.delete(id)
            return status.success(res, data, "Data berhasil di hapus")
        }catch(error){
            return status.error(res, error, "Gagal mendelete data") 
        }
    }
}