import { Request, Response } from "express";
import { IUser, User } from "../model/User";
import jsSHA from "jssha";

const myRequestListener = (req: Request, res: Response) => {
  console.log("backend received a request from frontend");
  res.send("this is the response that is conveyed from backend to frontend");
};

const addNewUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, password, isInstructor } = req.body;
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

export default { myRequestListener, addNewUser };
