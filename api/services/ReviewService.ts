import prisma from "../../api/prisma_main";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../api/error";

class ReviewServiceClass {
    selectOptions = {
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

    async create(data: Prisma.ReviewCreateInput) {
        try {
            return await prisma.review.create({ data });
        } catch (error) {
            throw new QueryError("Error creating review");
        }
    }

    async getAll() {

    }
}

export const ReviewService = new ReviewServiceClass();
