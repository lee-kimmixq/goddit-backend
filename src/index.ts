import express, { Express } from "express";
import mongoose from "mongoose";
import passport from "passport";
import dotenv from "dotenv";
import userController from "./controller/userController";

dotenv.config();

mongoose.connect("mongodb://localhost/goddit");

const app: Express = express();

app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());

app.get("/", userController.myRequestListener);
app.post("/signup", userController.addNewUser);
app.post("/login", userController.checkUser);

app.listen(3004);
