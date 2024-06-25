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
    async alreadyExists(teacher_name: string, body: Prisma.SubjectCreateInput) {
        const alreadyExists = await prisma.subject.findFirst({
            where: {
                name: body.name,
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
            teacher: {create: {name: body.teacher_name}},
        });
        return subject;
    }

    async connect(body: Prisma.SubjectCreateInput) {
        const subject = await prisma.subject.create({
            data: body,
            teacher: {connect: {name: body.teacher_name}},
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

    async canUserReviewSubject(id: string, userId: string) {
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

    async updateSubject(id: string, body: {test_ratings: string, project_ratings: string, teacher_ratings: string, presence_ratings: string, effort_ratings: string}) {
        const updatedSubject = await prisma.subject.update({
            where: {
                id,
            },
            data: body,
        });

        return updatedSubject;
    }

    // Get avg rating for subject
    async calculateAvgRating(id: string, body: {overall_rating: boolean}) {
        const average = await prisma.review.aggregate({
            where: {
                subject_id: id,
            },
            _avg: body,
        });
        return average;
    }

    async update(id: string, body: {overall_rating: number}) {
        const updatedTeacher = await prisma.teacher.update({
            where: {
                id,
            },
            data: body,
        });

        return updatedTeacher;
    }


    // Get the ratings for a subject
    async getRatings(id: string, body: {overall_rating: boolean, test_ratings: boolean, project_ratings: boolean, teacher_ratings: boolean, presence_ratings: boolean, effort_ratings: boolean}) {
        const subject = await prisma.subject.findFirst({
            where: {
                id: id,
            },
            select: body,
        });
        return subject;
    }

    // Add a review to a subject -> will receive the ID of the subject, the name of the user and the review data
    async addReview(id: string, userId: string) {
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

    async addReview2(id: string) {
        const subject = await prisma.subject.findFirst({
            where: {
                id: id,
            },
            select: {
                id: true,
            },
        });
        return subject;
    }

    async createReview(id: string, userId: string, body: Prisma.ReviewCreateInput) {
        const review = await prisma.review.create({
            data: {
                ...body,
                user_id: userId,
                subject_id: id,
            },
        });
        return review;
    }
    async updateSubject2(id: string, id2: string, body: {test_rating: boolean, project_rating: boolean, teacher_rating: boolean, presence_rating: boolean, effort_rating: boolean, overall_rating: boolean, comment: boolean, user: {select: {username: boolean}}}) {
        const updatedSubject = await prisma.subject.update({
            where: {
                id,
            },
            data: {
                reviews: {
                    connect: {
                        id2,
                    },
                },
            },
            select: {
                reviews: {
                    select: {body},
                }
            }
        });

        return updatedSubject;
    }

}

export const SubjectRepository = new SubjectRepositoryClass();
