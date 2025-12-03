import { Prisma } from "@prisma/client";
import { PaymentReq } from "../../core/request/payment/PaymentReq";
import { OrderModel } from "../../models/cashier/OrderModel";
import { PaymentModel } from "../../models/payment/PaymentModel";

export class PaymentService {
    static async create (body : PaymentReq) {
        const order = await OrderModel.findByPk(body.orderId)
        const paid_amount = new Prisma.Decimal(body.paid_amount)
        
        if(!order) 
            throw new Error (" Order tidak di temukan")

        if(paid_amount.lt(order.subtotal)) 
            throw new Error("Uang anda kurang")
        
        const payment = await PaymentModel.create({    
            order : {connect : {id : order.id}} , 
            paid_amount : paid_amount, 
            method : body.method, 
            paid_at : new Date(),
            status : "berhasil"
        })
        

        await OrderModel.update(
            order.id,
            { 
                status : "Paid"
            }
        )

        return payment

    }
}