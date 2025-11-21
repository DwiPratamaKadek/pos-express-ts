import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const    CategoryModel = {
    findAll: () => prisma.categories.findMany(),
    create: (data: any) => prisma.categories.create({data}),
    update: (id: string, data: any) => prisma.categories.update({where: {id}, data}),
    delete: (id: string ) => prisma.categories.delete({where: {id}}),
    findByPk: (id: string) => prisma.categories.findUnique({ where: {id}}),
    findByName: (name : string) => prisma.categories.findFirst({where: {name : name}})

}