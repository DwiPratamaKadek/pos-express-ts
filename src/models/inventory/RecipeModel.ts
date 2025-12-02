import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const RecipeModel = {
    findAll: () => prisma.recipe.findMany({include : {ingredient:true, product: true, productVariant : true}}),
    create: (data: any) => prisma.recipe.create({data, include : {ingredient:true, product: true, productVariant : true}}),
    update: (id: string, data: any) => prisma.recipe.update({where: {id}, data, include : {ingredient:true, product: true, productVariant : true}}),
    delete: (id: string ) => prisma.recipe.delete({where: {id}}),
    findByPk: (id: string) => prisma.recipe.findUnique({ where: {id}, include : {ingredient:true, product: true, productVariant : true}}),
    findProduct : (product : string, variant : string) => 
        prisma.recipe.findMany({
            where: {
                productId : product, 
                ...(variant ? {variantId : variant} : {variantId : null })
            }
        })
}