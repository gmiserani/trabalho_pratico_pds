// Service class for user related operations in the database. Here we define the methods that will be used in the UserController

import prisma from "../prisma_main";
import { hash } from "bcrypt";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../src/error";

class UserServiceClass {

    // Define the fields that will be returned when a user is fetched
    selectOptions = {
        name: true,
        email: true,
        username: true,
        course: true,
        semester: true,
    };

    private async encryptPassword(password: string) {
        const saltRounds = 10;
        const encryptedPassword = await hash(password, saltRounds);
        return encryptedPassword;
    }

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

        const encryptedPassword = await this.encryptPassword(body.password);

        // Create the new user
        const newUser = await prisma.user.create({
            data: {
                name: body.name,
                username: body.username,
                course: body.course,
                semester: Number(body.semester),
                email: body.email,
                password: encryptedPassword,
            },
        });

        return newUser;
    }

    // Function to fetch all users
    async getAll() {
        const users = await prisma.user.findMany({
            select: this.selectOptions,
        });
        if (users.length === 0) {
            throw new QueryError("No users found");
        }
        return users;
    }

    // Function to fetch a user by id
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

// Export the service
export const UserService = new UserServiceClass();