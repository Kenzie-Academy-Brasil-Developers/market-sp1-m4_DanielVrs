import { NextFunction, Request, Response } from "express";
import { market } from "./database";

export const isProductIdValid = (req: Request, res: Response, next: NextFunction) => {
  const productId: number = Number(req.params.id);
  if (!market.some((product) => product.id === productId)) {
    return res.status(404).json({ message: "Product not found." });
  }
  next();
};

export const isProductNameValid = (req: Request, res: Response, next: NextFunction) => {
  if (market.some((product) => product.name === req.body.name)) {
    return res.status(409).json({ message: "Product already registered." });
  }
  next();
};
