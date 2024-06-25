// When a request is made to /api/reviews, the ReviewController will be called

import { Router, Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/ReviewService";
import { statusCodes } from "../../../error";
import { verifyJWT } from "../../../auth";

// Create a new router
export const router = Router();

// Create a new review
router.post("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await ReviewService.create(req.body);
        res.status(statusCodes.SUCCESS).json(review).end();
    }
    catch (error) {
        next(error);
    }
},
);
