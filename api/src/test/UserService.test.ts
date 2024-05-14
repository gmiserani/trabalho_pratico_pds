import { beforeEach, describe, expect, test, vi } from "vitest";
import { UserService } from "../services/UserService";
import { Prisma } from "@prisma/client";
import prisma from "../libs/__mocks__/prisma";
import * as bcrypt from "bcrypt";

vi.mock("../libs/prisma.ts");
vi.mock("bcrypt", () => ({
    hash: vi.fn((password: string, saltRounds: number) => "encryptedPassword"),
}));

const selectOptions = {
    email: true,
    name: true,
    username: true,
    course: true,
    semester: true,
};

describe("create", () => {
    let createBody: Prisma.UserCreateInput;

    beforeEach(() => {
        vi.resetAllMocks();

        createBody = {
            email: "test@test.io",
            username: "test1",
            password: "123",
            name: "test",
            course: "test",
            semester: 1,
        };
    });

    test("Should call findFirst with email and username", async () => {
        await UserService.create(createBody);

        expect(prisma.user.findFirst).toHaveBeenNthCalledWith(1, {
            where: {
                email: createBody.email,
            },
        });

        expect(prisma.user.findFirst).toHaveBeenNthCalledWith(2, {
            where: {
                username: createBody.username,
            },
        });
    });

    test("Should throw error if email is already in use", async () => {
        prisma.user.findFirst.mockResolvedValueOnce({
            id: "1",
            name: "John Doe",
            username: "johndoe",
            email: createBody.email,
            course: "Computer Science",
            semester: 2,
            password: "hashedPassword"
        });
        await expect(UserService.create(createBody)).rejects.toThrow("This email is already in use");
    });

    test("Should throw error if username is already in use", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(null);
        prisma.user.findFirst.mockResolvedValueOnce({
            id: "1",
            name: "John Doe",
            username: createBody.username,
            email: "john@prisma.io",
            course: "Computer Science",
            semester: 2,
            password: "hashedPassword"
        });
        await expect(UserService.create(createBody)).rejects.toThrow("Username already in use");
    });

    test("Should call encryptPassword", async () => {
        await UserService.create(createBody);
        expect(bcrypt.hash).toHaveBeenCalledWith(createBody.password, 10);
    });

    // test("Should call prisma.user.create with encrypted password", async () => {
    //     await UserService.create(createBody);

    //     expect(prisma.user.create).toHaveBeenCalledWith({
    //         data: {
    //             email: createBody.email,
    //             username: createBody.username,
    //             name: createBody.name,
    //             course: createBody.course,
    //             semester: createBody.semester,
    //             password: "encryptedPassword",
    //         },
    //     });
    // });
});

describe("getAll", () => {
    let findManyUsers: User[];

    beforeEach(() => {
        vi.resetAllMocks();

        findManyUsers = [
            {
                id: "1",
                name: "John Doe",
                username: "johndoe",
                email: "john@prisma.io",
                course: "Computer Science",
                semester: 2,
                password: "hashedPassword"
            },
        ];
    });

    test("Should call prisma.user.findMany", async () => {
        prisma.user.findMany.mockResolvedValueOnce(findManyUsers);

        await UserService.getAll();

        expect(prisma.user.findMany).toHaveBeenCalled();
    });

    test("Should throw error if no users are found", async () => {
        prisma.user.findMany.mockResolvedValueOnce([]);

        await expect(UserService.getAll()).rejects.toThrow("No users found");
    });

    test("Should return users", async () => {
        prisma.user.findMany.mockResolvedValueOnce(findManyUsers);

        const users = await UserService.getAll();

        expect(users).toEqual(findManyUsers);
    });

    test("Should return users with select options", async () => {
        prisma.user.findMany.mockResolvedValueOnce(findManyUsers);

        await UserService.getAll();

        expect(prisma.user.findMany).toHaveBeenCalledWith({
            select: selectOptions,
        });
    });
});

describe("getById", () => {

    let findFirstUser: User;

    beforeEach(() => {
        vi.resetAllMocks();

        findFirstUser = {
            id: "1",
            name: "John Doe",
            username: "johndoe",
            email: "john@prisma.io",
            course: "Computer Science",
            semester: 2,
            password: "hashedPassword"
        };
    });

    test("Should call prisma.user.findFirst", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);

        await UserService.getById("1");

        expect(prisma.user.findFirst).toHaveBeenCalledWith({
            where: {
                id: "1",
            },
            select: selectOptions,
        });
    });

    test("Should throw error if user is not found", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(null);

        await expect(UserService.getById("1")).rejects.toThrow("User not found");
    });

    test("Should return user", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);

        const user = await UserService.getById("1");

        expect(user).toEqual(findFirstUser);
    });

    test("Should return user with select options", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);

        await UserService.getById("1");

        expect(prisma.user.findFirst).toHaveBeenCalledWith({
            where: {
                id: "1",
            },
            select: selectOptions,
        });
    });

});