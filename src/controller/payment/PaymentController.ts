import { Response, Request } from "express";
import { PaymentReq } from "../../core/request/payment/PaymentReq";
import { BaseControler } from "../../core/halper/BaseControler";
import { PaymentService } from "../../services/payment/PaymentService";

const status = new BaseControler()

export class PaymentController {
    static async create (
        req: Request<{}, {}, PaymentReq>,
        res: Response
    ) {
       try {
            const result = await PaymentService.create(req.body)
            return status.success(res, result, "Data berhasil di tambahkan")
       }catch(error) {
            return status.error(res, error, "Data gagal di tambahkan")
       } 
    } 
}