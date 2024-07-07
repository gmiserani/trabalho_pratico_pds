import { beforeEach, describe, expect, test, vi } from "vitest";
import { ReviewService } from "../domains/review/services/ReviewService";
import { Prisma } from "@prisma/client";
import prisma from "../libs/__mocks__/prisma";

vi.mock("../libs/prisma.ts");

const selectOptions = {
    id: true,
    user: true,
    test_rating: true,
    project_rating: true,
    teacher_rating: true,
    effort_rating: true,
    pesence_rating: true,
    overall_rating: true,
    comment: true,
};

describe("create", () => {
    let createBody: Prisma.ReviewCreateInput;
    let createBodyError: Prisma.ReviewCreateWithoutUserInput;

    beforeEach(() => {
        vi.resetAllMocks();

        createBody = {
            user: {
                connect: {
                    id: "1",
                },
            },
            test_rating: "5",
            project_rating: "5",
            teacher_rating: "5",
            effort_rating: "5",
            overall_rating: 5,
            comment: "Great teacher",
        };

        createBodyError = {
            test_rating: "5",
            project_rating: "5",
            teacher_rating: "5",
            effort_rating: "5",
            overall_rating: 5,
            comment: "Great teacher",
        };
    });

    test("Should create a new review", async () => {
        await ReviewService.create(createBody);

        expect(prisma.review.create).toHaveBeenCalledWith({ data: createBody });
    });

    test("Should throw an error if user does not exist", async () => {
        await expect(ReviewService.create(createBodyError)).rejects.toThrow("Error creating review");
    });
});