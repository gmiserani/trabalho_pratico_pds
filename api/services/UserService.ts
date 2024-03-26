import prisma from "../../api/prisma_main";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../api/error";

class UserServiceClass {
    selectOptions = {
        name: true,
        email: true,
        username: true,
    };

    // Function to create a new user
    async create(body: Prisma.UserCreateInput) {

        // Check if the email is already in use
        const userEmail = await prisma.user.findFirst({
            where: {
                email: body.email,
            },
        });

        if (userEmail) {
            throw new QueryError("This email is already in use");
        }

        // Check if the username is already in use
        const userUsername = await prisma.user.findFirst({
            where: {
                username: body.username,
            },
        });

        if (userUsername) {
            throw new QueryError("Username already in use");
        }

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                username: body.username,
                email: body.email,
                password: body.password,
            },
        });

        return newUser;
    }

    async getAll() {
        const users = await prisma.user.findMany({
            select: this.selectOptions,
        });
        if (users.length === 0) {
            throw new QueryError("No users found");
        }
        return users;
    }

    async getById(id: string) {
        const user = await prisma.user.findFirst({
            where: {
                id,
            },
            select: this.selectOptions,
        });

        if (!user) {
            throw new QueryError("User not found");
        }

        return user;
    }

}

export const UserService = new UserServiceClass();