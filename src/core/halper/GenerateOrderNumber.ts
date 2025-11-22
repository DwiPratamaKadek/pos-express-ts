import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export async function GenerateOrderNumber(prefix = "A") {
    const lastOrder = await prisma.order.findFirst({
        orderBy : {id : "desc"}, 
        select : {order_number : true}
    })

    if(!lastOrder){
        return `${prefix}01`
    }

    const lastCode = lastOrder.order_number
    const lastNum = Number(lastCode.substring(prefix.length))
    const nextNum = lastNum + 1

    return `${prefix}${String(nextNum).padStart(2, "0")}`
}