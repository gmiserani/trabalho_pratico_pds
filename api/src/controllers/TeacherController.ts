import { Router, Request, Response, NextFunction } from "express";
import { TeacherService } from "../services/TeacherService";

export const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teacher = await TeacherService.create(req.body);
        res.status(200).json(teacher).end();
    }
    catch (error) {
        next(error);
    }
},
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teachers = await TeacherService.getAll();
        res.status(200).json(teachers).end();
    }
    catch (error) {
        next(error);
    }
},
);
