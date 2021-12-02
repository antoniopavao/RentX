import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

import { Rental } from "../entities/Rental";

class RentalsRepository implements IRentalsRepository {
    private repository: Repository<Rental>;

    constructor() {
        this.repository = getRepository(Rental);
    }

    async findOpenRentalByCar(car_id: string): Promise<Rental> {
        throw new Error("Method not implemented.");
    }
    async findOpenRentalByUser(user_id: string): Promise<Rental> {
        throw new Error("Method not implemented.");
    }
    async create(data: ICreateRentalDTO): Promise<Rental> {
        throw new Error("Method not implemented.");
    }
}

export { RentalsRepository };
