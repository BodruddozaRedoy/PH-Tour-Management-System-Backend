import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  JWT_SECRET: string;
  JWT_EXPIRES: string;
  BCRYPT_SALT: string;
  SUPER_ADMIN_EMAIL: string;
  SUPER_ADMIN_PASSWORD: string;
  JWT_REFRESH_SECRET:string;
  JWT_REFRESH_EXPIRES: string
  FRONTEND_URL:string;
  EXPRESS_SESSION_SECRET:string;
  GOOGLE_CALLBACK_URL:string;
  GOOGLE_CLIENT_ID:string
  GOOGLE_CLIENT_SECRET:string
  
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_SECRET",
    "JWT_EXPIRES",
    "BCRYPT_SALT",
    "SUPER_ADMIN_EMAIL",
    "SUPER_ADMIN_PASSWORD",
    "JWT_REFRESH_EXPIRES",
    "JWT_REFRESH_SECRET",
    "FRONTEND_URL",
    "EXPRESS_SESSION_SECRET",
    "GOOGLE_CALLBACK_URL",
    "GOOGLE_CLIENT_ID",
    "GOOGLE_CLIENT_SECRET"
  ];
  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });
  return {
    PORT: process.env.PORT!,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES: process.env.JWT_EXPIRES!,
    BCRYPT_SALT: process.env.BCRYPT_SALT!,
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL!,
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD!,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES!,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET!,
    FRONTEND_URL:process.env.FRONTEND_URL!,
    EXPRESS_SESSION_SECRET:process.env.EXPRESS_SESSION_SECRET!,
    GOOGLE_CALLBACK_URL:process.env.GOOGLE_CALLBACK_URL!,
    GOOGLE_CLIENT_ID:process.env.GOOGLE_CLIENT_ID!,
    GOOGLE_CLIENT_SECRET:process.env.GOOGLE_CLIENT_SECRET!
  };
};

export const envVars: EnvConfig = loadEnvVariables();
