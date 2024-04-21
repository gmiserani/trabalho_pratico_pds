// Service class for teacher related operations in the database. Here we define the methods that will be used in the TeacherController

import prisma from "../prisma_main";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../src/error";


class TeacherServiceClass {

    // Define the fields that will be returned when a teacher is fetched
    selectOptions = {
        name: true,
        subjects: {
            select: {
                name: true,
            },
        },
    };

    // Fetch a teacher by id
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

    // Fetch all teachers
    async getAll() {
        const teachers = await prisma.teacher.findMany({
            select: this.selectOptions,
        });
        if (teachers.length === 0) {
            throw new QueryError("No teachers found");
        }
        return teachers;
    }

    // Create a new teacher
    async create(body: Prisma.TeacherCreateInput) {
        const newTeacher = await prisma.teacher.create({
            data: {
                name: body.name,
            },
        });

        return newTeacher;
    }

}

// Export the service
export const TeacherService = new TeacherServiceClass();