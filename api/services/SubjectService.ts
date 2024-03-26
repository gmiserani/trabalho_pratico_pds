import prisma from "../../api/prisma_main";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../api/error";

class SubjectServiceClass {
    selectOptions = {
        name: true,
        teacher: {
            select: {
                id: true,
                name: true,
            },
        },
        syllabus: true,
        mode: true,
        date: true,
        time: true,
        semester: true,
        workload: true,
        reviews: true,
    };

    async create(teacher_name: string, body: Prisma.SubjectCreateInput) {
        const teacher = await prisma.teacher.findFirst({
            where: {
                name: teacher_name,
            },
        });

        if (!teacher) {
            await prisma.teacher.create({
                data: {
                    name: teacher_name,
                },
            });
        }

        if (!teacher) {
            throw new QueryError("Teacher not found");
        }

        const newSubject = await prisma.subject.create({
            data: {
                name: body.name,
                teacher: {
                    connect: {
                        id: teacher.id,
                        name: teacher.name,
                    },
                },
                syllabus: body.syllabus,
                mode: body.mode,
                date: body.date,
                time: body.time,
                semester: Number(body.semester),
                workload: Number(body.workload),
            },
        });

        return newSubject;
    }

    async getById(id: string) {
        const subject = await prisma.subject.findFirst({
            where: {
                id,
            },
            select: this.selectOptions,
        });

        if (!subject) {
            throw new QueryError("Subject not found");
        }

        return subject;
    }
}

export const SubjectService = new SubjectServiceClass();