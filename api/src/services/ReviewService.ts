// Service class for the Review entity. Here we define the methods that will be used in the ReviewController

import prisma from "../prisma_main";
import { Prisma } from "@prisma/client";
import { QueryError } from "../../src/error";

class ReviewServiceClass {

    // Define the fields that will be returned when a review is fetched
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

    // Create a new review
    async create(data: Prisma.ReviewCreateInput) {
        try {
            return await prisma.review.create({ data });
        } catch (error) {
            throw new QueryError("Error creating review");
        }
    }

}

// Export the service
export const ReviewService = new ReviewServiceClass();
