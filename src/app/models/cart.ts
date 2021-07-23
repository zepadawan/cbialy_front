import { Item } from "./items"

export class Cart {
  items: Item[];
  resume: {
    quantity: number,
    cost: number
  }
}