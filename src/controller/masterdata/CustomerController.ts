import { Request, Response } from "express";

import { CustomerReq } from "../../core/request/masterdata/CustomerReq";
import { CustomerModel } from "../../models/masterdata/CustomerModel";
import { BaseControler } from "../../core/halper/BaseControler";

const status = new BaseControler()


export class  CustomerController {
// Request<Params, ResBody, ReqBody, Query>
// Jadi untuk kasus kamu:

// Params → { id: string }

// ResBody → {} (atau any)

// ReqBody → RoleReq

// Query → {}

    static async creted(
        req: Request<{}, {}, CustomerReq>,
        res: Response
    ) {
        try{
            const role = await CustomerModel.create(req.body)
            return status.created(res, role, "Data berhasil di tambahkan")
        }catch(error){ 
            return status.error(res, error, "Gagal menambahkan data")    
        }
    } 
    
    static async get(
        req: Request<{}, {}, CustomerReq>,
        res: Response
    ) {
        try{
            const role = await CustomerModel.findAll()
            return status.success(res, role, "Berhasil menampilkan data")
        }catch(error){
            return status.error(res, error, "Gagal menambahkan data") 
        }
    }

    static async update(
        req: Request<{id : string}, {}, CustomerReq>,
        res: Response,
    ){
        try {
            const id = req.params.id
            const role = await CustomerModel.update(id, req.body)
            return status.success(res, role, "data berhasil di update")
        }catch(error){
            return status.error(res, error, "Gagal menambahkan data") 
        }
    }

    static async delete(
        req: Request<{id: string}, {}, CustomerReq>,
        res: Response,
    ){
        try{
            const id = req.params.id
            const role = await CustomerModel.delete(id)
            return status.success(res, role, "Data berhasil di hapus")
        }catch(error){
            return status.error(res, error, "Gagal menambahkan data") 
        }
    }
}