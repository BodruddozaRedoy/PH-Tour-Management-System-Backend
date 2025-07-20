import express, { NextFunction, Request, Response } from "express";
import { UserRoutes } from "./app/modules/user/user.routes";
import cors from 'cors'
import { router } from "./app/routes";
import { envVars } from "./app/config/env";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
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

export default app;
