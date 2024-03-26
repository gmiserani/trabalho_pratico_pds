import prisma from "../../api/prisma_main";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../api/error";

class ReviewServiceClass {
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
