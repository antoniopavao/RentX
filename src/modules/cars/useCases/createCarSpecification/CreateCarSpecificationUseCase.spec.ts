import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";

import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory;

describe("Create a car specification", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory =
            new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory
        );
    });

    it("should be able to create a new specification to the car", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car name test",
            description: "Description car",
            daily_rate: 100,
            license_plate: "123-5678",
            fine_amount: 60,
            brand: "Test brand",
            category_id: "test category",
        });

        const specifications_id = ["123456"];

        await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });
    });

    it("should not be able to create a new specification to a non-existent car ", async () => {
        expect(async () => {
            const car_id = "5689";
            const specifications_id = ["999666"];
            await createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
