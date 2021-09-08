import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const app = express();

app.use(express.json());

app.use("/categories", categoriesRoutes);

const port = 3333;

app.listen(port, () => console.log("Server is running"));

// Tabela para carros, todo carro tera uma categoria, fotos, especificacoes
// Relacionamento de muitos para muitos
