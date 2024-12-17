import { Category } from "./category"

export type Item = { 
  itemId: string, 
  name: string, 
  category: Category, 
  brand: string, 
  condition: string, 
  model: string, 
  stock: number, 
  image: string, 
  price: number
}