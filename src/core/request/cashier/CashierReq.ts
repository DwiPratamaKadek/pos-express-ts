export interface CashierReq {
    
    userId: string,
    customerId: string, 
    status: string, 
    subtotal: string, 
    discount_total: string, 
    tax_total: string,
}