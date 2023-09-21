import express from "express";
import {
  createProduct,
  deleteProductById,
  editProductById,
  readProducts,
  readProductsById,
} from "./logics";
import { isProductIdValid, isProductNameValid } from "./middlewares";

const app = express();

app.use(express.json());

app.post("/products", isProductNameValid, createProduct);
app.get("/products", readProducts);
app.get("/products/:id", isProductIdValid, readProductsById);
app.patch("/products/:id", isProductIdValid, isProductNameValid, editProductById);
app.delete("/products/:id", isProductIdValid, deleteProductById);

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
