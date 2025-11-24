import { Request, Response } from "express";

import { CategoryReq } from "../../core/request/masterdata/CategoryReq";
import { CategoryModel } from "../../models/masterdata/CategoryModel";
import { BaseControler } from "../../core/halper/BaseControler";

const status = new BaseControler()


export class  CategoryController {
// Request<Params, ResBody, ReqBody, Query>
// Jadi untuk kasus kamu:

// Params → { id: string }

// ResBody → {} (atau any)

// ReqBody → RoleReq

// Query → {}

    static async creted(
        req: Request<{}, {}, CategoryReq>,
        res: Response
    ) {
        try{
            const {name} = req.body
            const exist = await CategoryModel.findByName(name)

            if(exist) {
                return status.error(res, exist, "Data sudah ada")
            }

            const data = await CategoryModel.create(req.body)
            return status.created(res, data, "Data berhasil di tambahkan")
        }catch(error){ 
            return status.error(res, error, "Gagal menambahkan data")    
        }
    } 
    
    static async get(
        req: Request<{}, {}, CategoryReq>,
        res: Response
    ) {
        try{
            const data = await CategoryModel.findAll()
            return status.success(res, data, "Berhasil menampilkan data")
        }catch(error){
            return status.error(res, error, "Gagal menampilkan data") 
        }
    }

    static async update(
        req: Request<{id : string}, {}, CategoryReq>,
        res: Response,
    ){
        try {
            const id = req.params.id
            const data = await CategoryModel.update(id, req.body)
            return status.success(res, data, "data berhasil di update")
        }catch(error){
            return status.error(res, error, "Gagal mengupdate data") 
        }
    }

    static async delete(
        req: Request<{id: string}, {}, CategoryReq>,
        res: Response,
    ){
        try{
            const id = req.params.id
            const data = await CategoryModel.delete(id)
            return status.success(res, data, "Data berhasil di hapus")
        }catch(error){
            return status.error(res, error, "Gagal mendelete data") 
        }
    }
}