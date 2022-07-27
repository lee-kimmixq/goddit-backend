import { Request, Response } from "express";

const myRequestListener = (req: Request, res: Response) => {
  console.log("backend received a request from frontend");
  res.send("this is the response that is conveyed from backend to frontend");
};

export default { myRequestListener };
