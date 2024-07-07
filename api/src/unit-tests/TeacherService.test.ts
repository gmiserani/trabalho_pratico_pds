import { beforeEach, describe, expect, test, vi } from "vitest";
import { TeacherService } from "../domains/teacher/services/TeacherService";
import { Prisma, Teacher } from "@prisma/client";
import prisma from "../libs/__mocks__/prisma";

vi.mock("../libs/prisma.ts");

const selectOptions = {
    id: true,
    name: true,
    picture: true,
    subject: {
        select: {
            name: true,
            syllabus: true,
            mode: true,
            date: true,
            time: true,
            semester: true,
            workload: true,
            teacher: true,
        },
    },
};

describe("create", () => {
    let createBody: Prisma.TeacherCreateInput;

    beforeEach(() => {
        vi.resetAllMocks();

        createBody = {
            name: "John Doe",
            picture: "picture",
            id: "1",
        };
    });

    test("Should create a new teacher", async () => {
        await TeacherService.create(createBody);

        expect(prisma.teacher.create).toHaveBeenCalledWith({
            data: {
                name: createBody.name,
            },
        });
    });
});

describe("getById", () => {
    let teacher: Teacher;

    beforeEach(() => {
        vi.resetAllMocks();

        teacher = {
            id: "1",
            name: "John Doe",
            picture: "picture",
        };
    });

    test("Should return a teacher by id", async () => {
        prisma.teacher.findFirst.mockResolvedValueOnce(teacher);

        const result = await TeacherService.getById("1");

        expect(result).toEqual(teacher);
    });

    test("Should throw error if teacher is not found", async () => {
        prisma.teacher.findFirst.mockResolvedValueOnce(null);

        await expect(TeacherService.getById("1")).rejects.toThrow("Teacher not found");
    });

});

describe("getAll", () => {
    let teachers: Teacher[];

    beforeEach(() => {
        vi.resetAllMocks();

        teachers = [
            {
                id: "1",
                name: "John Doe",
                picture: "picture",
            },
            {
                id: "2",
                name: "Jane Doe",
                picture: "picture",
            },
        ];
    });

    test("Should return all teachers", async () => {
        prisma.teacher.findMany.mockResolvedValueOnce(teachers);

        const result = await TeacherService.getAll();

        expect(result).toEqual(teachers);
    });

    test("Should throw error if no teachers are found", async () => {
        prisma.teacher.findMany.mockResolvedValueOnce([]);

        await expect(TeacherService.getAll()).rejects.toThrow("No teachers found");
    });
});

describe("update", () => {
    let updateBody: Prisma.TeacherUpdateInput;

    beforeEach(() => {
        vi.resetAllMocks();

        updateBody = {
            name: "Jane Doe",
        };
    });

    test("Should update a teacher", async () => {
        await TeacherService.update("1", updateBody);

        expect(prisma.teacher.update).toHaveBeenCalledWith({
            where: {
                id: "1",
            },
            data: updateBody,
        });
    });
});