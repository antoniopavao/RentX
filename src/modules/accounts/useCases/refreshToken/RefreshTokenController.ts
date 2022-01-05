import { Request, Response } from "express";
import { container } from "tsyringe";

class RefreshTokenController {
    async handle(request: Request, response: Response): Promise<Response> {
        return undefined;
    }
}

export { RefreshTokenController };
