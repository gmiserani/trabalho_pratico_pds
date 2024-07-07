import { Prisma } from "@prisma/client";
import prisma from "../../../libs/prisma";

class SubjectRepositoryClass {

    // Define the fields that will be returned when a subject is fetched
    selectOptions = {
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

    // Create a new subject
    async alreadyExists(name: string) {
        const alreadyExists = await prisma.subject.findFirst({
            where: {
                name
            },
        });
        return alreadyExists;
    }

    async teacher(teacher_name: string) {
        const teacher = await prisma.teacher.findFirst({
            where: {
                name: teacher_name,
            },
        });
        return teacher;
    }

    async create(body: Prisma.SubjectCreateInput) {
        const subject = await prisma.subject.create({
            data: body,
        });
        return subject;
    }

    async connect(body: Prisma.SubjectCreateInput) {
        const subject = await prisma.subject.create({
            data: body,
        });
        return subject;
    }


    async getById(id: string) {
        const subject = await prisma.subject.findFirst({
            where: {
                id,
            },
            select: this.selectOptions,
        });
        return subject;
    }

    // Get all subjects, but only the name and
    async getAllSummaryNormalOrder() {
        const subjects = await prisma.subject.findMany({
            select: {
                id: true,
                name: true,
                overall_rating: true,
            },
        });
        return subjects;
    }

    // Get all subjects, but ordered by the overall rating
    async getAllSummaryRatingOrderDesc() {
        const subjects = await prisma.subject.findMany({
            orderBy: {
                overall_rating: "desc",
            },
            select: {
                id: true,
                name: true,
                overall_rating: true,
            },
        });
        return subjects;
    }

    // Get all subjects, but ordered by the overall rating
    async getAllSummaryRatingOrderAsc() {
        const subjects = await prisma.subject.findMany({
            orderBy: {
                overall_rating: "asc",
            },
            select: {
                id: true,
                name: true,
                overall_rating: true,
            },

        });
        return subjects;
    }

    async canUserReviewSubject(userId: string) {
        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
            },
        });
        return user;
    }

    async canUserReviewSubject2(id: string, userId: string) {
        const review = await prisma.review.findFirst({
            where: {
                subject_id: id,
                user_id: userId,
            },
        });
        return review;
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
        return subject;
    }

    async getTestRatings(id: string) {
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
        return test_ratings;
    }

    async getProjectRatings(id: string) {
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
        return project_ratings;
    }

    async getTeacherRatings(id: string) {
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
        return teacher_ratings;
    }

    async getPresenceRatings(id: string) {
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
        return presence_ratings;
    }

    async getEffortRatings(id: string) {
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
        return effort_ratings;
    }

    async updateSubject(id: string, body: { test_rating?: string, project_rating?: string, teacher_rating?: string, presence_rating?: string, effort_rating?: string }) {
        const updatedSubject = await prisma.subject.update({
            where: {
                id,
            },
            data: body,
        });

        return updatedSubject;
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
        return average;
    }

    async update(id: string, body: { overall_rating: number }) {
        const updated = await prisma.subject.update({
            where: {
                id,
            },
            data: body,
        });

        return updated;
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
            }
        });
        return subject;
    }

    async checkUser(userId: string) {
        const user = await prisma.user.findFirst({
            where: {
                id: userId,
            },
            select: {
                id: true,
            },
        });
        return user;
    }

    async checkSubject(id: string) {
        const subject = await prisma.subject.findFirst({
            where: {
                id,
            },
            select: {
                id: true,
            },
        });
        return subject;
    }

    async createReview(body: Prisma.ReviewCreateInput) {
        const review = await prisma.review.create({
            data: body
        });
        return review;
    }

    async updateSubject2(id: string, id2: string) {
        const updatedSubject = await prisma.subject.update({
            where: {
                id,
            },
            data: {
                reviews: {
                    connect: {
                        id: id2,
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

        return updatedSubject;
    }

}

export const SubjectRepository = new SubjectRepositoryClass();
