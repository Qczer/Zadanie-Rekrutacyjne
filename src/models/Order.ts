import type { OrderItem } from "./OrderItem";

export interface Order {
  id: number;
  createdAt: string; // Keep as string for easy parsing from JSON
  items: OrderItem[];
  totalAmount: number;
}