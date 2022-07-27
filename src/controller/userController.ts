import { Request, Response } from "express";
import { IUser, User } from "../model/User";
import jsSHA from "jssha";
import jwt from "jsonwebtoken";

const myRequestListener = (req: Request, res: Response) => {
  console.log("backend received a request from frontend");
  res.send("this is the response that is conveyed from backend to frontend");
};

const addNewUser = async (req: Request, res: Response) => {
  const {
    firstName,
    lastName,
    email,
    password,
    isInstructor,
  }: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    isInstructor: boolean;
  } = req.body;
  // hash the password ===
  const shaObj: jsSHA = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
  shaObj.update(password);
  const hashedPassword: string = shaObj.getHash("HEX");
  // ======================
  try {
    const newUser: IUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      isInstructor,
    });
    res.json({ success: true });
  } catch (e) {
    if (e instanceof Error) {
      console.log(e.message);
    } else {
      console.log("Unexpected error", e);
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const checkUser = async (req: Request, res: Response) => {
  const { email, password }: { email: string; password: string } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.json({ success: false });
      return;
    }
    // continue
    const shaObj: jsSHA = new jsSHA("SHA-512", "TEXT", { encoding: "UTF8" });
    shaObj.update(password);
    const hashedPassword: string = shaObj.getHash("HEX");

    if (user.password !== hashedPassword) {
      res.json({ success: false });
      return;
    }

    const payload = { id: user._id };
    const secret = process.env.JWT_TOKEN_KEY || ""; // to review
    const token = jwt.sign(payload, secret);
    const cookieOptions = { httpOnly: true };

    res.cookie("jwt", token, cookieOptions);
    res.json({ success: true });
  } catch (e) {
    console.log("Unexpected error", e);
  }
};

export default { myRequestListener, addNewUser, checkUser };
