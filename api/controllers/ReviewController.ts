import { Router, Request, Response, NextFunction } from "express";
import { ReviewService } from "../services/ReviewService";

export const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const review = await ReviewService.create(req.body);
        res.status(200).json(review).end();
    }
    catch (error) {
        next(error);
    }
},
);
