import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { statusCodes } from "../error";
import { loginMiddleware, verifyJWT, notLoggedIn } from "../auth";

export const router = Router();

router.post("/login", notLoggedIn, loginMiddleware);

router.post("/logout", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.clearCookie("jwt", { sameSite: "none", secure: true });
        res.status(statusCodes.SUCCESS).end();
    } catch (error) {
        next(error);
    }
},
);


// Create a new user
router.post("/", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await UserService.create(req.body);
        res.status(statusCodes.CREATED).end();
    }
    catch (error) {
        next(error);
    }
},
);

// Fetch all users
router.get("/", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await UserService.getAll();
        res.status(statusCodes.SUCCESS).json(users).end();
    }
    catch (error) {
        next(error);
    }
},
);

// Fetch the current user info
router.get("/myProfile", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.userId) {
            throw new Error("User not found");
        }
        const user = await UserService.getById(req.userId);
        res.status(statusCodes.SUCCESS).json(user).end();
    }
    catch (error) {
        next(error);
    }
},
);