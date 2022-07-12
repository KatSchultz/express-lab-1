import { Request, Response } from "express";
import { items } from "../data/cart-items";
import { Item } from "../types/item-types";

class CartController {
  returnItems(req: Request, res: Response) {
    let filteredItems = items;

    if (req.query.maxPrice) {
      filteredItems = items.filter(
        (item) => item.price <= Number(req.query.maxPrice)
      );
    }

    if (req.query.prefix) {
      const prefix: string = String(req.query.prefix);
      filteredItems = filteredItems.filter((item) =>
        item.product.startsWith(prefix)
      );
    }
    if (req.query.pageSize) {
      const pageSize = Number(req.query.pageSize);
      filteredItems = filteredItems.slice(0, pageSize);
    }

    return res.status(200).json(filteredItems);
  }

  addItem(req: Request, res: Response) {
    const newItem: Item = { id: items.length, ...req.body };
    items.push(newItem);

    res.status(201).json(newItem);
  }

  checkId(req: Request, res: Response) {
    console.log(req.params.id);
    const item = items.find((item) => item.id === Number(req.params.id));

    if (!item) {
      return res.status(404).json({ eror: "ID not found" });
    }

    res.status(200).json(item);
  }

  updateItem(req: Request, res: Response) {
    const itemIndex = items.findIndex(
      (item) => item.id === Number(req.params.id)
    );
    const item: Item = items[itemIndex];
    const updatedItem: Item = { ...item, ...req.body };

    items.splice(itemIndex, 1, updatedItem);

    res.status(200).json(updatedItem);
  }

  deleteItem(req: Request, res: Response) {
    const itemIndex: number = items.findIndex(
      (item) => item.id === Number(req.params.id)
    );

    items.splice(itemIndex, 1);

    res.status(204).json();
  }
}

export const cartController: CartController = new CartController();
