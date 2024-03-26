import express, { Express } from "express";
import { errorHandler } from "../api/error";

// Controller -> define which function of the will be called for each route -> depending on the request -> dependps on the path and the method

// app.post("/:id", (req: Request, res: Response) => {
//     res.json({ message: `Ola ${req.params.id}` }).end();
// });

const app: Express = express(); // Responsable for the routes -> listen to routes I defined, uses the port to receive requests and decide what to do with them
const port = 3000;
app.use(express.json()); // Middleware to parse the body of the request -> JSON
app.use(express.urlencoded({ extended: true })); // Middleware to parse the body of the request -> URL Encoded

import { router as usersRouter } from "../api/controllers/UserController";
import { router as subjectRouter } from "../api/controllers/SubjectController";
import { router as teacherRouter } from "../api/controllers/TeacherController";
import { router as reviewRouter } from "../api/controllers/ReviewController";

app.use("/api/users", usersRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/teachers", teacherRouter);
app.use("api/reviews", reviewRouter);

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});

app.use(errorHandler);