import { Types } from "mongoose";

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
  GUIDE = "GUIDE",
}

export interface IAuthProvider {
    provider: string,
    providerId: string
}

export enum isActive {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE',
    BLOCKED= 'BLOCKED'
}

export interface IUser {
  name: string;
  email: string;
  password?: string;
  phone?: number;
  picture?: string;
  address?: string;
  isDeleted?: boolean;
  isActive?: isActive;
  isVerified?: boolean;
  auths: IAuthProvider[];
  role: Role;
  bookings?: Types.ObjectId[];
  guides?: Types.ObjectId[];
}
