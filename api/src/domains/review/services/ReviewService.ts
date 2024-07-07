// Service class for the Review entity. Here we define the methods that will be used in the ReviewController

import { Prisma, SubjectCreateNestedOneWithoutReviewsInput, UserCreateNestedOneWithoutReviewInput } from "@prisma/client";
import { QueryError } from "../../../middlewares/error";
import { ReviewRepository } from "../repositories/ReviewRepository";

class ReviewServiceClass {

    // Create a new review
    async create(data: { id: string; user: UserCreateNestedOneWithoutReviewInput; test_rating: string; project_rating: string; teacher_rating: string; effort_rating: string; overall_rating: number; comment: string; presence_rating: string; subject: SubjectCreateNestedOneWithoutReviewsInput }) {
        try {
            return await ReviewRepository.createReview({ ...data });
        } catch (error) {
            throw new QueryError("Error creating review");
        }
    }

}

// Export the service
export const ReviewService = new ReviewServiceClass();
