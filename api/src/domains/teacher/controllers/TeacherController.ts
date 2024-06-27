import { Router, Request, Response, NextFunction } from "express";
import { TeacherService } from "../../teacher/services/TeacherService";
import { statusCodes } from "../../../middlewares/error";
import { verifyJWT } from "../../../middlewares/auth";

export const router = Router();

// Create a new teacher
router.post("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
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
router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teachers = await TeacherService.getAll();
        res.status(statusCodes.SUCCESS).json(teachers).end();
    }
    catch (error) {
        next(error);
    }
},
);
