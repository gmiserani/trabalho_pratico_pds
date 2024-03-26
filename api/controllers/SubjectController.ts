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
