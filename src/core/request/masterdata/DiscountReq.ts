export interface DiscountReq {
    code : string, 
    name : string, 
    type : string, 
    value : string,
    applies_to : string, 
    activate_from : string,
    activate_to : string, 
    min_order_value : string, 
    usage_limit : number
}