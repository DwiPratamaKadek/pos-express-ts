import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const OrderModel = {
    create: (data: any) => prisma.order.create({
        data, 
        include: {
            user : true, 
            customer : true,
            orderItems : {include : {
                product : true, 
                productVariant : true
            }}
        }
    }),
    findAll: () => prisma.order.findMany({
        include: {
            user : true, 
            customer : true, 
            orderItems : {
                include : {
                    // order: true, 
                    product : true, 
                    productVariant : true
                }
            }
        }
    }),
    update: (id: string, data: any) => prisma.order.update({
        where: {
            id
        },
        data, 
        include: {
            user : true, 
            customer : true,
            orderItems : {include : {
                product : true, 
                productVariant : true
            }}
        }
    }),
    delete: (id: string ) => prisma.order.delete({where: {id}}),
    findByPk: (id: string) => prisma.order.findUnique({ 
        where: {
            id
        }, 
        include: {
            user : true, 
            customer : true, 
            orderItems : {include : {
                product : true, 
                productVariant : true
            }}
        }
    }),  
    
    softDelete: (id : string) => prisma.order.update({
        where:{id}, 
        data :{
            status : "cancelled", 
            delete_at : new Date()
        }
    })
    
}