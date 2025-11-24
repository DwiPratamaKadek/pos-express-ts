import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const InventoryStockModel = {
    findAll: () => prisma.inventoryStock.findMany({include : {ingredient : true}}),
    create: (data: any) => prisma.inventoryStock.create({data, include : {ingredient : true}}),
    update: (id: string, data: any) => prisma.inventoryStock.update({where: {id}, data, include : {ingredient : true}}),
    delete: (id: string ) => prisma.inventoryStock.delete({where: {id}}),
    findByPk: (id: string) => prisma.inventoryStock.findUnique({ where: {id}, include : {ingredient : true}}),
}   