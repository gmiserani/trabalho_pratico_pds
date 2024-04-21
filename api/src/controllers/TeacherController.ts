import { Router, Request, Response, NextFunction } from "express";
import { TeacherService } from "../services/TeacherService";
import { statusCodes } from "../error";

export const router = Router();

// Create a new teacher
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teacher = await TeacherService.create(req.body);
        res.status(statusCodes.CREATED).json(teacher).end();
    }
    catch (error) {
        next(error);
    }
},
);

// Fetch all teachers
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teachers = await TeacherService.getAll();
        res.status(statusCodes.SUCCESS).json(teachers).end();
    }
    catch (error) {
        next(error);
    }
},
);
