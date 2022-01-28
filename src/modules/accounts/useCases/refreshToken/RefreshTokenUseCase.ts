import { verify, sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
    sub: string;
    email: string;
}

interface ITokenResponse {
    token: string;
    refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ) {}
    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(
            token,
            process.env.REFRESH_TOKEN_SECRET_KEY
        ) as IPayload;

        const user_id = sub;

        const userToken =
            await this.usersTokensRepository.findByUserIdAndRefreshToken(
                user_id,
                token
            );

        if (!userToken) {
            throw new AppError("Refresh Token does not exist!");
        }

        await this.usersTokensRepository.deleteById(userToken.id);

        const refresh_token = sign(
            { email },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            {
                subject: sub,
                expiresIn: process.env.EXPIRES_REFRESH_TOKEN_TIME,
            }
        );
        const expires_date = this.dateProvider.addDays(30);

        await this.usersTokensRepository.create({
            expires_date,
            refresh_token,
            user_id,
        });

        const newToken = sign({}, process.env.JWT_SECRET_KEY, {
            subject: user_id,
            expiresIn: process.env.EXPIRES_TOKEN_TIME,
        });

        return {
            refresh_token,
            token: newToken,
        };
    }
}

export { RefreshTokenUseCase };
