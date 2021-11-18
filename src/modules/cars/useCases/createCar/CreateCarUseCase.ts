import { inject, injectable } from "tsyringe";

import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
    name: string;
    description: string;
    daily_rate: number;
    license_plate: string;
    fine_amount: number;
    brand: string;
    category_id: string;
}

@injectable()
class CreateCarUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) {}
    async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
    }: IRequest): Promise<void> {
        const carAlreadyRegistered = await this.carsRepository.findByName(name);

        if (carAlreadyRegistered) {
            throw new AppError("Car already registered", 401);
        }
        this.carsRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            category_id,
            brand,
        });
    }
}
export { CreateCarUseCase };
