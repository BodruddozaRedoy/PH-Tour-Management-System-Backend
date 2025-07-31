import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../errorHelpers/AppError";
import { verifyToken } from "../utils/jwt";
import { envVars } from "../config/env";
import { User } from "../modules/user/user.model";
import { IsActive } from "../modules/user/user.interface";

/**
 * Middleware to check if a user is authenticated and authorized based on roles.
 *
 * @param authRoles - Array of roles allowed to access the route (e.g., ['admin', 'user'])
 */
export const checkAuth =
  (...authRoles: string[]) =>
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        // Get token from Authorization header
        const accessToken = req.headers.authorization;

        // If no token is found, throw a forbidden error
        if (!accessToken)
          throw new AppError(httpStatus.FORBIDDEN, "No token found");

        // Verify the token using the secret key
        const verifiedToken = verifyToken(
          accessToken,
          envVars.JWT_SECRET
        ) as JwtPayload;

        const isUserExists = await User.findOne({
          email: verifiedToken.email,
        });

        if (!isUserExists)
          throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exists");

        if (
          isUserExists.isActive === IsActive.BLOCKED ||
          isUserExists.isActive === IsActive.INACTIVE
        )
          throw new AppError(
            httpStatus.BAD_REQUEST,
            "User is ",
            isUserExists.isActive
          );

        if (isUserExists.isDeleted)
          throw new AppError(httpStatus.BAD_REQUEST, "User is deleted");

        // Optional: Log token payload for debugging
        console.log(verifiedToken);

        // Check if the user's role is authorized for this route
        if (!authRoles.includes(verifiedToken.role)) {
          throw new AppError(httpStatus.FORBIDDEN, "Permission denied");
        }

        // Attach the verified user info to the request object
        req.user = verifiedToken;

        // Proceed to the next middleware or route handler
        next();
      } catch (error) {
        // If there's any error (invalid token, role mismatch, etc.), pass it to error handler
        next(error);
      }
    };
