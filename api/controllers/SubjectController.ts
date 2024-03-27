import { Router, Request, Response, NextFunction } from "express";
import { SubjectService } from "../services/SubjectService";

export const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await SubjectService.create(req.body.teacher_name, req.body);
        res.status(200).json(subject).end();
    }
    catch (error) {
        next(error);
    }
},
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subjects = await SubjectService.getAll();
        res.status(200).json(subjects).end();
    }
    catch (error) {
        next(error);
    }
},
);

router.get("/:id/reviews", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const reviews = await SubjectService.getReviews(req.params.id);
        res.status(200).json(reviews).end();
    }
    catch (error) {
        next(error);
    }
},
);

router.post("/:id/reviews", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const subject = await SubjectService.addReview(req.params.id, req.body.user_name, req.body);
        res.status(200).json(subject).json(subject).end();
    }
    catch (error) {
        next(error);
    }
},
);
