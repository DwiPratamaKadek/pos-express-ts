import { LoginReq } from "../../core/request/auth/LoginReq"
import { RegisterReq } from "../../core/request/auth/RegisterReq"
import { UserModel } from "../../models/auth/UserModel"

import { generateAccessToken } from "../../core/halper/JwtGenerate"
import { generateRefreshToken } from "../../core/halper/JwtGenerate"

import { Response, Request } from "express"


import bcrypt from "bcryptjs"


export class AuthService {
    static async register (req : RegisterReq) {
        const password = req.password
        const hashPassword = await bcrypt.hash(password, 10) 
        
        const user = await UserModel.create({
            role : {connect : {id : req.roleId}}, 
            username : req.username, 
            password : hashPassword,
            full_name : req.fullName,
            email : req.email
        })

        return user
        
    } 
    
    static async login (req : LoginReq) {
        // Validasi username or email
        const user = await UserModel.findUserOrEmail(req.usernameOrEmail)
        if(!user) throw new Error("User tidak di temukan")
        // Validasi passord
        const match = await bcrypt.compare(req.password, user.password)
        if(!match) throw new Error("Password tidak sama")
        // Add JWT 
        const payload = {
            user : user.id,
            email : user.email 
        }

        const accessToken = generateRefreshToken(payload)
        const refreshToken = generateRefreshToken(payload)

        return {accessToken, refreshToken}

    }
}   