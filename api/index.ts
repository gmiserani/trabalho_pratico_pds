import express, { Express } from "express";
import dotenv from "dotenv";
import cors, { CorsOptions } from "cors";
import { errorHandler } from "./src/error";
import cookieParser from "cookie-parser";

dotenv.config(); // Load the environment variables from the .env file

// Express will be responsable for the routes -> listen to routes I define, uses the port to receive requests and decide what to do with them

export function getEnv(name: string): string {
    const value = process.env[name];

    if (!value) {
        throw new Error(`Faltando: process.env['${name}'].`);
    }

    return value;
}

const app: Express = express();
const port = 3000;
const options: CorsOptions = {
    origin: [getEnv("APP_URL_ADDRESS"), getEnv("APP_URL_LOCALHOST")],
    credentials: true
};
app.use(cors(options));

// Middleware to parse the body of the request 
app.use(express.json()); // JSON
app.use(express.urlencoded({ extended: true })); // URL Encoded



app.use(cookieParser());

// Controllers -> define which method will be called for each route depending on the request -> dependps on the path and the method
import { router as usersRouter } from "./src/domains/user/controllers/UserController"; // Import the router from the UserController
import { router as subjectRouter } from "./src/controllers/SubjectController"; // Import the router from the SubjectController
import { router as teacherRouter } from "./src/domains/teacher/controllers/TeacherController"; // Import the router from the TeacherController
import { router as reviewRouter } from "./src/controllers/ReviewController"; // Import the router from the ReviewController

// Defining the routes -> the path and the method
app.use("/api/users", usersRouter); // When the path of the request is /api/users-> use the usersRouter
app.use("/api/subject", subjectRouter); // When the path of the request is /api/subject-> use the subjectRouter
app.use("/api/teachers", teacherRouter); // When the path of the request is /api/teachers-> use the teacherRouter
app.use("/api/reviews", reviewRouter); // When the path of the request is /api/reviews-> use the reviewRouter

// Error handler -> if an error is thrown, it will be handled here
app.use(errorHandler);

// Start the server -> listen to the port
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

