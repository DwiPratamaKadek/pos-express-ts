import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()

export const UserModel = {
    findAll: () => prisma.user.findMany({include: {role: true}}),
    create: (data: any) => prisma.user.create({data, include: {role: true}}),
    update: (id: string, data: any) => prisma.user.update({where: {id}, data, include: {role: true}}),
    delete: (id: string ) => prisma.user.delete({where: {id}}),
    findByPk: (id: string) => prisma.user.findUnique({ where: {id}, include: {role: true}}),
    findUserOrEmail : (indentifier :string) => prisma.user.findFirst({
        where : {
            OR : [
                {username : indentifier},
                {email : indentifier} 
            ]
        }
    })
}