import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const InventoryStockModel = {
    findAll: () => prisma.inventoryStock.findMany({include : {ingredient : true}}),
    create: (data: any) => prisma.inventoryStock.create({data, include : {ingredient : true}}),
    update: (id: string, data: any) => prisma.inventoryStock.update({where: {id}, data, include : {ingredient : true}}),
    delete: (id: string ) => prisma.inventoryStock.delete({where: {id}}),
    findByPk: (id: string) => prisma.inventoryStock.findUnique({ where: {id}, include : {ingredient : true}}),
    findIngredient: (ingredient : string) => prisma.inventoryStock.findUnique({where : {ingredientId : ingredient}})
    // kalo mau pake 1 row dari table pake aja findUnique atau tidak findFirst contoh kasus, misal pangen make row yang di table ingredient aja supaya bisa kek gini {stock.ingredient} maka pake findUniqe atau tidak findFirst sesuai kasus, 
    // kalo make findMany itu pasti tidak bisa, karena findMany berbentuk sebuah array yang akan berisi objek, jadi tidak bisa 
    // bentuk findMany [ {data:....., data:...}, {data:..,data:..} ] yang begitulah. 
}   