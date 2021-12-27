import { Request, Response } from "express";
import { container } from "tsyringe";

import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";

import { DevolutionRentalUseCase } from "./DevolutionRentalUseCase";

class DevolutionRentalController {
    async handle(request: Request, response: Response): Promise<Response> {
        const devolutionRentalUseCase = container.resolve(
            DevolutionRentalUseCase
        );

        return response.json(rental);
    }
}

export { DevolutionRentalController };
