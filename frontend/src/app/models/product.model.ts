export interface Product {
  _id?: string;
  name: string;
  brand: string;
  category: string;
  features: string[];
  price: number;
  image: string;
  stock?: number;
}
