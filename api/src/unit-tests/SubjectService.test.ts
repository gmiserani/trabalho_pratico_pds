import { beforeEach, describe, expect, test, vi } from "vitest";
import { SubjectService } from "../domains/subject/services/SubjectService";
import { Prisma, Subject, User, Review } from "@prisma/client";
import prisma from "../libs/__mocks__/prisma";

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
                id: createBody.id,
                teacher: {
                    create: {
                        name: "John Doe",
                        id: "teacher_id",
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

describe("getAllSummaryNormalOrder", () => {
    let findManySubjects: Subject[];

    beforeEach(() => {
        vi.resetAllMocks();

        findManySubjects = [
            {
                id: "1",
                name: "test",
                syllabus: "test",
                mode: "test",
                date: "Mon/Wed",
                time: "17:00",
                semester: 1,
                workload: 1,
                teacherId: "1",
            },
            {
                id: "2",
                name: "test",
                syllabus: "test",
                mode: "test",
                date: "Mon/Wed",
                time: "17:00",
                semester: 1,
                workload: 1,
                teacherId: "1",
            },
        ];
    });

    test("Should call findMany with select options", async () => {
        prisma.subject.findMany.mockResolvedValueOnce(findManySubjects);

        await SubjectService.getAllSummaryNormalOrder();

        expect(prisma.subject.findMany).toHaveBeenCalledWith({
            select: {
                id: true,
                name: true,
                overall_rating: true,
            },
        });
    });
    test("Should return all subjects", async () => {
        prisma.subject.findMany.mockResolvedValueOnce(findManySubjects);

        const subjects = await SubjectService.getAllSummaryNormalOrder();

        expect(subjects).toEqual(findManySubjects);
    });

    test("Should throw error if no subjects are found", async () => {
        prisma.subject.findMany.mockResolvedValueOnce();

        await expect(SubjectService.getAllSummaryNormalOrder()).rejects.toThrow("No subjects found");
    });

});

describe("getAllSummaryRatingOrderDesc", () => {
    let findManySubjects: Subject[];

    beforeEach(() => {
        vi.resetAllMocks();

        findManySubjects = [
            {
                id: "1",
                name: "test",
                syllabus: "test",
                mode: "test",
                date: "Mon/Wed",
                time: "17:00",
                semester: 1,
                workload: 1,
                teacherId: "1",
                overall_rating: 5,
            },
            {
                id: "2",
                name: "test",
                syllabus: "test",
                mode: "test",
                date: "Mon/Wed",
                time: "17:00",
                semester: 1,
                workload: 1,
                teacherId: "1",
                overall_rating: 4,
            },
        ];
    });

    test("Should call findMany with select options", async () => {
        prisma.subject.findMany.mockResolvedValueOnce(findManySubjects);

        await SubjectService.getAllSummaryRatingOrderDesc();

        expect(prisma.subject.findMany).toHaveBeenCalledWith({
            select: {
                id: true,
                name: true,
                overall_rating: true,
            },
            orderBy: {
                overall_rating: "desc",
            },
        });
    });

    test("Should return all subjects", async () => {
        prisma.subject.findMany.mockResolvedValueOnce(findManySubjects);

        const subjects = await SubjectService.getAllSummaryRatingOrderDesc();

        expect(subjects).toEqual(findManySubjects);
    });

    test("Should throw error if no subjects are found", async () => {
        prisma.subject.findMany.mockResolvedValueOnce();

        await expect(SubjectService.getAllSummaryRatingOrderDesc()).rejects.toThrow("No subjects found");
    });
});

describe("getAllSummaryRatingOrderAsc", () => {
    let findManySubjects: Subject[];

    beforeEach(() => {
        vi.resetAllMocks();

        findManySubjects = [
            {
                id: "1",
                name: "test",
                syllabus: "test",
                mode: "test",
                date: "Mon/Wed",
                time: "17:00",
                semester: 1,
                workload: 1,
                teacherId: "1",
                overall_rating: 4,
            },
            {
                id: "2",
                name: "test",
                syllabus: "test",
                mode: "test",
                date: "Mon/Wed",
                time: "17:00",
                semester: 1,
                workload: 1,
                teacherId: "1",
                overall_rating: 5,
            },
        ];
    });

    test("Should call findMany with select options", async () => {
        prisma.subject.findMany.mockResolvedValueOnce(findManySubjects);

        await SubjectService.getAllSummaryRatingOrderAsc();

        expect(prisma.subject.findMany).toHaveBeenCalledWith({
            select: {
                id: true,
                name: true,
                overall_rating: true,
            },
            orderBy: {
                overall_rating: "asc",
            },
        });
    });

    test("Should return all subjects", async () => {
        prisma.subject.findMany.mockResolvedValueOnce(findManySubjects);

        const subjects = await SubjectService.getAllSummaryRatingOrderAsc();

        expect(subjects).toEqual(findManySubjects);
    });

    test("Should throw error if no subjects are found", async () => {
        prisma.subject.findMany.mockResolvedValueOnce();

        await expect(SubjectService.getAllSummaryRatingOrderAsc()).rejects.toThrow("No subjects found");
    });
});

describe("getReviews", () => {
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

        await SubjectService.getReviews("1");

        expect(prisma.subject.findFirst).toHaveBeenCalledWith({
            where: {
                id: "1",
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
    });

    test("Should throw error if subject is not found", async () => {
        prisma.subject.findFirst.mockResolvedValueOnce(null);

        await expect(SubjectService.getReviews("1")).rejects.toThrow("Subject not found");
    });

    test("Should return all reviews", async () => {
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        const reviews = await SubjectService.getReviews("1");

        expect(reviews).toEqual(findFirstSubject.reviews);
    });
});

describe("canUserReviewSubject", () => {
    let findFirstSubject: Subject;
    let findFirstUser: User;

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

        findFirstUser = {
            id: "1",
            name: "John Doe",
            username: "johndoe",
            email: "john@prisma.io",
            course: "Computer Science",
            semester: 2,
            password: "hashedPassword"
        };
    });

    test("Should call findFirst with user id", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        await SubjectService.canUserReviewSubject("1", "1");

        expect(prisma.user.findFirst).toHaveBeenCalledWith({
            where: {
                id: "1",
            },
            select: {
                id: true,
            },
        });
    });

    test("Should throw error if user is not found", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(null);

        await expect(SubjectService.canUserReviewSubject("1", "1")).rejects.toThrow("User not found");
    });

    test("Should call findFirst with review subjectId", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        await SubjectService.canUserReviewSubject("1", "1");

        expect(prisma.review.findFirst).toHaveBeenCalledWith({
            where: {
                subject_id: "1",
                user_id: "1",
            },
        });
    });

    test("Should return true if user has not reviewed subject", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        const canReview = await SubjectService.canUserReviewSubject("1", "1");

        expect(canReview).toBe(true);
    });

    test("Should return false if user has reviewed subject", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);
        prisma.review.findFirst.mockResolvedValueOnce({
            id: "1",
            user_id: "1",
            subject_id: "1",
            test_rating: "5",
            project_rating: "5",
            teacher_rating: "5",
            effort_rating: "5",
            presence_rating: "5",
            overall_rating: 5,
            comment: "Great teacher",
        });

        const canReview = await SubjectService.canUserReviewSubject("1", "1");

        expect(canReview).toBe(false);
    });
});

