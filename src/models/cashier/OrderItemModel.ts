import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const OrderItemModel = {
    findAll: (data: any) => prisma.orderItem.findMany(data),
    create: (data: any) => prisma.orderItem.create({data}),
    update: (id: string, data: any) => prisma.orderItem.update({where: {id}, data}),
    delete: (id: string ) => prisma.orderItem.delete({where: {id}}),
    findByPk: (id: string) => prisma.orderItem.findUnique({ where: {id}}),

}