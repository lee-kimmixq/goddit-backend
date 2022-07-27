import express, { Express } from "express";
import mongoose from "mongoose";
import userController from "./controller/userController";

mongoose.connect("mongodb://localhost/goddit");

const app: Express = express();

app.use(express.urlencoded({ extended: false }));

app.get("/", userController.myRequestListener);
app.post("/signup", userController.addNewUser);

app.listen(3004);
