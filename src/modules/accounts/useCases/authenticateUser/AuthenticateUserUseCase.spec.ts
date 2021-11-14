import { AppError } from "@errors/AppError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUsersDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";

import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import "dotenv/config";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;

describe("Authenticate user", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory
        );
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    });

    it("Should be able to authenticate an user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "001234343",
            email: "user@example.com",
            password: "mysenha1234545",
            name: "User test",
        };
        await createUserUseCase.execute(user);

        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty("token");
    });

    it("Should not be able to authenticate usere which does not exist", async () => {
        expect(async () => {
            await authenticateUserUseCase.execute({
                email: "false@email.com",
                password: "password",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("Should not be able to authenticate with incorrect password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "54535346345",
                email: "user@newuser.com",
                password: "mys12433424345",
                name: "User test wrong password",
            };
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrect password",
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
