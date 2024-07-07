import { Prisma } from "@prisma/client";
import prisma from "../../../libs/prisma";

class TeacherRepositoryClass {
    // Define the fields that will be returned when a teacher is fetched
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

        return teacher;
    }

    async getAll() {
        const teachers = await prisma.teacher.findMany({
            select: this.selectOptions,
        });

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


    async getTeacherbyName(name: string) {
        const teacher = await prisma.teacher.findFirst({
            where: {
                name,
            },
        });

        return teacher;
    }

    async update(id: string, body: Prisma.TeacherUpdateInput) {
        const updatedTeacher = await prisma.teacher.update({
            where: {
                id,
            },
            data: body,
        });

        return updatedTeacher;
    }
}

export const TeacherRepository = new TeacherRepositoryClass();