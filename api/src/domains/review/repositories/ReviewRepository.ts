import { Prisma } from "@prisma/client";
import prisma from "../../../libs/prisma";

class ReviewRepositoryClass {
    // Define the fields that will be returned when a review is fetched
    selectOptions = {
        id: true,
        user: true,
        test_rating: true,
        project_rating: true,
        teacher_rating: true,
        effort_rating: true,
        presence_rating: true,
        overall_rating: true,
        comment: true,
    };

    async createReview(Reviewdata: Prisma.ReviewCreateInput) {
        const review =  await prisma.review.create({ 
            data: Reviewdata,
        });

        return review
    }
}

export const ReviewRepository = new ReviewRepositoryClass