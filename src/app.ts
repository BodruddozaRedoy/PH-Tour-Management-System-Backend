import  httpStatus  from 'http-status-codes';
import express, { Request, Response } from "express";
import cors from 'cors'
import { router } from "./app/routes";
import { envVars } from "./app/config/env";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from './app/middlewares/notFound';
const app = express();

// middlewares 
app.use(express.json())
app.use(cors())

// routes 
app.use("/api/v1", router)

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to tour management system backend");
});

// global error handler 
app.use(globalErrorHandler)

// not found route
app.use(notFound)

export default app;
