import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const CashierModel = {
    create: (data: any) => prisma.order.create({data, include: {user : true, customer : true}}),
    findAll: () => prisma.order.findMany({include: {user : true, customer : true}}),
    update: (id: string, data: any) => prisma.order.update({where: {id}, data, include: {user : true, customer : true}}),
    delete: (id: string ) => prisma.order.delete({where: {id}}),
    findByPk: (id: string) => prisma.order.findUnique({ where: {id}, include: {user : true, customer : true}}),
   
}