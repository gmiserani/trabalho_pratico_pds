import prisma from "../../api/prisma_main";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../api/error";

class SubjectServiceClass {
    selectOptions = {
        id: true,
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
        reviews: {
            select: {
                id: true,
            },
        },
    };

    async create(teacher_name: string, body: Prisma.SubjectCreateInput) {
        const teacher = await prisma.teacher.findFirst({
            where: {
                name: teacher_name,
            },
        });

        let newSubject;

        if (!teacher) {
            await prisma.teacher.create({
                data: {
                    name: teacher_name,
                },
            });
            newSubject = await prisma.subject.create({
                data: {
                    name: body.name,
                    teacher: {
                        create: {
                            name: teacher_name,
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
        }
        else {
            newSubject = await prisma.subject.create({
                data: {
                    name: body.name,
                    teacher: {
                        connect: {
                            id: teacher.id,
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
        }

        return newSubject;
    }

    // async getById(id: string) {
    //     const subject = await prisma.subject.findFirst({
    //         where: {
    //             id,
    //         },
    //         select: this.selectOptions,
    //     });

    //     if (!subject) {
    //         throw new QueryError("Subject not found");
    //     }

    //     return subject;
    // }

    async getAll() {
        const subjects = await prisma.subject.findMany({
        });

        if (!subjects) {
            throw new QueryError("No subjects found");
        }

        return subjects;
    }

    async getReviews(id: string) {
        const subject = await prisma.subject.findFirst({
            where: {
                id: id,
            },
            select: {
                name: true,
                reviews: {
                    select: {
                        id: true,
                        user: true,
                        test_rating: true,
                    },
                },
            },
        });
        if (!subject) {
            throw new QueryError("Subject not found");
        }

        // if (subject.reviews.length === 0) {
        //     throw new QueryError("No reviews found");
        // }

        return subject.reviews;

    }

    async addReview(id: string, user_name: string, body: Prisma.ReviewCreateInput) {
        const user = await prisma.user.findFirst({
            where: {
                name: user_name,
            },
            select: {
                id: true,
            },
        });
        console.log(user);

        if (!user) {
            throw new QueryError("User not found");
        }

        const review = await prisma.review.create({
            data: {
                user: {
                    connect: {
                        id: user.id,
                    },
                },
                subject: {
                    connect: {
                        id: id,
                    },
                },
                test_rating: body.test_rating,
                project_rating: body.project_rating,
                teacher_rating: body.teacher_rating,
                effort_rating: body.effort_rating,
                presence_rating: body.presence_rating,
                overall_rating: Number(body.overall_rating),
                comment: body.comment,
            },
        });

        const subject = prisma.subject.update({
            where: {
                id: id,
            },
            data: {
                reviews: {
                    connect: {
                        id: review.id,
                    },
                },
            },
        });

        return subject;
    }
}

export const SubjectService = new SubjectServiceClass();