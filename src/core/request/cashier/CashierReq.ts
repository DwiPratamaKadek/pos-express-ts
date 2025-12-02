import { OrderItemreq } from "./OrderItemReq";

export interface CashierReq {
    userId: string,
    customerId: string, 
    status: string, 
    items : OrderItemreq[],
    // subtotal, discount_total, dan tax_total akan terhitung dari Order Item ini

}