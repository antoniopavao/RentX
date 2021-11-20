import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(
            carsRepositoryInMemory
        );
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

        const cars = await listAvailableCarsUseCase.execute({});
        expect(cars).toEqual([carTest]);
    });

    it("Should be able to list all available cars by brand", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro teste brand",
            description: "Carro teste description",
            daily_rate: 90.0,
            license_plate: "AAS-1200",
            fine_amount: 900.0,
            brand: "Car Brand Teste",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Car Brand Teste",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by name", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro teste name",
            description: "Carro teste description",
            daily_rate: 90.0,
            license_plate: "ABS-1240",
            fine_amount: 800.0,
            brand: "Car Brand Teste 2",
            category_id: "category_id",
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Carro teste name",
        });

        expect(cars).toEqual([car]);
    });

    it("Should be able to list all available cars by category", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Carro teste category",
            description: "Carro teste category",
            daily_rate: 90.0,
            license_plate: "ACS-1555",
            fine_amount: 800.0,
            brand: "Car category Teste 3",
            category_id: "Category teste name",
        });

        const cars = await listAvailableCarsUseCase.execute({
            category_id: "Carro teste name",
        });

        expect(cars).toEqual([car]);
    });
});
