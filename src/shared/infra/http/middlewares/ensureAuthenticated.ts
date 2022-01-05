import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

import { AppError } from "../../../errors/AppError";

interface IPayload {
    sub: string;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export async function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction
) {
    const authHeader = request.headers.authorization;
    const userTokensRepository = new UsersTokensRepository();

    if (!authHeader) {
        throw new AppError("Token missing", 401);
    }
    const [, token] = authHeader.split(" ");

    try {
        const { sub: user_id } = verify(
            token,
            process.env.REFRESH_TOKEN_SECRET_KEY
        ) as IPayload;

        const user = await userTokensRepository.findByUserIdAndRefreshToken(
            user_id,
            token
        );

        if (!user) {
            throw new AppError(`User does not exists`, 404);
        }
        request.user = {
            id: user_id,
        };
        next();
    } catch {
        throw new AppError("Invalid token", 401);
    }
}
