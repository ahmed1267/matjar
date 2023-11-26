export enum Category {
  ACCESSORIES = 'accessories',
  HOME = 'home',
  GYM = 'gym',
  OTHERS = 'others',
}
export class CreateItemDto {
  name: string;
  price: number;
  amount: number;
  userID: string;
  description: string;
  category: Category[];

  brand?: string;
  rating?: number;
  sizes?: string[];
  images?: string[];
  colors?: string[];
}
