import * as dotenv from 'dotenv';

dotenv.config();

export const DB_HOST: string = process.env.DB_HOST as string; 
export const DB_PORT: string = process.env.DB_PORT as string; 
export const DB_USERNAME: string = process.env.DB_USERNAME as string; 
export const DB_PASSWORD: string = process.env.DB_PASSWORD as string; 
export const DB_DATABASE: string = process.env.DB_DATABASE as string; 