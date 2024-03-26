import prisma from "../../api/prisma_main";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../api/error";


class TeacherServiceClass {
    selectOptions = {
        name: true,
        subjects: {
            select: {
                name: true,
            },
        },
    };

    async getById(id: string) {
        const teacher = await prisma.teacher.findFirst({
            where: {
                id,
            },
            select: this.selectOptions,
        });

        if (!teacher) {
            throw new QueryError("Teacher not found");
        }

        return teacher;
    }

    async getAll() {
        const teachers = await prisma.teacher.findMany({
            select: this.selectOptions,
        });
        if (teachers.length === 0) {
            throw new QueryError("No teachers found");
        }
        return teachers;
    }

    async create(body: Prisma.TeacherCreateInput) {
        const newTeacher = await prisma.teacher.create({
            data: {
                name: body.name,
            },
        });

        return newTeacher;
    }

}

export const TeacherService = new TeacherServiceClass();