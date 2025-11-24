import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const ProductModel = {
    findAll: () => prisma.product.findMany({include:{category : true}}),
    create: (data: any) => prisma.product.create({data, include:{category : true}}),
    update: (id: string, data: any) => prisma.product.update({where: {id}, data, include:{category : true}}),
    delete: (id: string ) => prisma.product.delete({where: {id}}),
    findByPk: (id: string) => prisma.product.findUnique({ where: {id}, include:{category : true}})
}