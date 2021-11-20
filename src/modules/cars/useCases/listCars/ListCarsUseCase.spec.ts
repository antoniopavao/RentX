import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListCarsUseCase } from "./ListCarsUseCase";

let listCarsUseCase: ListCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsUseCase = new ListCarsUseCase(carsRepositoryInMemory);
    });

    it("Should be able to list all available cars", async () => {
        const carTest = await carsRepositoryInMemory.create({
            name: "Carro teste",
            description: "Carro teste description",
            daily_rate: 90.0,
            license_plate: "AAS-0000",
            fine_amount: 900.0,
            brand: "Car Teste",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({});
        expect(cars).toEqual([carTest]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro teste 2",
            description: "Carro teste description",
            daily_rate: 90.0,
            license_plate: "AAS-1200",
            fine_amount: 900.0,
            brand: "Car Brand Teste",
            category_id: "category_id",
        });

        const cars = await listCarsUseCase.execute({
            brand: "Car Brand Teste",
        });

        expect(cars).toEqual([car]);
    });
});
