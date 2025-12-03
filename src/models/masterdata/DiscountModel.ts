import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const DiscountModel = {
    findAll: () => prisma.discount.findMany(),
    create: (data: any) => prisma.discount.create({data}),
    update: (id: string, data: any) => prisma.discount.update({where: {id}, data}),
    delete: (id: string ) => prisma.discount.delete({where: {id}}),
    findByPk: (id: string) => prisma.discount.findUnique({ where: {id}}),
    findByCode: (code : string) => prisma.discount.findFirst({ where: {code : code} }),
    findByName: (name : string) => prisma.discount.findFirst({ where: {name : name} })
    
}   