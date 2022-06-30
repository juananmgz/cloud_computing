import express, { json } from "express";
import drinksRouter from "./routes/drinks.routes";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(json());
app.use(drinksRouter);

export default app;
