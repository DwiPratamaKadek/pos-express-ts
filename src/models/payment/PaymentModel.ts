import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const PaymentModel = {
    findAll: () => prisma.payment.findMany(),
    create: (data: any) => prisma.payment.create({data, include:{order : true}}),
    update: (id: string, data: any) => prisma.payment.update({where: {id}, data, include:{order : true}}),
    delete: (id: string ) => prisma.payment.delete({where: {id}, include:{order : true}}),
    findByPk: (id: string) => prisma.payment.findUnique({ where: {id}, include:{order : true}})
}