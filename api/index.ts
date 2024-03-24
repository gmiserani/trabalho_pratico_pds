
import express, { Express, Request, Response } from "express";
const app: Express = express();
const port = 3000;

app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello World!" }).end();
});

app.post("/:id", (req: Request, res: Response) => {
    res.json({ message: `Ola ${req.params.id}` }).end();
});


app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}`);
});
