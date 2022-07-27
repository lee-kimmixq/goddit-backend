import express, { Express, Request, Response } from "express";

const app: Express = express();

app.use(express.urlencoded({ extended: false }));

const myRequestListener = (req: Request, res: Response) => {
  console.log("backend received a request from frontend");
  res.send("this is the response that is conveyed from backend to frontend");
};

app.get("/", myRequestListener);

app.listen(3004);
