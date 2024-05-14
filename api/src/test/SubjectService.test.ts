import { beforeEach, describe, expect, test, vi } from "vitest";
import { SubjectService } from "../services/SubjectService";
import { TeacherService } from "../services/TeacherService";
import { Prisma, Subject, Teacher } from "@prisma/client";
import prisma from "../libs/__mocks__/prisma";
import * as bcrypt from "bcrypt";

vi.mock("../libs/prisma.ts");

const selectOptions = {
    id: true,
    name: true,
    teacher: {
        select: {
            id: true,
            name: true,
            picture: true,
        },
    },
    syllabus: true,
    mode: true,
    date: true,
    time: true,
    semester: true,
    workload: true,
};

describe("create", () => {
    let createBody: Prisma.SubjectCreateInput;

    beforeEach(() => {
        vi.resetAllMocks();

        createBody = {
            id: "1",
            name: "test",
            syllabus: "test",
            mode: "test",
            date: "Mon/Wed",
            time: "17:00",
            semester: 1,
            workload: 1,
        };
    });

    test("Should call findFirst with teacher name", async () => {
        await SubjectService.create("John Doe", createBody);

        expect(prisma.teacher.findFirst).toHaveBeenNthCalledWith(1, {
            where: {
                name: "John Doe",
            },
        });
    });

    test("Should create a new subject if it does not exist", async () => {
        prisma.teacher.findFirst.mockResolvedValueOnce(null);

        await SubjectService.create("John Doe", createBody);

        expect(prisma.subject.create).toHaveBeenCalledWith({
            data: {
                name: createBody.name,
                syllabus: createBody.syllabus,
                mode: createBody.mode,
                semester: createBody.semester,
                workload: createBody.workload,
                date: createBody.date,
                time: createBody.time,
                teacher: {
                    create: {
                        name: "John Doe",
                    },
                },
            },
        });
    });

    test("Should throw error if subject already exists", async () => {
        prisma.teacher.findFirst.mockResolvedValueOnce({
            id: "1",
            name: "John Doe",
            picture: "picture",
        });

        prisma.subject.findFirst.mockResolvedValueOnce({
            id: "1",
            name: "test",
            syllabus: "test",
            mode: "test",
            date: "Mon/Wed",
            time: "17:00",
            semester: 1,
            workload: 1,
            teacherId: "1",
        });

        await expect(SubjectService.create("John Doe", createBody)).rejects.toThrow("Subject already exists");
    });

    test("Should call findFirst with subject name", async () => {
        await SubjectService.create("John Doe", createBody);

        expect(prisma.subject.findFirst).toHaveBeenCalledWith({
            where: {
                name: "test",
            },
        });
    });
});

describe("getById", () => {
    let findFirstSubject: Subject;

    beforeEach(() => {
        vi.resetAllMocks();

        findFirstSubject = {
            id: "1",
            name: "test",
            syllabus: "test",
            mode: "test",
            date: "Mon/Wed",
            time: "17:00",
            semester: 1,
            workload: 1,
            teacherId: "1",
        };
    });

    test("Should call findFirst with subject id", async () => {
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        await SubjectService.getById("1");

        expect(prisma.subject.findFirst).toHaveBeenCalledWith({
            where: {
                id: "1",
            },
            select: selectOptions,
        });
    });

    test("Should throw error if subject is not found", async () => {
        prisma.subject.findFirst.mockResolvedValueOnce(null);

        await expect(SubjectService.getById("1")).rejects.toThrow("Subject not found");
    });
});
