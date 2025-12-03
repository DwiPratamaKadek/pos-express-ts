import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { DiscountReq } from "../../core/request/masterdata/DiscountReq";
import { DiscountModel } from "../../models/masterdata/DiscountModel";
import { BaseControler } from "../../core/halper/BaseControler";
import { CategoryModel } from "../../models/masterdata/CategoryModel";

const status = new BaseControler()


export class  DiscountController {
// Request<Params, ResBody, ReqBody, Query>
// Jadi untuk kasus kamu:

// Params → { id: string }

// ResBody → {} (atau any)

// ReqBody → RoleReq

// Query → {}

    static async creted(
        req: Request<{}, {}, DiscountReq>,
        res: Response
    ) {
        const body = req.body
        const { name, code } = req.body
        const existCode = await DiscountModel.findByCode(code)
        const existName = await DiscountModel.findByName(name)

        try{

            if(existCode){
                return status.error(res, existCode, "Data sudah ada")
            }
            if(existName){
                return status.error(res, existName, "Data sudah ada")
            }
            const data: Prisma.DiscountCreateInput = {
                code: body.code,
                name: body.name,
                type : body.type, 
                value :  new Prisma.Decimal(body.value),
                applies_to : body.applies_to, 
                activate_from : new Date(body.activate_from),
                activate_to : new Date(body.activate_to), 
                min_order_value : new Prisma.Decimal(body.min_order_value), 
                usage_limit : body.usage_limit
            }
            const result = await DiscountModel.create(data)
            return status.created(res, result, "Data berhasil di tambahkan")
        }catch(error){      
            return status.error(res, error, "Gagal menambahkan data")    
        }
    } 
    
    static async get(
        req: Request<{}, {}, DiscountReq>,
        res: Response
    ) {
        try{
            const data = await DiscountModel.findAll()
            return status.success(res, data, "Berhasil menampilkan data")
        }catch(error){
            return status.error(res, error, "Gagal menampilkan data") 
        }
    }

    static async update(
        req: Request<{id : string}, {}, DiscountReq>,
        res: Response,
    ){
        const id = req.params.id
        const body = req.body

        try {

            const data: Prisma.DiscountCreateInput = {
                code: body.code,
                name: body.name,
                type : body.type, 
                value :  new Prisma.Decimal(body.value),
                applies_to : body.applies_to, 
                activate_from : new Date(body.activate_from),
                activate_to : new Date(body.activate_to), 
                min_order_value : new Prisma.Decimal(body.min_order_value), 
                usage_limit : body.usage_limit
            }
            const result = await DiscountModel.update(id, data)
            return status.success(res, result, "data berhasil di update")
        }catch(error){
            return status.error(res, error, "Gagal mengupdate data") 
        }
    }

    static async delete(
        req: Request<{id: string}, {}, DiscountReq>,
        res: Response,
    ){
        try{
            const id = req.params.id
            const data = await DiscountModel.delete(id)
            return status.success(res, data, "Data berhasil di hapus")
        }catch(error){
            return status.error(res, error, "Gagal mendelete data") 
        }
    }
}