import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const ProductVarianModel = {
    findAll: () => prisma.productVariant.findMany({include:{product : true}}),
    create: (data: any) => prisma.productVariant.create({data, include:{product : true}}),
    update: (id: string, data: any) => prisma.productVariant.update({where: {id}, data, include:{product : true}}),
    delete: (id: string ) => prisma.productVariant.delete({where: {id}}),
    findByPk: (id: string) => prisma.productVariant.findUnique({ where: {id}, include:{product : true}}),     
}