export class QueryError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "QueryError";
    }
}

export class TokenError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "TokenError";
    }
}

export class MediaTypeError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "MediaTypeError";
    }
}

export class NotAuthorizedError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "NotAuthorizedError";
    }
}

export class PermissionError extends NotAuthorizedError {
    constructor(msg: string) {
        super(msg);
        this.name = "PermissionError";
    }
}

export class InvalidParamError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "InvalidParamError";
    }
}

export const statusCodes = {
    SUCCESS: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
};

import { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export function errorHandler(error: Error, req: Request, res: Response, next: NextFunction) {
    const message = error.message;
    let status = statusCodes.INTERNAL_SERVER_ERROR;

    if (error instanceof JsonWebTokenError ||
        error instanceof NotAuthorizedError) {
        status = statusCodes.FORBIDDEN;
    }

    if (error instanceof InvalidParamError) {
        status = statusCodes.BAD_REQUEST;
    }

    if (error instanceof TokenError) {
        status = statusCodes.NOT_FOUND;
    }

    if (error instanceof QueryError) {
        status = statusCodes.BAD_REQUEST;
    }

    console.log(error);
    res.status(status).json(message);
}