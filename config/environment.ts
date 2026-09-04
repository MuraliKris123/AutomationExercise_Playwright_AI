import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export interface EnvironmentConfig {
  baseURL: string;
  testUserEmail?: string;
  testUserPassword?: string;
}

export const environment: EnvironmentConfig = {
  baseURL: process.env.BASE_URL ?? 'https://automationexercise.com',
  testUserEmail: process.env.TEST_USER_EMAIL,
  testUserPassword: process.env.TEST_USER_PASSWORD,
};
