import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const ProductModel = {
    findAll: () => prisma.product.findMany(),
    create: (data: any) => prisma.product.create({data}),
    update: (id: string, data: any) => prisma.product.update({where: {id}, data}),
    delete: (id: string ) => prisma.product.delete({where: {id}}),
    findByPk: (id: string) => prisma.product.findUnique({ where: {id}})
}