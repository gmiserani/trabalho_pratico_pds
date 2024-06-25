import { Prisma } from "@prisma/client";
import prisma from "../../../libs/prisma";

class UserRepositoryClass {
    // Define the fields that will be returned when a user is fetched
    selectOptions = {
        name: true,
        email: true,
        username: true,
        course: true,
        semester: true,
    };

    async getUserByEmail(email: string) {
        const users = await prisma.user.findFirst({
            where: {
                email
            },
        });
        return users;
    }

    async getUserByUsername(username: string) {
        const users = await prisma.user.findFirst({
            where: {
                username
            },
        });
        return users;
    }

    async createUser(userData: Prisma.UserCreateInput) {
        const user = await prisma.user.create({
            data: userData,
        });

        return user;
    }

    async getAllUsers() {
        const users = await prisma.user.findMany({
          select: this.selectOptions,
        });
        return users;
    }

    async getUserById(id: string) {
        const user = await prisma.user.findFirst({
          where: {
            id,
          },
          select: this.selectOptions,
        });
    
        return user;
      }
}

export const UserRepository = new UserRepositoryClass();