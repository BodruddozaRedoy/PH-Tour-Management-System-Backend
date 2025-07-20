import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import httpStatus from 'http-status-codes'

const createUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const {name, email} = req.body
        const user = await User.create({
            name,
            email
        })
        res.status(httpStatus.CREATED).json({
            message: "User created successfully",
            user
        })
    } catch (error:any) {
        console.log(error)
        res.status(httpStatus.BAD_REQUEST).json({
            message: `Something went wrong!! ${error.message}`
        })
    }
}


export const UserControllers = {
    createUser
}