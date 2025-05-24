import { Request } from "express"
import jwt from 'jsonwebtoken';

export interface IGetUserAuthInfoRequest extends Request {
    user: string | jwt.JwtPayload
}
