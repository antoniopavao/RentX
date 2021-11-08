import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

describe("Create a new category", () => {
    it("Should create a new category", () => {
        const createCategory = new CreateCategoryUseCase();
        return createCategory;
    });
});
