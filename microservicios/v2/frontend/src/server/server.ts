import express from "express";
import frontRouter from "./routes/front.routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.set("view engine", "ejs");

app.use(frontRouter);

export default app;
