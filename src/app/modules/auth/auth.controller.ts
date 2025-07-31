import httpStatus from "http-status-codes";
import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";
import AppError from "../../errorHelpers/AppError";
import { setAuthCookie } from "../../utils/setCookie";

const credentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const loginInfo = await AuthServices.credentialsLogin(req.body);
    setAuthCookie(res, loginInfo);
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged in successfully",
      data: loginInfo,
    });
  }
);


const getNewAccessToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
      throw new AppError(httpStatus.BAD_REQUEST, "No refresh token found");
    }
    const tokenInfo = await AuthServices.getNewAccessToken(refreshToken);

    setAuthCookie(res, tokenInfo)


    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "New access token fetched successfully",
      data: tokenInfo,
    });
  }
);

const logout = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    })
    
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    })


    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: "User logged out successfully",
      data: null,
    });
  }
);

export const AuthControllers = {
  credentialsLogin,
  getNewAccessToken,
  logout
};
