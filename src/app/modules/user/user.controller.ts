import { NextFunction, Request, Response } from "express";
import httpStatus from 'http-status-codes'
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";



// create user 
const createUser = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body)
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.CREATED,
        message: "User created successfully",
        data: user
    })
})

const getAllUsers = catchAsync(async(req: Request, res: Response, next: NextFunction) => {
    const users = await UserServices.getAllUsers()
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "All users fetched successfully",
        data: users.data,
        meta: users.meta
    })
})


export const UserControllers = {
    createUser,
    getAllUsers
}