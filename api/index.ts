import express, { Express, NextFunction, Request, Response } from "express";
import prisma from "../api/prisma_main";
import { Prisma } from "@prisma/client";
import { QueryError, errorHandler } from "../api/error";

const app: Express = express(); // Responsable for the routes -> listen to routes I defined, uses the port to receive requests and decide what to do with them
const port = 3000;
app.use(express.json()); // Middleware to parse the body of the request -> JSON
app.use(express.urlencoded({ extended: true })); // Middleware to parse the body of the request -> URL Encoded

// Controller -> define which function of the will be called for each route -> depending on the request -> dependps on the path and the method

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
}

// Service -> define the business logic -> what the function will do -> what the function will return

export const UserService = new UserServiceClass();

app.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await UserService.create(req.body);
        res.status(200).end();
    }
    catch (error) {
        next(error);
    }
},
);

app.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getAll();
        res.status(200).json(users).end();
    }
    catch (error) {
        next(error);
    }
},
);

app.post("/:id", (req: Request, res: Response) => {
    res.json({ message: `Ola ${req.params.id}` }).end();
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

app.use(errorHandler);