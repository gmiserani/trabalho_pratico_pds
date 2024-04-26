// When a request is made to /api/reviews, the ReviewController will be called

import { Router, Request, Response, NextFunction } from "express";
import { SubjectService } from "../services/SubjectService";
import { statusCodes } from "../error";
import { verifyJWT } from "../auth";

// Create a new router
export const router = Router();

// Create a new subject
router.post("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await SubjectService.create(req.body.teacher_name, req.body);
        res.status(statusCodes.CREATED).json(subject).end();
    }
    catch (error) {
        next(error);
    }
},
);

// Fetch all subjects and returns its id, name and overall rating but ordered by rating
router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        let subjects;
        const order = req.query.order;
        if (order === "asc") {
            subjects = await SubjectService.getAllSummaryRatingOrderAsc();
        } else if (order === "desc") {
            subjects = await SubjectService.getAllSummaryRatingOrderDesc();
        }
        else {
            subjects = await SubjectService.getAllSummaryNormalOrder();
        }
        res.status(statusCodes.SUCCESS).json(subjects).end();
    }
    catch (error) {
        next(error);
    }
}
);

// Fetch a subject by id and returns its basic content
router.get("/:id", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await SubjectService.getById(req.params.id);
        res.status(statusCodes.SUCCESS).json(subject).end();
    }
    catch (error) {
        next(error);
    }
},
);

// Fetch a subject by id and returns its summary
router.get("/:id/most-common-answers", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const ratings = await SubjectService.getRatings(req.params.id);
        res.status(statusCodes.SUCCESS).json(ratings).end();
    }
    catch (error) {
        next(error);
    }
}
);

// Fetch all reviews for a subject
router.get("/:id/reviews", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await SubjectService.getReviews(req.params.id);
        res.status(statusCodes.SUCCESS).json(reviews).end();
    }
    catch (error) {
        next(error);
    }
},
);

// Check if a user can add a review to a subject
router.get("/:id/check-review", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) {
            throw new Error("User ID not found.");
        }
        const canAddReview = await SubjectService.canUserReviewSubject(req.params.id, req.userId);
        res.status(statusCodes.SUCCESS).json(canAddReview).end();
    }
    catch (error) {
        next(error);
    }
}
);

// Add a review to a subject
router.post("/:id/add-review", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) {
            throw new Error("User ID not found.");
        }
        await SubjectService.addReview(req.params.id, req.userId, req.body);
        res.status(statusCodes.CREATED).end();
    }
    catch (error) {
        next(error);
    }
},
);
