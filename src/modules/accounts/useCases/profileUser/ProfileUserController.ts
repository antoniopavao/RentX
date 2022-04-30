import { Request, Response } from "express";
import { container } from "tsyringe";

import { ProfileUserUseCase } from "./ProfileUserUseCase";

class ProfileUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        const profileUserUseCase = container.resolve(ProfileUserUseCase);
        return null;
    }
}
export { ProfileUserController };
