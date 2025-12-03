import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const IngredientModel = {
    findAll: () => prisma.ingredient.findMany(),
    create: (data: any) => prisma.ingredient.create({data}),
    update: (id: string, data: any) => prisma.ingredient.update({where: {id}, data}),
    delete: (id: string ) => prisma.ingredient.delete({where: {id}}),
    findByPk: (id: string) => prisma.ingredient.findUnique({ where: {id}}),
}   