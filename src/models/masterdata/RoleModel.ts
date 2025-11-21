import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const RoleModel = {
    findAll: () => prisma.role.findMany(),
    create: (data: any) => prisma.role.create({data}),
    update: (id: string, data: any) => prisma.role.update({where: {id}, data}),
    delete: (id: string ) => prisma.role.delete({where: {id}}),
    findByPk: (id: string) => prisma.role.findUnique({ where: {id}})
}