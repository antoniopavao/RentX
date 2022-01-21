import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { UsersTokensRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { AppError } from "@shared/errors/AppError";

import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase";

let sendForgotPasswordMailUseCase: SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayJsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send Forgot Mail", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        dateProvider = new DayJsDateProvider();
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
        mailProvider = new MailProviderInMemory();

        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            mailProvider,
            dateProvider
        );
    });
    it("Should be able to send a forgot password mail to user", async () => {
        const sendMail = jest.spyOn(mailProvider, "sendMail");
        await usersRepositoryInMemory.create({
            driver_license: "666146",
            email: "user@example.com",
            name: "Blanche Curry",
            password: "1234",
        });
        await sendForgotPasswordMailUseCase.execute("user@example.com");

        expect(sendMail).toHaveBeenCalled();
    });

    it("Should not be able to send a forgot password mail if user does not exists", async () => {
        await expect(
            sendForgotPasswordMailUseCase.execute("idontexist@gmail.com")
        ).rejects.toEqual(new AppError("User does not exists!"));
    });
    it("Should be able to create an users token", async () => {
        const generateTokenMail = jest.spyOn(
            usersTokensRepositoryInMemory,
            "create"
        );

        await usersRepositoryInMemory.create({
            driver_license: "91238129",
            email: "user2@example.com",
            name: "Weed Nilson",
            password: "1234",
        });

        await sendForgotPasswordMailUseCase.execute("user2@example.com");

        expect(generateTokenMail).toBeCalled();
    });
});
