import express, { json } from "express";
import cracksRouter from "./routes/cracks.routes";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";

dotenv.config();

const app = express();

app.use(morgan("tiny"));
app.use(helmet());
app.use(json());
app.use(cracksRouter);

export default app;
