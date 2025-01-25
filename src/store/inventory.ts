"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { Category, type Item } from "@/types/inventory"

interface InventoryState {
  items: Item[]
  addItem: (item: Omit<Item, "id" | "createdAt">) => void
  deleteItem: (id: string) => void
  updateItem: (id: string, item: Partial<Item>) => void
  selectedItems: string[]
  toggleItemSelection: (id: string) => void
  clearSelection: () => void
}

const initialItems: Item[] = [
  // Sports Items
  {
    id: "1",
    name: "Basketball",
    description: "Official size basketball",
    quantity: 15,
    category: "sports",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Tennis Racket",
    description: "Professional tennis racket",
    quantity: 8,
    category: "sports",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Soccer Ball",
    description: "Size 5 soccer ball",
    quantity: 20,
    category: "sports",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "Boxing Gloves",
    description: "12oz boxing gloves",
    quantity: 5,
    category: "sports",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "Yoga Mat",
    description: "Non-slip yoga mat",
    quantity: 12,
    category: "sports",
    createdAt: new Date().toISOString(),
  },
  // Clothes Items
  {
    id: "6",
    name: "T-Shirt",
    description: "Cotton crew neck t-shirt",
    quantity: 50,
    category: "clothes",
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    name: "Jeans",
    description: "Classic blue denim jeans",
    quantity: 30,
    category: "clothes",
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    name: "Hoodie",
    description: "Pullover hoodie sweatshirt",
    quantity: 7,
    category: "clothes",
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    name: "Dress",
    description: "Summer floral dress",
    quantity: 15,
    category: "clothes",
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    name: "Jacket",
    description: "Waterproof windbreaker",
    quantity: 9,
    category: "clothes",
    createdAt: new Date().toISOString(),
  },
  // Watches Items
  {
    id: "11",
    name: "Chronograph Watch",
    description: "Stainless steel chronograph",
    quantity: 6,
    category: "watches",
    createdAt: new Date().toISOString(),
  },
  {
    id: "12",
    name: "Smart Watch",
    description: "Fitness tracking smartwatch",
    quantity: 25,
    category: "watches",
    createdAt: new Date().toISOString(),
  },
  {
    id: "13",
    name: "Dress Watch",
    description: "Classic leather strap watch",
    quantity: 4,
    category: "watches",
    createdAt: new Date().toISOString(),
  },
  {
    id: "14",
    name: "Digital Watch",
    description: "Sports digital watch",
    quantity: 18,
    category: "watches",
    createdAt: new Date().toISOString(),
  },
  {
    id: "15",
    name: "Luxury Watch",
    description: "Premium gold-plated watch",
    quantity: 3,
    category: "watches",
    createdAt: new Date().toISOString(),
  },
  // Mobile Items
  {
    id: "16",
    name: "Smartphone X",
    description: '6.7" flagship smartphone',
    quantity: 12,
    category: "mobiles",
    createdAt: new Date().toISOString(),
  },
  {
    id: "17",
    name: "Budget Phone",
    description: "Affordable Android phone",
    quantity: 35,
    category: "mobiles",
    createdAt: new Date().toISOString(),
  },
  {
    id: "18",
    name: "Flip Phone",
    description: "Foldable smartphone",
    quantity: 8,
    category: "mobiles",
    createdAt: new Date().toISOString(),
  },
  {
    id: "19",
    name: "Basic Phone",
    description: "Simple feature phone",
    quantity: 40,
    category: "mobiles",
    createdAt: new Date().toISOString(),
  },
  {
    id: "20",
    name: "Tablet Pro",
    description: '12.9" premium tablet',
    quantity: 5,
    category: "mobiles",
    createdAt: new Date().toISOString(),
  },
]

export const useInventoryStore = create<InventoryState>()(
  persist(
    (set) => ({
      items: initialItems,
      selectedItems: [],
      addItem: (item) =>
        set((state) => ({
          items: [
            ...state.items,
            {
              ...item,
              id: Math.random().toString(36).substr(2, 9),
              createdAt: new Date().toISOString(),
            },
          ],
        })),
      deleteItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
          selectedItems: state.selectedItems.filter((itemId) => itemId !== id),
        })),
      updateItem: (id, updatedItem) =>
        set((state) => ({
          items: state.items.map((item) => (item.id === id ? { ...item, ...updatedItem } : item)),
        })),
      toggleItemSelection: (id) =>
        set((state) => ({
          selectedItems: state.selectedItems.includes(id)
            ? state.selectedItems.filter((itemId) => itemId !== id)
            : [...state.selectedItems, id],
        })),
      clearSelection: () => set({ selectedItems: [] }),
    }),
    {
      name: "inventory-storage",
    },
  ),
)

