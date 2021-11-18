import { getRepository, Repository } from "typeorm";

import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";

import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create(data: ICreateCarDTO): Promise<void> {
        const car = this.repository.create(data);
        await this.repository.save(car);
    }

    async findCarByName(name: string): Promise<Car> {
        const car = await this.repository.findOne({ name });
        return car;
    }
}
export { CarsRepository };
