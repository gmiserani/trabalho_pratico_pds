import { JwtPayload, sign, verify } from "jsonwebtoken";
import { compare } from "bcrypt";
import { PermissionError, statusCodes } from "../src/error";
import { Request, Response, NextFunction } from "express";
import prisma from "../src/prisma_main";

export function getEnv(name: string): string {
    const value = process.env[name];
    if (!value) {
        throw new Error(`Faltando: process.env['${name}'].`);
    }
    return value;
}

export function generateJWT(userId: string, res: Response) {
    const body = {
        id: userId,
    };
    const token = sign({ user: body }, getEnv("SECRET_KEY"), { expiresIn: getEnv("JWT_EXPIRATION") });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
}

function cookieExtractor(req: Request) {
    let token = null;

    if (req && req.cookies) {
        token = req.cookies["jwt"];
    }

    return token;
}

export async function loginMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email,
            },
        });

        if (!user) {
            throw new PermissionError("Invalid e-mail and/or password.");
        }

        const matchingPassword = await compare(req.body.password, user.password);
        if (!matchingPassword) {
            throw new PermissionError("Invalid e-mail and/or password.");
        }

        generateJWT(user.id, res);

        res.status(statusCodes.NO_CONTENT).end();
    } catch (error) {
        next(error);
    }
}

export function notLoggedIn(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);
        console.log(token);

        if (token) {
            const decoded = verify(token, getEnv("SECRET_KEY"));
            if (decoded) {
                throw new PermissionError("You are already logged in.");
            }
        }
        next();
    } catch (error) {
        next(error);
    }
}

export function loggedIn(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);
        if (!token) {
            return false;
        }
        else {
            return true;
        }

    } catch (error) {
        next(error);
    }
}

export function verifyJWT(req: Request, res: Response, next: NextFunction) {
    try {
        const token = cookieExtractor(req);
        if (token) {
            const decoded = verify(token, getEnv("SECRET_KEY")) as JwtPayload;
            req.userId = decoded.user.id;
        }

        if (!req.userId) {
            throw new PermissionError(
                "You need to be logged in to access this resource.");
        }
        next();
    } catch (error) {
        next(error);
    }
}