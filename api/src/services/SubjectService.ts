// Service class for the Subject entity. Here we define the methods that will be used in the SubjectController

import prisma from "../prisma_main";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../src/error";

class SubjectServiceClass {

    // Define the fields that will be returned when a subject is fetched
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
    };

    // Create a new subject
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

    // Get a subject by its ID
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

    // Get all subjects, but only the name and the 
    async getAllSummaryNormalOrder() {
        const subjects = await prisma.subject.findMany({
            select: {
                id: true,
                name: true,
                overall_rating: true,
            },
        });

        if (!subjects) {
            throw new QueryError("No subjects found");
        }

        return subjects;
    }

    // Get all subjects, but ordered by the overall rating
    async getAllSummaryRatingOrderDesc() {
        const subjects = await prisma.subject.findMany({
            select: {
                id: true,
                name: true,
                overall_rating: true,
            },
            orderBy: {
                overall_rating: "desc",
            },
        });

        if (!subjects) {
            throw new QueryError("No subjects found");
        }

        return subjects;
    }

    // Get all subjects, but ordered by the overall rating
    async getAllSummaryRatingOrderAsc() {
        const subjects = await prisma.subject.findMany({
            select: {
                id: true,
                name: true,
                overall_rating: true,
            },
            orderBy: {
                overall_rating: "asc",
            },
        });

        if (!subjects) {
            throw new QueryError("No subjects found");
        }

        return subjects;
    }

    // Check if a user can review a subject (if the user has already reviewed the subject, he can't review it again)
    async canUserReviewSubject(subject_id: string, username: string) {
        const user = await prisma.user.findFirst({
            where: {
                name: username,
            },
            select: {
                id: true,
            },
        });

        if (!user) {
            throw new QueryError("User not found");
        }

        const review = await prisma.review.findFirst({
            where: {
                subject_id: subject_id,
                user_id: user.id,
            },
        });

        if (review) {
            return false;
        }

        return true;
    }

    // Get the reviews for a subject
    async getReviews(id: string) {
        const subject = await prisma.subject.findFirst({
            where: {
                id: id,
            },
            select: {
                reviews: {
                    select: {
                        user: {
                            select: {
                                username: true,
                            },
                        },
                        test_rating: true,
                        project_rating: true,
                        teacher_rating: true,
                        effort_rating: true,
                        presence_rating: true,
                        overall_rating: true,
                        comment: true,
                    },
                },
            },
        });

        if (!subject) {
            throw new QueryError("Subject not found");
        }

        return subject.reviews;
    }

    // Get most common ratings for a subject
    async calculateMostCommonRating(id: string) {
        const test_ratings = await prisma.review.groupBy({
            by: ["test_rating"],
            _count: {
                test_rating: true,
            },
            where: {
                subject_id: id,
            },
            orderBy: {
                _count: {
                    test_rating: "desc",
                },
            },
        });
        const project_ratings = await prisma.review.groupBy({
            by: ["project_rating"],
            _count: {
                project_rating: true,
            },
            where: {
                subject_id: id,
            },
            orderBy: {
                _count: {
                    project_rating: "desc",
                },
            },
        });
        const teacher_ratings = await prisma.review.groupBy({
            by: ["teacher_rating"],
            _count: {
                teacher_rating: true,
            },
            where: {
                subject_id: id,
            },
            orderBy: {
                _count: {
                    teacher_rating: "desc",
                },
            },
        });
        const presence_ratings = await prisma.review.groupBy({
            by: ["presence_rating"],
            _count: {
                presence_rating: true,
            },
            where: {
                subject_id: id,
            },
            orderBy: {
                _count: {
                    presence_rating: "desc",
                },
            },
        });
        const effort_ratings = await prisma.review.groupBy({
            by: ["effort_rating"],
            _count: {
                effort_rating: true,
            },
            where: {
                subject_id: id,
            },
            orderBy: {
                _count: {
                    effort_rating: "desc",
                },
            },
        });

        await prisma.subject.update({
            where: {
                id: id,
            },
            data: {
                test_rating: test_ratings[0].test_rating,
                project_rating: project_ratings[0].project_rating,
                teacher_rating: teacher_ratings[0].teacher_rating,
                presence_rating: presence_ratings[0].presence_rating,
                effort_rating: effort_ratings[0].effort_rating,
            },
        });
    }

    // Get avg rating for subject
    async calculateAvgRating(id: string) {
        const average = await prisma.review.aggregate({
            where: {
                subject_id: id,
            },
            _avg: {
                overall_rating: true,
            }
        });

        await prisma.subject.update({
            where: {
                id: id,
            },
            data: {
                overall_rating: average._avg.overall_rating ?? 0,
            },
        });
    }

    // Get the ratings for a subject
    async getRatings(id: string) {
        const subject = await prisma.subject.findFirst({
            where: {
                id: id,
            },
            select: {
                test_rating: true,
                project_rating: true,
                teacher_rating: true,
                presence_rating: true,
                effort_rating: true,
                overall_rating: true,
            },
        });

        if (!subject) {
            throw new QueryError("Subject not found");
        }

        return subject;
    }

    // Add a review to a subject -> will receive the ID of the subject, the name of the user and the review data
    async addReview(id: string, username: string, body: Prisma.ReviewCreateInput) {
        const user = await prisma.user.findFirst({
            where: {
                username: username,
            },
            select: {
                id: true,
            },
        });

        console.log(user);

        if (!user) {
            throw new QueryError("User not found");
        }

        if (!["SIM", "NAO"].includes(body.presence_rating)) {
            throw new Error("Invalid presence rating");
        }

        if (!["RUIM", "MEDIA", "BOA", "OTIMA"].includes(body.teacher_rating)) {
            throw new Error("Invalid teacher rating");
        }

        if (!["FACIL", "MEDIO", "DIFICIL"].includes(body.project_rating)) {
            throw new Error("Invalid project rating");
        }

        if (!["FACIL", "MEDIO", "DIFICIL"].includes(body.test_rating)) {
            throw new Error("Invalid test rating");
        }

        if (!["POUCO", "MEDIO", "MUITO"].includes(body.effort_rating)) {
            throw new Error("Invalid effort rating");
        }

        if (body.overall_rating < 1 || body.overall_rating > 5) {
            throw new Error("Invalid overall rating");
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

        prisma.subject.update({
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
            select: {
                reviews: {
                    select: {
                        user: {
                            select: {
                                username: true,
                            },
                        },
                        test_rating: true,
                        project_rating: true,
                        teacher_rating: true,
                        effort_rating: true,
                        presence_rating: true,
                        overall_rating: true,
                        comment: true,
                    },
                },
            },
        });

        this.calculateMostCommonRating(id);
        this.calculateAvgRating(id);
    }
}

export const SubjectService = new SubjectServiceClass();