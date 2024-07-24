export interface ProductAttributes {
  id: string;
  type: string;
  brand: string;
  model: string;
  description: string;
  price: number;
  image: string;
  quantity: number;
  active: boolean;
  created_at: Date;
  updated_at: Date;
}