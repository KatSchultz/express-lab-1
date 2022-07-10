import express from "express";
import { items } from "../data/cart-items";
import { Item } from "../types/item-types";

export const itemRouter = express.Router();

itemRouter.get("/", (req, res) => {
  const queryParam = req.query;
  if (queryParam.hasOwnProperty("maxPrice")) {
    const queryItems = items.filter(
      (item) => item.price <= Number(queryParam.maxPrice)
    );
    console.log(queryItems);
    res.json(queryItems);
  } else {
    console.log(req.query);
    res.status(200).json(items);
  }
});

// itemRouter.get("/", (req, res) => {
//   const queryParam = req.query;
//   res.json(queryParam);
// });

itemRouter.get("/:id", (req, res) => {
  console.log(req.params.id);
  const item = items.find((item) => item.id === Number(req.params.id));

  res.status(200).json(item);
});

itemRouter.post("/", (req, res) => {
  const newItem: Item = { id: items.length, ...req.body };
  items.push(newItem);

  res.status(201).json(newItem);
});

itemRouter.put("/:id", (req, res) => {
  const itemIndex = items.findIndex(
    (item) => item.id === Number(req.params.id)
  );
  const item: Item = items[itemIndex];
  const updatedItem: Item = { ...item, ...req.body };

  items.splice(itemIndex, 1, updatedItem);

  res.status(200).json(updatedItem);
});

itemRouter.delete("/:id", (req, res) => {
  const itemIndex: number = items.findIndex(
    (item) => item.id === Number(req.params.id)
  );

  items.splice(itemIndex, 1);

  res.status(204).json();
});
