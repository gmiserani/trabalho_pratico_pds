import { Router, Request, Response, NextFunction } from "express";
import { UserService } from "../services/UserService";
import { statusCodes } from "../error";
import { loginMiddleware, verifyJWT, notLoggedIn, loggedIn, generateJWT } from "../auth";

export const router = Router();

router.get("/login", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const isLogged = loggedIn(req, res, next);
        if (isLogged) {
            res.status(statusCodes.SUCCESS).json(true).end();
        }
        else {
            res.status(statusCodes.SUCCESS).json(false).end();
        }
    } catch (error) {
        next(error);
    }
},
);

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
        const user = await UserService.create(req.body);
        generateJWT(user.id, res);
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
router.get("/my-profile", verifyJWT, async (req: Request, res: Response, next: NextFunction) => {
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