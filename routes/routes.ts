import express from "express";
import { items } from "../data/cart-items";
import { Item } from "../types/item-types";

export const itemRouter = express.Router();

itemRouter.get("/", (req, res) => {
  if (req.query.maxPrice && req.query.prefix && req.query.pageSize) {
    const priceFilteredItems = items.filter(
      (item) => item.price <= Number(req.query.maxPrice)
    );

    const pageSize = Number(req.query.pageSize);
    const pageSizeItems: Item[] = [];
    for (let i = 0; i < pageSize; i++) {
      pageSizeItems.push(priceFilteredItems[i]);
    }

    const prefix: string = String(req.query.prefix);
    const tripleFilteredItems = pageSizeItems.filter((item) =>
      item.product.startsWith(prefix)
    );
    console.log("triple filtered");

    return res.status(200).json(tripleFilteredItems);
  }

  if (req.query.maxPrice) {
    const queryItems = items.filter(
      (item) => item.price <= Number(req.query.maxPrice)
    );
    return res.json(queryItems);
  } else if (req.query.prefix) {
    const prefix: string = String(req.query.prefix);
    const queryItems = items.filter((item) => item.product.startsWith(prefix));
    return res.status(200).json(queryItems);
  } else if (req.query.pageSize) {
    const pageSize = Number(req.query.pageSize);
    const queryItems: Item[] = [];
    for (let i = 0; i < pageSize; i++) {
      queryItems.push(items[i]);
    }
    return res.status(200).json(queryItems);
  }

  return res.status(200).json(items);
});

itemRouter.get("/:id", (req, res) => {
  console.log(req.params.id);
  const item = items.find((item) => item.id === Number(req.params.id));

  if (!item) {
    return res.status(404).json({ eror: "ID not found" });
  }

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
