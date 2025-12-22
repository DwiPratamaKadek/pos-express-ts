import { Response, Request } from "express"
import { RegisterReq } from "../../core/request/auth/RegisterReq"
import { BaseControler } from "../../core/halper/BaseControler"
import { AuthService } from "../../services/Auth/AuthService"
import { LoginReq } from "../../core/request/auth/LoginReq"
import { UserModel } from "../../models/auth/UserModel"

const status = new BaseControler()

export class AuthController {
    static async register (
        req: Request<{}, {}, RegisterReq>,
        res: Response
    ) {
        try {
            const body = req.body
            const result = await AuthService.register(body)
            return status.success(res, result, "Data Berhasil di Tambahkan")
        }catch(error){
            return status.error(res, error, "Data gagal di buat")
        }
    }

    static async login (
        req: Request<{}, {}, LoginReq>,
        res: Response
    ) {
        try {
            const body = req.body
            const result = await AuthService.login(body)
            // simpan refresh token ke cookie
            res.cookie("refreshToken", result.refreshToken, {
                httpOnly : true,
                secure : false, 
                sameSite : "none",
                path: "/"
            })

            return status.success(res, result, "Anda berhasil Login")
        }catch(error) {
            return status.error(res, error, "Password atau Username anda salah")
        }
    }

    static async Alldata (
        req: Request<{}, {}, LoginReq>,
        res: Response
    ) {
        try {
            const result = await UserModel.findAll()
            return status.success(res, result, "Anda berhasil Login")
        }catch(error) {
            return status.error(res, error, "Password atau Username anda salah")
        }
    }
}