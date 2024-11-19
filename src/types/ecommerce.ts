export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  cost: number;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: string;
  email: string;
}

export interface StoreInfo {
  total_revenue: number;
  total_profit: number;
  established_date: string;
  bank_account: string;
  admin_notes: string;
}

export type SearchResult = Product | User | StoreInfo;