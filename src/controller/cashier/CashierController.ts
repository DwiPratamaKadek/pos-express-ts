import { Request, Response } from "express";
import { Prisma } from "@prisma/client";

import { OrderModel } from "../../models/cashier/OrderModel"
import { CashierReq } from "../../core/request/cashier/CashierReq"
import { BaseControler } from "../../core/halper/BaseControler";
import { CashierService } from "../../services/cashier/CashierService";


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
            try{
                const body = req.body
                const result = await CashierService.createOrder(body)
                return status.created(res, result, "Data berhasil di tambahkan")
            }catch(error){ 
                return status.error(res, error, "Gagal menambahkan data")    
            }
        } 
        
       
}