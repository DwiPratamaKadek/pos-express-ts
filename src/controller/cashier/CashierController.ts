import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { CashierModel } from "../../models/cashier/CashierModel"
import { CashierReq } from "../../core/request/cashier/CashierReq"
import { BaseControler } from "../../core/halper/BaseControler";
import { GenerateOrderNumber } from "../../core/halper/GenerateOrderNumber";

const status = new BaseControler()



export class CashierController {
    // Request<Params, ResBody, ReqBody, Query>
    // Jadi untuk kasus kamu:
    
    // Params → { id: string }
    
    // ResBody → {} (atau any)
    
    // ReqBody → RoleReq
    
    // Query → {}
    
        static async creted(
            req: Request<{}, {}, CashierReq>,
            res: Response
        ) {
            const orderNumber = await GenerateOrderNumber("A")
            const body = req.body
            const subtotal = new Prisma.Decimal(body.subtotal)
            const tax_total = new Prisma.Decimal(body.tax_total)
            const discount_total = new Prisma.Decimal(body.discount_total)
            const total = subtotal.minus(discount_total).plus(tax_total)
            try{
                const data: Prisma.OrderCreateInput = {
                    order_number: orderNumber, 
                    user: { connect: {id : body.userId} },
                    customer: { connect: {id : body.customerId} }, 
                    status: body.status, 
                    subtotal: subtotal, 
                    discount_total: discount_total, 
                    tax_total: tax_total,
                    total: total,
                    placed_at: new Date,
                }
                const result = await CashierModel.create(data)
                return status.created(res, result, "Data berhasil di tambahkan")
            }catch(error){ 
                return status.error(res, error, "Gagal menambahkan data")    
            }
        } 
        
        static async get(
            req: Request<{}, {}, CashierReq>,
            res: Response
        ) {
            try{
                const result = await CashierModel.findAll()
                return status.success(res, result, "Berhasil menampilkan data")
            }catch(error){
                return status.error(res, error, "Gagal menampilkan data") 
            }
        }
    
        static async update(
            req: Request<{id : string}, {}, CashierReq>,
            res: Response,
        ){
            const orderNumber = await GenerateOrderNumber("A")
            const id = req.params.id
            const body = req.body 
            const subtotal = new Prisma.Decimal(body.subtotal)
            const tax_total = new Prisma.Decimal(body.tax_total)
            const discount_total = new Prisma.Decimal(body.discount_total)
            const total = subtotal.minus(discount_total).plus(tax_total)
            try {
                const data: Prisma.OrderCreateInput = {
                    order_number: orderNumber, 
                    user: { connect: {id : body.userId} },
                    customer: { connect: {id : body.customerId} }, 
                    status: body.status, 
                    subtotal: subtotal, 
                    discount_total: discount_total, 
                    tax_total: tax_total,
                    total: total,
                    placed_at: new Date,
                }
                const result = await CashierModel.update(id, data)
                return status.success(res, result, "data berhasil di update")
            }catch(error){
                return status.error(res, error, "Gagal mengupdate data") 
            }
        }
    
        static async delete(
            req: Request<{id: string}, {}, CashierReq>,
            res: Response,
        ){
            try{
                const id = req.params.id
                const result = await CashierModel.delete(id)
                return status.success(res, result, "Data berhasil di hapus")
            }catch(error){
                return status.error(res, error, "Gagal mendelete data") 
            }
        }
}