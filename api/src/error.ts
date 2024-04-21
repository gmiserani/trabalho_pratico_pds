import { JsonWebTokenError } from "jsonwebtoken";
import { Request, Response } from "express";

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

// This error will be thrown when a query is invalid
export class QueryError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "QueryError";
    }
}

// This error will be thrown when the token is invalid
export class TokenError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "TokenError";
    }
}

// This error will be thrown when the media type is not supported
export class MediaTypeError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "MediaTypeError";
    }
}

// This error will be thrown when the user is not authenticated
export class NotAuthorizedError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "NotAuthorizedError";
    }
}

// This error will be thrown when the user does not have permission to access a resource
export class PermissionError extends NotAuthorizedError {
    constructor(msg: string) {
        super(msg);
        this.name = "PermissionError";
    }
}

// This error will be thrown when a parameter is invalid
export class InvalidParamError extends Error {
    constructor(msg: string) {
        super(msg);
        this.name = "InvalidParamError";
    }
}

// This function will be used as the error handler for the Express application
export function errorHandler(error: Error, req: Request, res: Response) {
    const message = error.message;
    let status = statusCodes.INTERNAL_SERVER_ERROR;

    // When the error is an instance of JsonWebTokenError or NotAuthorizedError, the status code will be 403
    if (error instanceof JsonWebTokenError ||
        error instanceof NotAuthorizedError) {
        status = statusCodes.FORBIDDEN;
    }

    // When the error is an instance of InvalidParamError, the status code will be 400
    if (error instanceof InvalidParamError) {
        status = statusCodes.BAD_REQUEST;
    }

    // When the error is an instance of TokenError, the status code will be 404
    if (error instanceof TokenError) {
        status = statusCodes.NOT_FOUND;
    }

    // When the error is an instance of QueryError, the status code will be 400
    if (error instanceof QueryError) {
        status = statusCodes.BAD_REQUEST;
    }

    console.log(error);
    res.status(status).json(message);
}