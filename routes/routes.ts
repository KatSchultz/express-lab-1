import express from "express";
import { cartController } from "../controllers/controllers";

export const itemRouter = express.Router();
itemRouter
  .route("/")
  .get(cartController.returnItems)
  .post(cartController.addItem);

itemRouter
  .route("/:id")
  .get(cartController.checkId)
  .put(cartController.updateItem)
  .delete(cartController.deleteItem);
