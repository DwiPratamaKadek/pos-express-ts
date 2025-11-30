export interface OrderItemreq { 
    productId : string, 
    variantId : string, 
    quantity : number, 
    // unit price, line total, dan discount amount akan diambil dari product id. 
}   