import express, { Request, Response } from "express";
import { market } from "./database";

let id = 1;

export const createProduct = (req: Request, res: Response) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 365);

  const newProduct = { id, ...req.body, expirationDate };

  market.push(newProduct);

  id++;

  return res.status(201).json(newProduct);
};

export const readProducts = (req: Request, res: Response) => {
  const totalProducts: number = market.length;

  return res.status(200).json({ total: totalProducts, products: market });
};

export const readProductsById = (req: Request, res: Response) => {
  const productId: number = Number(req.params.id);
  const product = market.find((product) => product.id === productId);
  return res.status(200).json(product);
};

export const editProductById = (req: Request, res: Response) => {
  const productId: number = Number(req.params.id);
  const product = market.find((product) => product.id === productId);

  const newProduct = { ...product, ...req.body };

  const index = market.findIndex((product) => product.id === productId);

  market.splice(index, 1, newProduct);

  return res
    .status(200)
    .json({ message: "product update successfully", product: newProduct });
};

export const deleteProductById = (req: Request, res: Response) => {
  const productId: number = Number(req.params.id);
  const index = market.findIndex((product) => product.id === productId);

  market.splice(index, 1);

  return res.status(204).json();
};
