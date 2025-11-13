import { Request, Response } from "express";

import { RoleReq } from "../../core/request/masterdata/RoleReq";
import { RoleRes } from "../../core/respond/masterdata/RoleRes";
import { RoleModel } from "../../models/masterdata/RoleController";
import { BaseControler } from "../../core/halper/BaseControler";

const status = new BaseControler()


export class  RoleController {
    static async creted(
        req: Request<{}, {}, RoleReq>,
        res: Response
    ) {
        try{
            const role = await RoleModel.create(req.body)
            return status.created(res, role, "Data berhasil di tambahkan")
        }catch(error){ 
            return status.error(res, "Gagal menambahkan data")   
        }
    } 
    
    static async get(
        req: Request<{}, {}, RoleReq>,
        res: Response
    ) {
        try{
            const role = await RoleModel.findAll()
            return status.success(res, role, "Daftar role")
        }catch(error){
            return status.error(res, "Gagal menampilkan data")
        }
    }
}