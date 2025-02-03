import { Registration } from "../models/registration";

export interface IAuthService {
    vallidateUserPassword(userPassword: string): boolean;
    addUser(userData: Registration): boolean;
}