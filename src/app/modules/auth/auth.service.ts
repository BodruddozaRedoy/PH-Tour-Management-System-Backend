import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import { User } from "../user/user.model";
import AppError from "../../errorHelpers/AppError";
import bcrypt from "bcrypt";
import {
  createNewAccessTokenWithRefreshToken,
  createUserTokens,
} from "../../utils/userTokens";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";

const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isUserExists = await User.findOne({ email });
  if (!isUserExists)
    throw new AppError(httpStatus.BAD_REQUEST, "User doesn't exists");
  const isPassMatched = await bcrypt.compare(
    password as string,
    isUserExists.password as string
  );
  if (!isPassMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password");
  }

  const userTokens = createUserTokens(isUserExists);

  const { password: pass, ...rest } = isUserExists.toObject();

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

const getNewAccessToken = async (refreshToken: string) => {
  const newAccessToken = await createNewAccessTokenWithRefreshToken(
    refreshToken
  );
  return {
    accessToken: newAccessToken,
  };
};

const resetPassword = async (
  oldPass: string,
  newPass: string,
  decodedToken: JwtPayload
) => {
  const user = await User.findById(decodedToken.userId);
  const isOldPassMatch = await bcrypt.compare(oldPass, user?.password!);
  if (!isOldPassMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old password doesn't match");
  }
  user!.password = await bcrypt.hash(newPass, Number(envVars.BCRYPT_SALT));
  user!.save();
  return true;
};

export const AuthServices = {
  credentialsLogin,
  getNewAccessToken,
  resetPassword,
};
