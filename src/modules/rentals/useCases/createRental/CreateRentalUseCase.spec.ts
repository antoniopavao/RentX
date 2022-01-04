import dayjs from "dayjs";

import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { DayJsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayJsDateProvider";
import { AppError } from "@shared/errors/AppError";

import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let dayJsDateProvider: DayJsDateProvider;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe("Create Rental", () => {
    const dayAdd24H = dayjs().add(1, "day").toDate();

    beforeEach(() => {
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayJsDateProvider = new DayJsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory();

        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayJsDateProvider,
            carsRepositoryInMemory
        );
    });

    it("Should be able to create a new rental", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Test car",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "Car testy",
        });
        const rental = await createRentalUseCase.execute({
            user_id: "1234",
            car_id: car.id,
            expected_return_date: dayAdd24H,
        });

        expect(rental).toHaveProperty("id");
        expect(rental).toHaveProperty("start_date");
    });

    it("Should not be able to create a new rental if there is another open rental to the same user", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Test 2",
            description: "Test car",
            daily_rate: 100,
            license_plate: "test-222",
            fine_amount: 40,
            category_id: "1234567",
            brand: "Car testy 2",
        });
        await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24H,
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "Second car",
                expected_return_date: dayAdd24H,
            })
        ).rejects.toEqual(
            new AppError("There is a rental in progress for the user")
        );
    });

    it(" should not be able to create a new rental if there is another open to the same car ", async () => {
        await rentalsRepositoryInMemory.create({
            car_id: "test",
            expected_return_date: dayAdd24H,
            user_id: "12345",
        });

        await expect(
            createRentalUseCase.execute({
                user_id: "321",
                car_id: "test",
                expected_return_date: dayAdd24H,
            })
        ).rejects.toEqual(new AppError("Car is not available"));
    });

    it("Should not be able to create a new rental with invalid return time", async () => {
        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "test",
                expected_return_date: dayjs().toDate(),
            })
        ).rejects.toEqual(new AppError("Invalid minimum rental time"));
    });
});