describe("addReview", async () => {
    let findFirstSubject: Subject;
    let findFirstUser: User;
    let createBody: Prisma.ReviewCreateInput;

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

        findFirstUser = {
            id: "1",
            name: "John Doe",
            username: "johndoe",
            email: "john@prisma.io",
            course: "Computer Science",
            semester: 2,
            password: "hashedPassword"
        };

        createBody = {
            presence_rating: "NAO",
            teacher_rating: "RUIM",
            project_rating: "FACIL",
            test_rating: "FACIL",
            effort_rating: "POUCO",
            overall_rating: 5,
            comment: "bla bla bla",
        };

    });

    test("Should throw error if user is not found", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(null);

        await expect(SubjectService.addReview("1", "1", createBody)).rejects.toThrow("User not found");
    });

    test("Should throw error if subject is not found", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(null);

        await expect(SubjectService.addReview("1", "1", createBody)).rejects.toThrow("Subject not found");
    });

    test("Should throw error if invalid presence rating", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        createBody.presence_rating = "INVALID";

        await expect(SubjectService.addReview("1", "1", createBody)).rejects.toThrow("Invalid presence rating");
    });

    test("Should throw error if invalid teacher rating", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        createBody.teacher_rating = "INVALID";

        await expect(SubjectService.addReview("1", "1", createBody)).rejects.toThrow("Invalid teacher rating");
    });

    test("Should throw error if invalid project rating", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        createBody.project_rating = "INVALID";

        await expect(SubjectService.addReview("1", "1", createBody)).rejects.toThrow("Invalid project rating");
    });

    test("Should throw error if invalid test rating", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        createBody.test_rating = "INVALID";

        await expect(SubjectService.addReview("1", "1", createBody)).rejects.toThrow("Invalid test rating");
    });

    test("Should throw error if invalid effort rating", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        createBody.effort_rating = "INVALID";

        await expect(SubjectService.addReview("1", "1", createBody)).rejects.toThrow("Invalid effort rating");
    });

    test("Should throw error if invalid overall rating", async () => {
        prisma.user.findFirst.mockResolvedValueOnce(findFirstUser);
        prisma.subject.findFirst.mockResolvedValueOnce(findFirstSubject);

        createBody.overall_rating = 6;

        await expect(SubjectService.addReview("1", "1", createBody)).rejects.toThrow("Invalid overall rating");
    });

});