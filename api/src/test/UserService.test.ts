import { beforeEach, describe, expect, test, vi } from "vitest";
import { UserService } from "../services/UserService";
import { Prisma } from "@prisma/client";
import prisma from "../__mocks__/prisma";
import * as bcrypt from "bcrypt";

vi.mock("../prisma_main");
// vi.mock("bcrypt", () => ({
//     hash: vi.fn((password: string, saltRounds: number) => "encryptedPassword"),
// }));

const selectOptions = {
    id: true,
    email: true,
    name: true,
    password: true,
    username: true,
    course: true,
    semester: true,
};

describe("create", () => {
    let createBody: Prisma.UserCreateInput;

    beforeEach(() => {
        vi.resetAllMocks();

        createBody = {
            email: "test@prisma.io",
            username: "test",
            password: "123",
            name: "test",
            course: "test",
            semester: 1,
        };
    });

    test("Should call findFirst with email and username", async () => {
        console.log(createBody);
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
});

