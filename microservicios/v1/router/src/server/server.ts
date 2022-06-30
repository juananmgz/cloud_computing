import drinksRouter from "./routes/drinks.routes";
import cracksRouter from "./routes/cracks.routes";

import express, { json } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";

dotenv.config();

const app = express();

app.use(json());

app.use(morgan("tiny"));
app.use(cors());
app.use([drinksRouter, cracksRouter]);

app.use(helmet());

export default app;
