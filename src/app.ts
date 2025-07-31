import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session";

const app = express();

// middlewares
app.use(passport.initialize());
app.use(passport.session());
app.use(
  expressSession({
    secret: "itsRedoy",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5174"],
    credentials: true,
  })
);

// routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to tour management system backend");
});

// global error handler
app.use(globalErrorHandler);

// not found route
app.use(notFound);

export default app;
