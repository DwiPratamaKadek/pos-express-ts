import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const CustomerModel = {
    findAll: () => prisma.customer.findMany(),
    create: (data: any) => prisma.customer.create({data}),
    update: (id: string, data: any) => prisma.customer.update({where: {id}, data}),
    delete: (id: string ) => prisma.customer.delete({where: {id}}),
    findByPk: (id: string) => prisma.customer.findUnique({ where: {id}})
}