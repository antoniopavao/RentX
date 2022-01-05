import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";

import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    email: string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    };
    refreshToken: string;
    token: string;
}

@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayJsDateProvider")
        private dateProvider: IDateProvider
    ) {}
    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError("User does not exist");
        }

        const passwordMatch = await compare(password, user.password);

        if (!passwordMatch) {
            throw new AppError("Wrong email or password", 400);
        }

        const token = sign({}, process.env.JWT_SECRET_KEY, {
            subject: user.id,
            expiresIn: process.env.EXPIRES_TOKEN_TIME,
        });

        const refreshToken = sign(
            { email },
            process.env.REFRESH_TOKEN_SECRET_KEY,
            {
                subject: user.id,
                expiresIn: process.env.EXPIRES_REFRESH_TOKEN_TIME,
            }
        );

        const refreshTokenExpiresDate = this.dateProvider.addDays(30);

        await this.usersTokensRepository.create({
            expires_date: refreshTokenExpiresDate,
            user_id: user.id,
            refresh_token: refreshToken,
        });

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email,
            },
            refreshToken,
        };

        return tokenReturn;
    }
}
export { AuthenticateUserUseCase };
