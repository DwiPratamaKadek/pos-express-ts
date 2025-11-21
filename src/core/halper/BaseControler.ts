import { Response } from "express" 
import  { HttpStatus } from  "./HttpStatus" 

export class BaseControler{

    success(res : Response,  data : any, message = "Success"){
        return res.status(HttpStatus.OK).json({success : true, data, message})
    }

    created(res : Response, data : any, message = "Created"){
        return res.status(HttpStatus.CREATED).json({success : true, data, message})
    }

    error(res : Response,error : any, message = "Error"){
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            success : false, 
            message, 
            error: error instanceof Error ? error.message : error

        })
    }

}