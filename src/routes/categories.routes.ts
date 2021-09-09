import { Router } from "express";

import { CategoriesRepository } from "../repositories/CategoriesRepository";

const categoriesRoutes = Router();
const categoriesRepository = new CategoriesRepository();

categoriesRoutes.post("/", (request, response) => {
    const { name, description } = request.body;

    categoriesRepository.create({ name, description });

    return response.status(201).send(categoriesRepository);
});

categoriesRoutes.get("/", (request, response) => {
    const allCategories = categoriesRepository.list();

    return response.json(allCategories);
});
export { categoriesRoutes };

// Repositorios
//  -> Camada, classe responsavel por fazer toda a manipulacao de dados da app,
// acesso ao banco de dados, inserts, selects e etc
