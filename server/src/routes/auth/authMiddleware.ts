import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Config } from "../../config";
import { IGetUserAuthInfoRequest } from "../../@types/express";

export async function authMiddleware(expressRequest: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const req = expressRequest as IGetUserAuthInfoRequest;

        const authHeader = req.headers.authorization ?? ''
        const token = authHeader.split(' ')[1]

        const data = jwt.verify(token, Config.jwtSecret);

        req.user = data

        next();

    } catch (error) {
        res.status(401).send({ error });
    }

}
