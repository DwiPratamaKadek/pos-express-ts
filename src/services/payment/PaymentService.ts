import { Prisma } from "@prisma/client";
import { PaymentReq } from "../../core/request/payment/PaymentReq";
import { OrderModel } from "../../models/cashier/OrderModel";
import { PaymentModel } from "../../models/payment/PaymentModel";

export class PaymentService {
    static async create (body : PaymentReq) {
        const order = await OrderModel.findByPk(body.orderId)
        if(!order) 
            throw new Error (" Order tidak di temukan")

        const payment = await PaymentModel.create({    
                order : {connect : {id : order.id}} , 
                paid_amount : new Prisma.Decimal(body.paid_amount), 
                method : body.method, 
                paid_at : new Date(),
                status : "berhasil"
        })

        await OrderModel.update(
            order.id,
            { 
                status : "done"
            }
        )

        return payment

    }
}