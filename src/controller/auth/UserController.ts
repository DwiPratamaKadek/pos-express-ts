import { Request, Response } from "express";

import { UserReq } from "../../core/request/auth/UserReq";
import { UserModel } from "../../models/auth/UserModel";
import { BaseControler } from "../../core/halper/BaseControler";
import { RoleModel } from "../../models/masterdata/RoleModel";

const status = new BaseControler()


export class UserController {
// Request<Params, ResBody, ReqBody, Query>
// Jadi untuk kasus kamu:

// Params → { id: string }

// ResBody → {} (atau any)

// ReqBody → UserReq

// Query → {}

    static async creted(
        req: Request<{}, {}, UserReq>,
        res: Response
    ) {
        const { roleId } = req.body
        const { username } = req.body

        const role = await RoleModel.findByPk(roleId)
        const existName = await UserModel.findByName(username)

        try{
            if(existName){
                return status.error(res, existName,  "Name sudah ada ")
            }
            if(!role){
                return status.error(res, role, "Role tidak di temukan")
            }
            const user = await UserModel.create(req.body)
            return status.created(res, user, "Data berhasil di tambahkan")
        }catch(error){ 
            return status.error(res, error, "Gagal menambahkan data")   
        }
    } 
    
    static async get(
        req: Request<{}, {}, UserReq>,
        res: Response
    ) {
        try{
            const role = await UserModel.findAll()
            return status.success(res, role, "Berhasil menampilkan data")
        }catch(error){
            return status.error(res, error, "Gagal menambahkan data") 
        }
    }

    static async update(
        req: Request<{id : string}, {}, UserReq>,
        res: Response,
    ){
        try {
            const id = req.params.id
            const role = await UserModel.update(id, req.body)
            return status.success(res, role, "Data berhasil di update")
        }catch(error){
            return status.error(res, error, "Gagal menambahkan data") 
        }
    }

    static async delete(
        req: Request<{id: string}, {}, UserReq>,
        res: Response,
    ){
        try{
            const id = req.params.id
            const role = await UserModel.delete(id)
            return status.success(res, role, "Data berhasil di hapus")
        }catch(error){
            return status.error(res, error, "Gagal menambahkan data") 
        }
    }
}