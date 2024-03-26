import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";

export const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserService.create(req.body);
        res.status(200).json(user).end();
    }
    catch (error) {
        next(error);
    }
},
);

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
    console.log(req);
    try {
        const users = await UserService.getAll();
        res.status(200).json(users).end();
    }
    catch (error) {
        next(error);
    }
},
);