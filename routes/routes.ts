import express from "express";
import { items } from "../data/cart-items";

export const itemRouter = express.Router();

itemRouter.get("/", (req, res) => {
  res.status(200).json(items);
});
