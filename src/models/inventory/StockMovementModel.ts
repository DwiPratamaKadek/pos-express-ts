import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const StockMovementModel = {
    findAll: () => prisma.stockMovement.findMany({include : {user : true, inventoryStock : true}}),
    create: (data: any) => prisma.stockMovement.create({data, include : {user : true, inventoryStock : true}}),
    update: (id: string, data: any) => prisma.stockMovement.update({where: {id}, data, include : {user : true, inventoryStock : true}}),
    delete: (id: string ) => prisma.stockMovement.delete({where: {id}}),
    findByPk: (id: string) => prisma.stockMovement.findUnique({ where: {id}, include : {user : true, inventoryStock : true}}),
}   