export interface Item {
    id: string
    name: string
    description: string
    quantity: number
    category: Category
    createdAt: string
  }
  
  export type Category = "sports" | "clothes" | "watches" | "mobiles" 
  
  export interface FilterState {
    categories: Category[]
  }
  
  