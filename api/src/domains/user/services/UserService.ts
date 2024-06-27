// Service class for user related operations in the database. Here we define the methods that will be used in the UserController

import prisma from "../../../libs/prisma";
import { hash } from "bcrypt";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../../middlewares/error";
import { UserRepository } from "../repositories/UserRepository";

class UserServiceClass {

    private async encryptPassword(password: string) {
        const saltRounds = 10;
        const encryptedPassword = await hash(password, saltRounds);
        return encryptedPassword;
    }

    // Function to create a new user
    async create(body: { name: string; username: string; course: string; semester: string; email: string; password: string;}) {

        // Check if the email is already in use
        const userEmail = await UserRepository.getUserByEmail(body.email)       
        if (userEmail) {
            throw new QueryError("This email is already in use");
        }
        // Check if the username is already in use
        const userUsername = await UserRepository.getUserByUsername(body.username);
        if (userUsername) {
            throw new QueryError("Username already in use");
        }

        const encryptedPassword = await this.encryptPassword(body.password);

        // Convert the 'semester' property to a number
        const newUser = await UserRepository.createUser({...body, password: encryptedPassword, semester: Number(body.semester)})

        return newUser;
    }

    // Function to fetch all users
    async getAll() {
        const users = await UserRepository.getAllUsers();
        if (users.length === 0) {
            throw new QueryError("No users found");
        }
        return users;
    }

    // Function to fetch a user by id
    async getById(id: string) {
        const user = await UserRepository.getUserById(id);

        if (!user) {
            throw new QueryError("User not found");
        }

        return user;
    }

}

// Export the service
export const UserService = new UserServiceClass();