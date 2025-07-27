import  httpStatus  from 'http-status-codes';
import AppError from "../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import bcrypt from 'bcrypt'


const createUser = async(payload: Partial<IUser>) => {
    const {email, password, ...rest} = payload
    const isUserExists = await User.findOne({email})
    if(isUserExists) throw new AppError(httpStatus.BAD_REQUEST, "User already exists")

    const hashedPass = await bcrypt.hash(password!, 10)

    const authProvider: IAuthProvider = {
        provider: "credentials",
        providerId: email!
    }

    const user = await User.create({
        email,
        password:hashedPass,
        auths: [authProvider],
        ...rest
    })
    return user
}

const getAllUsers = async () => {
    const users = await User.find()
    const totalUsers = await User.countDocuments()
    return {
        data: users,
        meta: {
            total: totalUsers
        }
    }
}


export const UserServices = {
    createUser,
    getAllUsers
}