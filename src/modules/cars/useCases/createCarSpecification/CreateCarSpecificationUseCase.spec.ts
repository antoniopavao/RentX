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

        const specification = await specificationsRepositoryInMemory.create({
            name: "Specification test",
            description: "Description specification",
        });

        const specifications_id = [specification.id];

        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id: car.id,
            specifications_id,
        });

        expect(specificationsCars).toHaveProperty("specifications");
        expect(specificationsCars.specifications.length).toBe(1);
    });

    it("should not be able to add a new specification to a now-existent car", async () => {
        const car_id = "1234";
        const specifications_id = ["54321"];

        await expect(
            createCarSpecificationUseCase.execute({
                car_id,
                specifications_id,
            })
        ).rejects.toEqual(new AppError("Car does not exists!"));
    });
});
